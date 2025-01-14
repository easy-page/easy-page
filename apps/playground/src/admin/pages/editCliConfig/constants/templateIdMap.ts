import { ActFullInfo, ActTypeEnum, PlanTypeEnum } from '@/common'
import {
  ActTemplate,
  TemplateIdType,
} from '@/common/constants/fieldMaps/interface'
import {
  ConfigsInfoMappingType,
  GetDefaultValuesOptions,
} from '@/pages/actsCrud/ActsCrudInfo/common'
import { EditableConfig } from '@easy-page/antd-ui'

export type FieldInfo = {
  id: string
  fullId: string
}

export const ConfigsInfoMappings: Record<
  TemplateIdType,
  ConfigsInfoMappingType | undefined
> = {
  [PlanTypeEnum.Brand]: undefined,
  [PlanTypeEnum.GodPrice]: undefined,
  [PlanTypeEnum.ShenHuiYuan]: undefined,
  [PlanTypeEnum.UnionCoupon]: undefined,
  [ActTypeEnum.SHEN_HUI_YUAN]: undefined,
  [ActTypeEnum.UNION_COUPON]: undefined,
  [ActTypeEnum.SINGLE_BRAND_COUPON_UNITE]: undefined,
  [ActTypeEnum.UNITE_BRAND_COUPON_UNITE]: undefined,
  [ActTypeEnum.SINGLE_BRAND_COUPON_ENTIRE]: undefined,
  [ActTypeEnum.UNITE_BRAND_COUPON_ENTIRE]: undefined,
  [ActTypeEnum.DISCOUNT_NON_BRAND]: undefined,
  [ActTypeEnum.PRODUCT_COUPON]: undefined,
  [ActTypeEnum.GOD_PRICE]: undefined,
  [ActTypeEnum.NEW_CUSTOMER_EXPLOSIVE_PRODUCT]: undefined,
  [ActTypeEnum.EXPLOSIVE_PRODUCT_PROMOTION]: undefined,
  [ActTypeEnum.X_YUAN_PICKUP]: undefined,
  [ActTypeEnum.TEAM_BUYING]: undefined,
  [ActTypeEnum.COLLECT_STORE]: undefined,
  [ActTemplate.Common]: undefined,
  [ActTemplate.Sg]: undefined,
  [ActTemplate.Wm]: undefined,
  [ActTypeEnum.WM_DISCOUNT]: undefined,
  [ActTypeEnum.WAIMA_SOURCE]: undefined,
  [ActTypeEnum.SG_SHEN_QUAN]: undefined,
}

export const TemplateMap: Partial<Record<TemplateIdType, FieldInfo[]>> = {
  [ActTypeEnum.COLLECT_STORE]: [],
  [ActTemplate.Sg]: [],
  [ActTemplate.Common]: [],
  // [ActTypeEnum.SHEN_HUI_YUAN]: [],
}
