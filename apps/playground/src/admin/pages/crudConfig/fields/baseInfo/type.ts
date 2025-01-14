import { ConfigType, ConfigTypeText } from '@/common'
import { nodeUtil } from '@easy-page/antd-ui'
import { toNumber } from 'lodash'

export const type = nodeUtil.createField<string>(
  'type',
  '配置类型',
  {
    value: `${ConfigType.Plan}`,
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
        type: toNumber(value),
      }
    },
    preprocess: ({ defaultValues }) => {
      const type = defaultValues['type']
      return type ? `${type}` : `${ConfigType.Plan}`
    },
  },
  {
    radioGroup: {
      disabled: true,
      options: Object.keys(ConfigTypeText).map((e) => ({
        label: ConfigTypeText[e],
        value: `${e}`,
      })),
    },
  }
)
