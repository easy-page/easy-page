import { useEffect } from 'react'
import { observer } from 'mobx-react'
import { useParamsInfo } from '@/common/hooks'
import { ActTypeEnum, ActApplyResultParams, userModel } from '@/common'
import { WaiMaConfimGoods } from './ActConfirmGoodsInfo'
import { checkActConfirmGoods } from './checkActConfirmGoods'

export const ActConfimGoodsMap: Record<ActTypeEnum, React.ReactNode> = {
  [ActTypeEnum.SHEN_HUI_YUAN]: <></>,
  [ActTypeEnum.UNION_COUPON]: <></>,
  [ActTypeEnum.WAIMA_SOURCE]: <WaiMaConfimGoods />,
  [ActTypeEnum.SG_SHEN_QUAN]: <></>,
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
  [ActTypeEnum.WM_DISCOUNT]: <></>,
}

export const ActConfirmGoods = observer(() => {
  const { data: userInfo } = userModel.getData()
  const { params } = useParamsInfo<ActApplyResultParams>()
  const { promotionType = ActTypeEnum.WAIMA_SOURCE } = params || {}

  useEffect(() => {
    if (userInfo.mis) {
      checkActConfirmGoods(userInfo)
    }
  }, [userInfo])
  return ActConfimGoodsMap[promotionType]
})
