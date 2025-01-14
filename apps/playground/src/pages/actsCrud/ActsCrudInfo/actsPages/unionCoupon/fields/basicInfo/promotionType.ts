import { ActivitySourceEnum, ActTypeEnum } from '@/common'
import { promotionType } from '@/pages/actsCrud/ActsCrudInfo/fields'

export const unionCouponActType = promotionType(ActTypeEnum.UNION_COUPON, {
  source: ActivitySourceEnum.Activity,
})
