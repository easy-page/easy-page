import { nodeUtil, UI_COMPONENTS } from '@easy-page/antd-ui'
import { get } from 'lodash'

export const usePlanSendInviteDefaultAction = nodeUtil.createField(
  'usePlanSendInviteDefaultAction',
  '使用默认的方案发送邀请动作',
  {
    value: true,
    postprocess({ value }) {
      return {
        'config.usePlanSendInviteDefaultAction': value,
      }
    },
    preprocess({ defaultValues }) {
      return get(defaultValues, 'config.usePlanSendInviteDefaultAction') ?? true
    },
  },
  {
    ui: UI_COMPONENTS.SWITCH,
    formItem: {
      extra: '若为 true，则使用默认的方案发送邀请动作，否则会提示需要定制处理',
    },
  }
)
