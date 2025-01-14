import { ConfigBizline, ConfigBizlineText, toNumber } from '@/common'
import { nodeUtil } from '@easy-page/antd-ui'

export const bizline = nodeUtil.createField<string>(
  'bizLine',
  '业务线',
  {
    value: `${ConfigBizline.ShanGou}`,
    required: true,
    mode: 'single',
    validate: ({ value }) => {
      if (!value) {
        return { success: false, errorMsg: '请输入' }
      }
      return { success: true }
    },
    postprocess: ({ value }) => {
      // TODO:这里为什么提交上去之后业务线就变了
      return {
        bizLine: toNumber(value),
      }
    },
    preprocess: ({ defaultValues }) => {
      const bizline = defaultValues['bizLine']
      return bizline !== undefined ? `${bizline}` : `${ConfigBizline.ShanGou}`
    },
  },
  {
    radioGroup: {
      options: Object.keys(ConfigBizlineText).map((e) => ({
        label: ConfigBizlineText[e],
        value: e,
      })),
    },
  }
)
