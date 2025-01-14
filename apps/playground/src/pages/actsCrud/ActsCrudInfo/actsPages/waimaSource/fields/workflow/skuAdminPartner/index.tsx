import { nodeUtil } from '@easy-page/antd-ui'
import { debounce, get } from 'lodash'
import { useCallback, useMemo, useState } from 'react'
import {
  ActFullInfo,
  ActivityStatusEnum,
  Employ,
  isCreate,
  isEdit,
  isView,
  MisSelectWithCheck,
} from '@/common'
import { CheckBox, Selector } from '@roo/roo'
import { NormalOption, SelectorOption } from '@roo/roo/Selector'
import './index.less'
import { WmsActFormState, WmsActFormProps } from '../../../interface'
import { AnyNaptrRecord } from 'dns'
import { message } from 'antd'

// 缓存key前缀
// const cacheKey = 'Waima-business-partner-skuAdminPartner'

export const getValueFromCache = (cacheKey: string) => {
  const cacheData = localStorage.getItem(cacheKey)
  if (!cacheData) return []
  try {
    return JSON.parse(cacheData)
  } catch (error) {
    return []
  }
}

export const setValueFromCache = (cacheKey: string, value: Employ[]) => {
  localStorage.setItem(cacheKey, JSON.stringify(value))
}

export const skuAdminPartner = nodeUtil
  .createCustomField<any, WmsActFormState, WmsActFormProps>(
    'skuAdminPartner',
    '选择合作运营',
    ({ value, onChange, disabled, frameworkProps: { store } }) => {
      const { activity } = store.getDefaultValues() as ActFullInfo

      const [forceUpdate, setForceUpdate] = useState(false)

      // 点击输入框直接选中checkbox，并且回填缓存数据
      const handleMisSelectOnFoucs = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (!value.isSelectSkuPartner) {
          // const fromCacheValue = getValueFromCache(cacheKey)

          onChange({
            ...value,
            isSelectSkuPartner: true,
            // skuAdmin: fromCacheValue,
          })

          // if (fromCacheValue.length === 5) {
          //   setForceUpdate(true)
          //   setTimeout(() => {
          //     setForceUpdate(false)
          //   }, 10)
          // }
        }
      }

      const handleChangeValue = (newValue) => {
        // 邀请后的编辑状态下，只能新增mis，不能删除
        if (isEdit()) {
          const { status, skuAdmin } = activity

          const skuAdminArr = skuAdmin === '' ? [] : skuAdmin.split(',')

          if (
            [
              ActivityStatusEnum.Applying,
              ActivityStatusEnum.Active,
              ActivityStatusEnum.TobeActive,
            ].includes(status)
          ) {
            const isOriginDataFull = skuAdminArr.every((item) =>
              newValue.find((each) => each.login === item)
            )

            if (!isOriginDataFull) {
              message.error('不可删除')
              return
            }
          }
        }

        // setValueFromCache(cacheKey, newValue)

        onChange({
          ...value,
          skuAdmin: newValue,
        })
      }

      if (forceUpdate) {
        return <></>
      }

      console.log('value:::', value)

      return (
        <div className="business-partner-container">
          <div className="business-partner-item">
            <div className="w-[80px]">
              <CheckBox
                checked={value.isSelectSkuPartner}
                onChange={(e) => {
                  const checked = e.target.checked
                  if (checked) {
                    // const fromCacheValue = getValueFromCache(cacheKey)

                    onChange({
                      // skuAdmin: fromCacheValue,
                      skuAdmin: [],
                      isSelectSkuPartner: true,
                    })
                  } else {
                    // setValueFromCache(cacheKey, [])
                    onChange({
                      skuAdmin: [],
                      isSelectSkuPartner: false,
                    })
                  }
                }}
                disabled={isView() || disabled}
              >
                品类运营
              </CheckBox>
            </div>
            <div
              className="field-item"
              onClick={async (e) => await handleMisSelectOnFoucs(e)}
            >
              <MisSelectWithCheck
                disabled={isView() || (disabled && !value.isSelectSkuPartner)}
                multiple={true}
                className="w-full"
                maxCount={5}
                value={value.skuAdmin}
                placeholder="请输入运营MIS号，最多5个"
                onChange={(newSkuAdmin) => {
                  handleChangeValue(newSkuAdmin)
                }}
              />
            </div>
          </div>
        </div>
      )
    },
    {
      required: true,

      effectedKeys: [],

      value: {
        isSelectSkuPartner: true,
        skuAdmin: [],
      },

      preprocess({ defaultValues }) {
        const skuAdminArr = get(defaultValues, 'activity.skuAdmin') || ''

        if (skuAdminArr === '') {
          return {
            purchaseManager: [],
            isSelectSkuPartner: isCreate() ? true : false,
          }
        }

        return {
          skuAdmin: skuAdminArr.split(',').map((item) => ({
            login: item,
            name: item,
          })),
          isSelectSkuPartner: skuAdminArr.split(',').length > 0,
        }
      },

      postprocess: ({ value }) => {
        console.log('valpostprocessue:', value)
        return {
          'activity.skuAdmin': (value?.skuAdmin || [])
            .map((item: Employ) => item.login)
            .join(','),
        }
      },

      validate: ({ value, pageState }) => {
        console.log('pageState', pageState)
        const { purchaseManagerPartner } = pageState

        if (
          value.isSelectSkuPartner &&
          (!value?.skuAdmin || (value?.skuAdmin || []).length === 0)
        ) {
          return { success: false, errorMsg: '品类运营选中后必填' }
        }

        if (
          [
            ...(purchaseManagerPartner?.purchaseManager || []),
            ...(value?.skuAdmin || []),
          ].length !==
          [
            ...new Set(
              [
                ...(purchaseManagerPartner?.purchaseManager || []),
                ...(value?.skuAdmin || []),
              ].map((item) => item.login)
            ),
          ].length
        ) {
          return { success: false, errorMsg: '品类和采购不能是同一个MIS号' }
        }

        return { success: true }
      },
    },
    {
      layout: {},
      formItem: {
        labelAlign: 'right',
        // noStyle: true,
        wrapperCol: { span: 20 },
      },
    }
  )
  .appendChildren([])
