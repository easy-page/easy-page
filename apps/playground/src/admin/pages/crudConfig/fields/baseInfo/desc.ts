import { nodeUtil, UI_COMPONENTS } from '@easy-page/antd-ui'

export const desc = nodeUtil.createField(
  'desc',
  '配置描述',
  {
    value: '',
  },
  {
    ui: UI_COMPONENTS.TEXTAREA,
    textArea: {
      placeholder: '请输入',
    },
  }
)
