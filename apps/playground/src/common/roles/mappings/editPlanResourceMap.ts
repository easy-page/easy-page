/** 暂时前端维护 */

import { BizLineEnum, ZsptRolesEnum } from '@/common/constants'
import { EditPlanResources } from '@/common/constants'
import { getBizLine } from '@/common/libs'

export const AllEditPlanResources = [
  EditPlanResources.EditBrandPlan,
  EditPlanResources.EditGodPricePlan,
  EditPlanResources.EditShenHuiYuanPlan,
]
export const roleAndEditPlanMap: Record<ZsptRolesEnum, EditPlanResources[]> = {
  [ZsptRolesEnum.Admin]: AllEditPlanResources,
  [ZsptRolesEnum.GodPrice]: [EditPlanResources.EditGodPricePlan],
  [ZsptRolesEnum.ZsptPlan]: [EditPlanResources.EditBrandPlan],
  [ZsptRolesEnum.SgBrand]: [EditPlanResources.EditBrandPlan],
  [ZsptRolesEnum.SgAct]: [],
  [ZsptRolesEnum.ZsptAdmin]: AllEditPlanResources,
  [ZsptRolesEnum.WaiMaiDo]: [EditPlanResources.EditShenHuiYuanPlan],
  [ZsptRolesEnum.WaiMaiManager]: [EditPlanResources.EditShenHuiYuanPlan],
  [ZsptRolesEnum.WaimaiDoOfAct]: [],
  [ZsptRolesEnum.WaimaSongJiuAdmin]: [],
  [ZsptRolesEnum.WaimaSongJiuOfAct]: [],
  [ZsptRolesEnum.GodTicket]: [], //todo
  [ZsptRolesEnum.UnionCoupon]: [] //todo
}

export const bizlineAndEditPlanMap: Record<BizLineEnum, EditPlanResources[]> = {
  [BizLineEnum.WaiMai]: [EditPlanResources.EditShenHuiYuanPlan],
  [BizLineEnum.ShanGou]: [
    EditPlanResources.EditBrandPlan,
    EditPlanResources.EditGodPricePlan,
  ],
  [BizLineEnum.WaimaSongJiu]: [],
}

export const filterBizlineEditPlans = (sources: EditPlanResources[]) => {
  const bizLine = getBizLine() || BizLineEnum.WaiMai
  const bizlineSources: EditPlanResources[] =
    bizlineAndEditPlanMap[bizLine] || []
  return sources.filter((e) => {
    return bizlineSources.includes(e)
  })
}
