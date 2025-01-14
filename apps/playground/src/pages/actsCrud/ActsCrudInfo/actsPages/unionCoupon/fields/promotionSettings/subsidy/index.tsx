import {
  PlanTypeEnum,
  SubsidyConditionKeyEnum,
  SubsidyLevelEnum,
} from '@/common'
import {
  commissionContainer,
  subActSubsidyContainer,
} from '@/pages/actsCrud/ActsCrudInfo/fields'
import { chooseSubsidyPlan } from '@/pages/actsCrud/ActsCrudInfo/fields/subsidy'
import { MerchantMaxSubsidyScene } from '@/common/components/zspt/SubsidyTable/MerchantMaxSubsidy/columns'
import { unionCouponExpandLevel } from '@/pages/actsCrud/ActsCrudInfo/fields/subsidy/stockReq/fields'

export const subsidy = subActSubsidyContainer().appendChildren([
  commissionContainer().appendChildren([
    chooseSubsidyPlan({
      scene: MerchantMaxSubsidyScene.UnionCouponPlanView,
      subsidyConditionKey: SubsidyConditionKeyEnum.ScCouponThreshold,
      planType: PlanTypeEnum.UnionCoupon,
      subsidyScene: SubsidyLevelEnum.OutSite,
    }), // 选择补贴方案
    unionCouponExpandLevel, // 库存要求
  ]),
])
