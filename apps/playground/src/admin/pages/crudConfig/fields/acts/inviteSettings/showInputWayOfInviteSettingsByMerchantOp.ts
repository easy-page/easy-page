import { nodeUtil, UI_COMPONENTS } from '@easy-page/antd-ui'
import { get } from 'lodash'

export const showInputWayOfInviteSettingsByMerchantOp = nodeUtil.createField(
  'showInputWayOfInviteSettingsByMerchantOp',
  '通过商家品牌邀请的情况下，是否展示录入方式',
  {
    value: true,
    postprocess({ value }) {
      return {
        'config.showInputWayOfInviteSettingsByMerchantOp': value,
      }
    },
    preprocess({ defaultValues }) {
      return (
        get(defaultValues, 'config.showInputWayOfInviteSettingsByMerchantOp') ??
        false
      )
    },
  },
  {
    ui: UI_COMPONENTS.SWITCH,
    formItem: {
      extra:
        '当此开关为 true 时，在活动列表邀请设置里，如果通过品牌商家邀请，展示录入方式，否则不展示',
    },
  }
)
