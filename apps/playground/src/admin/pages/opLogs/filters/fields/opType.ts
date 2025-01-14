import { AdminOpType, AdminOpTypeText, toNumber } from '@/common'
import { nodeUtil, SelectState, UI_COMPONENTS } from '@easy-page/antd-ui'

const OpOptions = Object.keys(AdminOpTypeText).map((e) => ({
  label: AdminOpTypeText[e],
  value: toNumber(e),
}))

export const opType = nodeUtil.createField<SelectState<AdminOpType>>(
  'opType',
  '配置操作',
  {
    value: {
      choosed: undefined,
      options: OpOptions,
    },
    mode: 'single',
    postprocess({ value }) {
      return {
        opType: value.choosed || undefined,
      }
    },
  },
  {
    ui: UI_COMPONENTS.SELECT,
    select: {
      placeholder: '请选择',
    },
  }
)
