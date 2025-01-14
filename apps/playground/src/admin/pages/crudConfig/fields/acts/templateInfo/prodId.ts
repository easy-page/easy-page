import { nodeUtil } from '@easy-page/antd-ui'
import { get, toNumber } from 'lodash'

export const prodId = nodeUtil.createField(
  'templateInfo.prod',
  '线上模板 ID',
  {
    value: '',
    required: true,
    postprocess({ value }) {
      return {
        'config.templateInfo.prod': toNumber(value),
      }
    },
    preprocess({ defaultValues }) {
      return `${get(defaultValues || {}, 'config.templateInfo.prod') || ''}`
    },
  },
  {
    input: {
      placeholder: '输入模板 ID',
    },
    formItem: {
      extra: '七巧板的线上环境模板 ID',
    },
  }
)
