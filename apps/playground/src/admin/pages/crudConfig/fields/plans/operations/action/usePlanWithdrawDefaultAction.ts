import { nodeUtil, UI_COMPONENTS } from '@easy-page/antd-ui'
import { get } from 'lodash'

export const usePlanWithdrawDefaultAction = nodeUtil.createField(
  'usePlanWithdrawDefaultAction',
  '使用默认的方案撤回动作',
  {
    value: true,
    postprocess({ value }) {
      return {
        'config.usePlanWithdrawDefaultAction': value,
      }
    },
    preprocess({ defaultValues }) {
      return get(defaultValues, 'config.usePlanWithdrawDefaultAction') ?? true
    },
  },
  {
    ui: UI_COMPONENTS.SWITCH,
    formItem: {
      extra: '若为 true，则使用默认的方案撤回动作，否则会提示需要定制处理',
    },
  }
)
