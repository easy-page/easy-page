import { ConfigEnvText } from '@/common'
import { ConfigEnv, toNumber } from '@/common'
import { nodeUtil } from '@easy-page/antd-ui'

export const configEnv = nodeUtil.createField<ConfigEnv>(
  'env',
  '环境',
  {
    value: ConfigEnv.TEST,
    required: true,
    mode: 'single',
    validate: ({ value }) => {
      if (value === undefined) {
        return { success: false, errorMsg: '请输入' }
      }
      return { success: true }
    },
    postprocess: ({ value }) => {
      return {
        env: value,
      }
    },
    preprocess: ({ defaultValues }) => {
      const env = defaultValues['env']
      return env !== undefined ? env : ConfigEnv.TEST
    },
  },
  {
    radioGroup: {
      options: Object.keys(ConfigEnvText).map((e) => ({
        label: ConfigEnvText[e],
        value: toNumber(e),
      })),
    },
  }
)
