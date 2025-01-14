import { nodeUtil } from '@easy-page/antd-ui'

export const fieldName = nodeUtil.createField(
  'fieldName',
  '字段名',
  {
    value: '',
    required: true,
    validate: ({ value }) => {
      if (!value) {
        return { success: false, errorMsg: '请输入字段名' }
      }
      return { success: true }
    },
  },
  {
    input: {
      placeholder: '请输入字段名',
    },
  }
)
