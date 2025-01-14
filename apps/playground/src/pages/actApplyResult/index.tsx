import { ActTypeEnum, ActApplyResultParams } from '@/common'
import { useParamsInfo } from '@/common/hooks'
import {
  ShenHuiyuanApplyResult,
  ShenQuanApplyResult,
  UnionCouponApplyResult,
  WaiMaResourceApplyResult,
  WmDiscountApplyResult,
} from './ActApplyResultInfo'

export const ActApplyResultMap: Record<ActTypeEnum, React.ReactNode> = {
  [ActTypeEnum.SHEN_HUI_YUAN]: <ShenHuiyuanApplyResult />,
  [ActTypeEnum.WM_DISCOUNT]: <WmDiscountApplyResult />,
  [ActTypeEnum.WAIMA_SOURCE]: <WaiMaResourceApplyResult />,
  [ActTypeEnum.SG_SHEN_QUAN]: <ShenQuanApplyResult />,
  [ActTypeEnum.UNION_COUPON]: <UnionCouponApplyResult />,
  [ActTypeEnum.SINGLE_BRAND_COUPON_UNITE]: <></>,
  [ActTypeEnum.UNITE_BRAND_COUPON_UNITE]: <></>,
  [ActTypeEnum.SINGLE_BRAND_COUPON_ENTIRE]: <></>,
  [ActTypeEnum.UNITE_BRAND_COUPON_ENTIRE]: <></>,
  [ActTypeEnum.DISCOUNT_NON_BRAND]: <></>,
  [ActTypeEnum.PRODUCT_COUPON]: <></>,
  [ActTypeEnum.GOD_PRICE]: <></>,
  [ActTypeEnum.NEW_CUSTOMER_EXPLOSIVE_PRODUCT]: <></>,
  [ActTypeEnum.EXPLOSIVE_PRODUCT_PROMOTION]: <></>,
  [ActTypeEnum.X_YUAN_PICKUP]: <></>,
  [ActTypeEnum.TEAM_BUYING]: <></>,
  [ActTypeEnum.COLLECT_STORE]: <></>,
}

export const ActApplyResult = () => {
  const { params } = useParamsInfo<ActApplyResultParams>()
  const { promotionType = ActTypeEnum.SHEN_HUI_YUAN } = params || {}

  return ActApplyResultMap[promotionType]
}
