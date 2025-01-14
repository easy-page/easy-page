import { nodeUtil } from '@easy-page/antd-ui'
import { prodId } from './prodId'
import { get, toNumber } from 'lodash'

export const testId = nodeUtil.createField(
  'templateInfo.test',
  '测试模板 ID',
  {
    value: '',
    required: true,
    postprocess({ value }) {
      return {
        'config.templateInfo.test': toNumber(value),
      }
    },
    preprocess({ defaultValues }) {
      return `${get(defaultValues || {}, 'config.templateInfo.test') || ''}`
    },
  },
  {
    input: {
      placeholder: '输入测试模板 ID',
    },
    formItem: {
      extra: '七巧板的测试环境模板 ID',
    },
  }
)
