import { nodeUtil, UI_COMPONENTS } from '@easy-page/antd-ui'
const MAX_ID_COUNT = 5000
export const reason = nodeUtil.createField(
  'reason',
  '写给商家的清退理由',
  {
    value: '',
    required: true,
    validate: ({ value }) => {
      if (!value) {
        return {
          success: false,
          errorMsg: '请输入清退理由',
        }
      }
      if (value.length > 50) {
        return {
          success: false,
          errorMsg: '最多50个字',
        }
      }

      return { success: true }
    },
    
  },
  {
    ui: UI_COMPONENTS.TEXTAREA,
    textArea: {
      placeholder: `请输入清退理由，将展示给商家，最多50个字`,
      rows: 5,
    },
  }
)
