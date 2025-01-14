import { BizLineEnum, PlanTypeEnum, ZsptRolesEnum } from '@/common/constants'

/**
 * - 角色、方案类型管理
 * - 同一个方案类型，后续还需要根据不同的业务线，区分文案
 */
export const roleAndCrudPlanMap: Record<ZsptRolesEnum, PlanTypeEnum[]> = {
  [ZsptRolesEnum.Admin]: [
    PlanTypeEnum.Brand,
    PlanTypeEnum.GodPrice,
    PlanTypeEnum.ShenHuiYuan,
    PlanTypeEnum.UnionCoupon,
  ],
  [ZsptRolesEnum.GodPrice]: [PlanTypeEnum.GodPrice],
  [ZsptRolesEnum.GodTicket]: [PlanTypeEnum.ShenHuiYuan],
  [ZsptRolesEnum.ZsptPlan]: [PlanTypeEnum.Brand],
  [ZsptRolesEnum.SgBrand]: [PlanTypeEnum.Brand],
  [ZsptRolesEnum.SgAct]: [],
  [ZsptRolesEnum.ZsptAdmin]: [],
  [ZsptRolesEnum.WaiMaiDo]: [PlanTypeEnum.ShenHuiYuan],
  [ZsptRolesEnum.WaiMaiManager]: [PlanTypeEnum.ShenHuiYuan],
  [ZsptRolesEnum.WaimaiDoOfAct]: [],
  [ZsptRolesEnum.WaimaSongJiuOfAct]: [],
  [ZsptRolesEnum.WaimaSongJiuAdmin]: [],
  [ZsptRolesEnum.UnionCoupon]: [PlanTypeEnum.UnionCoupon],
}

/**
 * - 申请角色权限时，需要角色、业务线、方案三者映射
 */
export const roleAndPlanTypeMap: Record<
  PlanTypeEnum,
  Record<BizLineEnum, ZsptRolesEnum>
> = {
  [PlanTypeEnum.Brand]: {
    [BizLineEnum.ShanGou]: ZsptRolesEnum.SgBrand,
    [BizLineEnum.WaiMai]: ZsptRolesEnum.SgBrand,
    [BizLineEnum.WaimaSongJiu]: ZsptRolesEnum.SgBrand,
  },
  [PlanTypeEnum.GodPrice]: {
    [BizLineEnum.ShanGou]: ZsptRolesEnum.GodPrice,
    [BizLineEnum.WaiMai]: ZsptRolesEnum.GodPrice,
    [BizLineEnum.WaimaSongJiu]: ZsptRolesEnum.GodPrice,
  },
  [PlanTypeEnum.ShenHuiYuan]: {
    [BizLineEnum.ShanGou]: ZsptRolesEnum.SgAct,
    [BizLineEnum.WaiMai]: ZsptRolesEnum.WaiMaiDo,
    [BizLineEnum.WaimaSongJiu]: ZsptRolesEnum.WaiMaiDo,
  },
  [PlanTypeEnum.UnionCoupon]: {
    [BizLineEnum.ShanGou]: ZsptRolesEnum.SgAct,
    [BizLineEnum.WaiMai]: ZsptRolesEnum.WaiMaiDo,
    [BizLineEnum.WaimaSongJiu]: ZsptRolesEnum.WaiMaiDo,
  },
}

/**
 * - 角色所拥有的权限类型
 */
