import { PlanDetailInfo } from '@/common/components/zspt/PlanDetail'
import { PreviewColumnInfo } from '../../../components/PreviewInfo/interface'
import { SubsidyConditionKeyEnum, SubsidyLevelEnum } from '@/common'
import { MerchantMaxSubsidyScene } from '@/common/components/zspt/SubsidyTable/MerchantMaxSubsidy/columns'

export const subsidyRuleTable: PreviewColumnInfo = {
  properties: '基础和膨胀补贴规则',
  content: ({ subActivity }) => {
    const subsidyRule = subActivity?.[0]?.subsidyRule4Group
    return (
      <PlanDetailInfo
        disablePlanInfo
        highlightPrice
        scene={MerchantMaxSubsidyScene.UnionCouponPlanView}
        subsidyConditionKey={SubsidyConditionKeyEnum.ScCouponThreshold}
        detail={subsidyRule}
        layout="flex-row"
        subsidyScene={SubsidyLevelEnum.OutSite}
      />
    )
  },
}
