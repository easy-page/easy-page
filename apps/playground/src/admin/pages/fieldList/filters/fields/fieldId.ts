import { nodeUtil } from '@easy-page/antd-ui'

export const fieldId = nodeUtil.createField<string>(
  'fieldIds',
  '字段 ID',
  {
    value: '',
    postprocess: ({ value }) => ({
      fieldIds: value.split(','),
    }),
    preprocess({ defaultValues }) {
      return defaultValues.fieldIds ? defaultValues.fieldIds.join(',') : ''
    },
  },
  {
    input: {
      placeholder: '请输入',
    },
  }
)
