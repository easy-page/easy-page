import { CheckSubsidyItem, GrayRuleCode } from '@/common'
import { nodeUtil } from '@easy-page/antd-ui'

export const subsidyCheckItems = nodeUtil.createField<CheckSubsidyItem[]>(
  'checkItems',
  '补贴权限检查项',
  {
    mode: 'multiple',
    value: [],
    required: true,
  },
  {
    checkBoxGroup: {
      options: [
        {
          label: '检查美补',
          value: CheckSubsidyItem.CheckMtChargeAuth,
        },
        {
          label: '检查品牌补贴',
          value: CheckSubsidyItem.CheckBrandChargeAuth,
        },
        {
          label: '检查合作运营确认美补权限',
          value: CheckSubsidyItem.CheckPoiConfirmMtChargeAuth,
        },
      ],
    },
  }
)
