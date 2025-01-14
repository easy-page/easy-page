import { Employ, EmploySearch, isCreate, searchUserInfos } from '@/common'
import {
  getSourceInfoList,
  LimitInfo,
  MaterialTypeEnum,
  ResourceTemplate,
} from '@/common/apis/getSourceInfoList'
import { sourceNameListModel } from '@/common/models/sourceInfoNameList'
import { nodeUtil } from '@easy-page/antd-ui'
import { Input, Radio, Select } from 'antd'
import { debounce, get, String } from 'lodash'
import { useState, useCallback, useEffect } from 'react'

enum RequirementTypeEnum {
  NotNeed = 0,
  Need = 1,
}

const requirementOptions = [
  {
    label: '需要',
    value: RequirementTypeEnum.Need,
  },
  {
    label: '不需要',
    value: RequirementTypeEnum.NotNeed,
  },
]

export const sourceRequirement2 = nodeUtil.createCustomField<{
  needMaterial: RequirementTypeEnum
  materialRule: string
}>(
  'needMaterial',
  '供应商提供素材要求',
  ({ value, onChange, frameworkProps: { store }, disabled }) => {
    const { pageState } = store
    const { resourceName } = pageState

    const resourceNameConfig = sourceNameListModel.getSourceNameConfig(
      resourceName?.choosed
    )

    useEffect(() => {
      if (isCreate()) {
        onChange({
          needMaterial: RequirementTypeEnum.Need,
          materialRule: '',
        })
      }
    }, [])

    const textMaterialList = resourceNameConfig.filter(
      (item) => item.materialType === MaterialTypeEnum.Text
    )
    const imageMaterialList = resourceNameConfig.filter(
      (item) => item.materialType === MaterialTypeEnum.Image
    )

    const getTextMaterialRuleMsg = (limitInfo: LimitInfo) => {
      const returnMsg = []
      if (limitInfo.regular) {
        // if (limitInfo.regular === '.*') {
        //   returnMsg.push('接受中英文字符')
        // }
      }
      if (limitInfo.maxLength) {
        returnMsg.push(`最多不超过${limitInfo.maxLength}个字符`)
      }
      return returnMsg.join('，')
    }

    const getImageMaterialRuleMsg = (limitInfo: LimitInfo) => {
      const returnMsg = []
      if (limitInfo.wideLimit) {
        returnMsg.push(`图片最大宽度${limitInfo.wideLimit}`)
      }
      if (limitInfo.highLimit) {
        returnMsg.push(`图片最大高度${limitInfo.highLimit}`)
      }
      if (limitInfo.picSizeLimit) {
        returnMsg.push(`大小不超过${limitInfo.picSizeLimit}kb`)
      }
      if (
        Array.isArray(limitInfo.supportMediaTypeList) &&
        limitInfo.supportMediaTypeList.length > 0
      ) {
        returnMsg.push(
          `支持图片类型：${limitInfo.supportMediaTypeList.join('、')}`
        )
      }
      return returnMsg.join('，')
    }

    return (
      <div className="flex-col flex">
        <div className="mt-2">
          <Radio.Group
            onChange={(newValue) => {
              onChange({ ...value, needMaterial: newValue.target.value })
            }}
            disabled={disabled}
            value={value.needMaterial}
          >
            {requirementOptions.map((item) => (
              <Radio
                value={item.value}
                disabled={
                  resourceNameConfig.length === 0 &&
                  item.value === RequirementTypeEnum.Need
                }
              >
                {item.label}
              </Radio>
            ))}
          </Radio.Group>
        </div>
        {value.needMaterial === RequirementTypeEnum.Need ? (
          <>
            <div className="mt-4">
              <Input
                placeholder="简要描述素材要求，最多50个字"
                value={value.materialRule}
                onChange={(newValue) => {
                  onChange({ ...value, materialRule: newValue.target.value })
                }}
                maxLength={20}
              />
            </div>
            <div className="flex flex-col">
              {textMaterialList.length > 0 ? (
                <div className="flex mt-2">
                  <div>文字要求：</div>
                  <div className="flex flex-col">
                    {textMaterialList.map((item, index) => (
                      <div>
                        {item.materialName}：
                        {getTextMaterialRuleMsg(item.limitInfo)}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <></>
              )}
              {imageMaterialList.length > 0 ? (
                <div className="flex mt-2">
                  <div className="shrink-0">图片要求：</div>
                  <div className="flex flex-col">
                    {imageMaterialList.map((item, index) => (
                      <div>
                        {item.materialName}：
                        {getImageMaterialRuleMsg(item.limitInfo)}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    )
  },
  {
    effectedKeys: ['resourceName'],
    preprocess({ defaultValues }) {
      const needMaterial =
        get(defaultValues, 'needMaterial') || RequirementTypeEnum.Need
      const materialRule = get(defaultValues, 'materialRule')

      return {
        needMaterial,
        materialRule,
      }
    },
    required: true,
    postprocess: ({ value }) => {
      return {
        needMaterial: value.needMaterial,
        materialRule: value.needMaterial ? value.materialRule : '',
      }
    },
    validate: ({ value }) => {
      if (value.needMaterial && !value.materialRule) {
        return {
          success: false,
          errorMsg: '请输入素材要求，最多50个字',
        }
      }

      if (value.materialRule.length > 50) {
        return {
          success: false,
          errorMsg: '素材要求最多可输入50个字',
        }
      }

      return { success: true }
    },

    actions: [
      {
        effectedKeys: ['resourceName'],
        action: ({ value, effectedData }) => {
          const resourceName = effectedData['resourceName']
          console.log('resourceName', resourceName)

          if (sourceNameListModel.getList().data.length === 0) {
            return {
              fieldValue: {
                ...value,
              },
            }
          }

          const resourceNameConfig = sourceNameListModel.getSourceNameConfig(
            resourceName?.choosed
          )

          if (!resourceNameConfig || (resourceNameConfig || []).length === 0) {
            return {
              fieldValue: {
                ...value,
                needMaterial: RequirementTypeEnum.NotNeed,
              },
            }
          }

          return {
            fieldValue: {
              ...value,
            },
          }
        },
        initRun: false,
      },
    ],
  }
)
