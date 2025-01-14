import { nodeUtil } from '@easy-page/antd-ui'
import { debounce, get } from 'lodash'
import { useCallback, useMemo, useState } from 'react'
import {
  ActFullInfo,
  ActivityStatusEnum,
  Employ,
  isEdit,
  isView,
  MisSelectWithCheck,
} from '@/common'
import { CheckBox, Selector } from '@roo/roo'
import { NormalOption, SelectorOption } from '@roo/roo/Selector'
import './index.less'
import { WmsActFormState, WmsActFormProps } from '../../../interface'
import { getValueFromCache, setValueFromCache } from '../skuAdminPartner'
import { message } from 'antd'

// 缓存key前缀
// const cacheKey = 'Waima-business-partner-purchaseManagerPartner'

export const purchaseManagerPartner = nodeUtil
  .createCustomField<any, WmsActFormState, WmsActFormProps>(
    'purchaseManagerPartner',
    ' ',
    ({ value, onChange, disabled, frameworkProps: { store } }) => {
      const { activity } = store.getDefaultValues() as ActFullInfo
      const [forceUpdate, setForceUpdate] = useState(false)

      // 点击输入框直接选中checkbox，并且回填缓存数据
      // const handleMisSelectOnFoucs = async (e: any) => {
      //   e.preventDefault()
      //   e.stopPropagation()

      //   if (value?.purchaseManager.length === 0) {
      //     const fromCacheValue = getValueFromCache(cacheKey)
      //     onChange({
      //       ...value,
      //       purchaseManager: fromCacheValue,
      //     })

      //     if (fromCacheValue.length === 5) {
      //       setForceUpdate(true)
      //       setTimeout(() => {
      //         setForceUpdate(false)
      //       }, 10)
      //     }
      //   }
      // }

      const handleChangeValue = (newValue) => {
        // 邀请后的编辑状态下，只能新增mis，不能删除
        if (isEdit()) {
          const { status, purchaseManager } = activity

          const purchaseManagerArr =
            purchaseManager === '' ? [] : purchaseManager.split(',')

          if (
            [
              ActivityStatusEnum.Applying,
              ActivityStatusEnum.Active,
              ActivityStatusEnum.TobeActive,
            ].includes(status)
          ) {
            const isOriginDataFull = purchaseManagerArr.every((item) =>
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
          purchaseManager: newValue,
        })
      }

      if (forceUpdate) {
        return <></>
      }

      return (
        <div className="business-partner-container">
          <div className="business-partner-item">
            <div className="w-[80px]">
              <CheckBox checked={true} disabled={true}>
                采购
              </CheckBox>
            </div>
            <div
              className="field-item"
              // onClick={async (e) => await handleMisSelectOnFoucs(e)}
            >
              <MisSelectWithCheck
                disabled={isView()}
                multiple={true}
                className="w-full"
                maxCount={5}
                value={value.purchaseManager}
                placeholder="请输入运营MIS号，最多5个"
                onChange={(newPurchaseManager) => {
                  handleChangeValue(newPurchaseManager)
                }}
              />
            </div>
          </div>
        </div>
      )
    },
    {
      effectedKeys: [],

      value: {
        purchaseManager: [],
      },

      preprocess({ defaultValues }) {
        const purchaseManagerArr =
          get(defaultValues, 'activity.purchaseManager') || ''

        if (purchaseManagerArr === '') {
          return {
            purchaseManager: [],
          }
        }

        return {
          purchaseManager: purchaseManagerArr.split(',').map((item) => ({
            login: item,
            label: item,
          })),
        }
      },

      postprocess: ({ value }) => {
        return {
          'activity.purchaseManager': value.purchaseManager
            .map((item: Employ) => item.login)
            .join(','),
        }
      },
      validate: ({ value, pageState }) => {
        const { skuAdminPartner } = pageState
        if (
          !value?.purchaseManager ||
          (value?.purchaseManager || []).length === 0
        ) {
          return { success: false, errorMsg: '请输入运营MIS号' }
        }

        if (
          [
            ...(skuAdminPartner?.skuAdmin || []),
            ...(value?.purchaseManager || []),
          ].length !==
          [
            ...new Set(
              [
                ...(skuAdminPartner?.skuAdmin || []),
                ...(value?.purchaseManager || []),
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
