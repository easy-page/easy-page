import { ActTypeEnum } from '@/common'
import { ActTemplate } from '@/common/constants/fieldMaps/interface'

export const FieldIdsMapInfo: Record<ActTemplate | ActTypeEnum, string[]> = {
  [ActTemplate.Common]: [],
  [ActTemplate.Sg]: [],
  [ActTemplate.Wm]: [],
  [ActTypeEnum.SHEN_HUI_YUAN]: [],
  [ActTypeEnum.UNION_COUPON]: [],
  [ActTypeEnum.SINGLE_BRAND_COUPON_UNITE]: [],
  [ActTypeEnum.UNITE_BRAND_COUPON_UNITE]: [],
  [ActTypeEnum.SINGLE_BRAND_COUPON_ENTIRE]: [],
  [ActTypeEnum.UNITE_BRAND_COUPON_ENTIRE]: [],
  [ActTypeEnum.DISCOUNT_NON_BRAND]: [],
  [ActTypeEnum.PRODUCT_COUPON]: [],
  [ActTypeEnum.GOD_PRICE]: [],
  [ActTypeEnum.NEW_CUSTOMER_EXPLOSIVE_PRODUCT]: [],
  [ActTypeEnum.EXPLOSIVE_PRODUCT_PROMOTION]: [],
  [ActTypeEnum.X_YUAN_PICKUP]: [],
  [ActTypeEnum.TEAM_BUYING]: [],
  [ActTypeEnum.COLLECT_STORE]: [],
  [ActTypeEnum.WM_DISCOUNT]: [],
  [ActTypeEnum.WAIMA_SOURCE]: [],
  [ActTypeEnum.SG_SHEN_QUAN]: [],
}

export enum CliConfigConfirmSence {
  ChangeTemplate = 'ChangeTemplate',
}
