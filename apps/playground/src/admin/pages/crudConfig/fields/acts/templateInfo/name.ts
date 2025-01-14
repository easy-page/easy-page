import { nodeUtil } from '@easy-page/antd-ui'
import { get } from 'lodash'

export const templateName = nodeUtil.createField(
  'templateInfo.name',
  '模板名称',
  {
    value: '',
    required: true,
    postprocess({ value }) {
      return {
        'config.templateInfo.name': value,
      }
    },
    preprocess({ defaultValues }) {
      console.log('defaultValues:', defaultValues)
      return get(defaultValues || {}, 'config.templateInfo.name')
    },
  },
  {
    input: {
      placeholder: '输入模板名称',
    },
  }
)
