import { ActTypeEnum, ZsptRolesEnum } from '@/common/constants'

export const roleAndCrudActMap: Record<ZsptRolesEnum, ActTypeEnum[]> = {
  [ZsptRolesEnum.Admin]: [
    ActTypeEnum.COLLECT_STORE,
    ActTypeEnum.DISCOUNT_NON_BRAND,
    ActTypeEnum.SG_SHEN_QUAN,
    ActTypeEnum.UNION_COUPON, //todo
  ],
  [ZsptRolesEnum.GodPrice]: [],
  [ZsptRolesEnum.GodTicket]: [],
  [ZsptRolesEnum.ZsptPlan]: [],
  [ZsptRolesEnum.SgBrand]: [],
  [ZsptRolesEnum.SgAct]: [
    ActTypeEnum.COLLECT_STORE,
    ActTypeEnum.DISCOUNT_NON_BRAND,
    ActTypeEnum.SG_SHEN_QUAN,
    ActTypeEnum.UNION_COUPON,
  ],
  [ZsptRolesEnum.ZsptAdmin]: [ActTypeEnum.DISCOUNT_NON_BRAND],
  [ZsptRolesEnum.WaiMaiDo]: [],
  [ZsptRolesEnum.WaiMaiManager]: [
    ActTypeEnum.SHEN_HUI_YUAN,
    ActTypeEnum.WM_DISCOUNT,
  ],
  [ZsptRolesEnum.WaimaiDoOfAct]: [
    ActTypeEnum.SHEN_HUI_YUAN,
    ActTypeEnum.WM_DISCOUNT,
  ],
  [ZsptRolesEnum.WaimaSongJiuAdmin]: [ActTypeEnum.WAIMA_SOURCE],
  [ZsptRolesEnum.WaimaSongJiuOfAct]: [ActTypeEnum.WAIMA_SOURCE],
  [ZsptRolesEnum.UnionCoupon]: [],
}
