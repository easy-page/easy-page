import { MaterialTypeEnum } from '@/common/apis/getSourceInfoList'
import { sourceNameListModel } from '@/common/models/sourceInfoNameList'
import { nodeUtil } from '@easy-page/antd-ui'
import { get } from 'lodash'
import {
  getTextMaterialRuleMsg,
  getImageMaterialRuleMsg,
  RequirementTypeEnum,
} from './utils'

export const requirementInput = nodeUtil.createField(
  'materialRule',
  ' ',
  {
    effectedKeys: ['resourceName'],
    when: {
      effectedKeys: ['needRequire'],
      show({ effectedData }) {
        return effectedData['needRequire'] === RequirementTypeEnum.Need
      },
    },
    preprocess({ defaultValues }) {
      const materialRule = get(defaultValues, 'materialRule')

      return materialRule
    },
    postprocess: ({ value }) => {
      return {
        materialRule: value || '',
      }
    },
    validate: ({ value }) => {
      if (!value) {
        return {
          success: false,
          errorMsg: '请输入素材要求，最多50个字',
        }
      }

      if (value?.length > 50) {
        return {
          success: false,
          errorMsg: '素材要求最多可输入50个字',
        }
      }

      return { success: true }
    },
  },
  {
    input: {
      placeholder: '简要描述素材要求，最多50个字',
    },
    formItem: {
      customExtra: ({ frameworkProps: { store } }) => {
        const { pageState } = store
        const { resourceName } = pageState
        const resourceMaterialList = sourceNameListModel.getSourceNameConfig(
          resourceName?.choosed
        )

        const textMaterialList = resourceMaterialList.filter(
          (item) => item.materialType === MaterialTypeEnum.Text
        )
        const imageMaterialList = resourceMaterialList.filter(
          (item) => item.materialType === MaterialTypeEnum.Image
        )

        return (
          <div className="flex flex-col">
            {textMaterialList.length > 0 ? (
              <div className="mt-2">
                <div>文字要求：</div>
                <div className="flex flex-col">
                  {textMaterialList?.map((item, index) => (
                    <div>
                      {index + 1}.{item.materialName}：
                      {getTextMaterialRuleMsg(item.limitInfo)}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <></>
            )}
            {imageMaterialList.length > 0 ? (
              <div className="mt-2">
                <div className="shrink-0">图片要求：</div>
                <div className="flex flex-col">
                  {imageMaterialList?.map((item, index) => (
                    <div>
                      {index + 1}.{item.materialName}：
                      {getImageMaterialRuleMsg(item.limitInfo)}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        )
      },
    },
  }
)
