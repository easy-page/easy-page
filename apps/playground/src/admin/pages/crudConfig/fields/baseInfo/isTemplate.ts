import { IsConfigTemplate, IsConfigTemplateText, toNumber } from '@/common'
import { nodeUtil } from '@easy-page/antd-ui'

export const isTemplate = nodeUtil.createField<string>(
  'isTemplate',
  '是否作为模板',
  {
    value: `${IsConfigTemplate.No}`,
    required: true,
    mode: 'single',
    validate: ({ value }) => {
      if (!value) {
        return { success: false, errorMsg: '请输入' }
      }
      return { success: true }
    },
    postprocess: ({ value }) => {
      return {
        isTemplate: toNumber(value),
      }
    },
    preprocess: ({ defaultValues }) => {
      const isTemplate = defaultValues['isTemplate']
      return isTemplate !== undefined
        ? `${isTemplate}`
        : `${IsConfigTemplate.No}`
    },
  },
  {
    radioGroup: {
      options: Object.keys(IsConfigTemplateText).map((e) => ({
        label: IsConfigTemplateText[e],
        value: `${e}`,
      })),
    },
    formItem: {
      extra: '模板不可上线，只是用于后续创建活动方便',
    },
  }
)
