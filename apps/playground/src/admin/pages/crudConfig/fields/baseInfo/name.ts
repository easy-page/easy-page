import { nodeUtil } from '@easy-page/antd-ui'

export const name = nodeUtil.createField(
  'name',
  '配置名',
  {
    value: '',
    required: true,
    validate: ({ value }) => {
      if (!value) {
        return { success: false, errorMsg: '请输入' }
      }
      return { success: true }
    },
  },
  {
    input: {
      placeholder: '请输入',
    },
    formItem: {
      extra: '如：集合店、折扣菜、神会员',
    },
  }
)
