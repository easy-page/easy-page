import {
  subActSubsidyContainer,
  subsidyContainer,
} from '@/pages/actsCrud/ActsCrudInfo/fields'
import { ActTypeEnum, SubsidyConditionKeyEnum } from '@/common'

import { chooseSubsidyPlan } from '@/pages/actsCrud/ActsCrudInfo/fields/subsidy'
import { MerchantMaxSubsidyScene } from '@/common/components/zspt/SubsidyTable/MerchantMaxSubsidy/columns'
import { shenquanStockReq } from '@/pages/actsCrud/ActsCrudInfo/fields/subsidy/stockReq'

export const subsidy = subActSubsidyContainer().appendChildren([
  subsidyContainer(ActTypeEnum.SG_SHEN_QUAN).appendChildren([
    chooseSubsidyPlan({
      scene: MerchantMaxSubsidyScene.ShenQuanPlanView,
      subsidyConditionKey: SubsidyConditionKeyEnum.ScCouponThreshold,
    }), // 选择补贴方案
    shenquanStockReq, // 库存要求
  ]),
])
