import { PlanSubTabResources, ZsptRolesEnum } from "@/common/constants"

export const AllPlanSubTabs: PlanSubTabResources[] = [PlanSubTabResources.Mine, PlanSubTabResources.Confirm, PlanSubTabResources.All];
export const roleAndPlanSubTabMap: Record<ZsptRolesEnum, PlanSubTabResources[]> = {
  [ZsptRolesEnum.Admin]: AllPlanSubTabs,
  [ZsptRolesEnum.GodPrice]: AllPlanSubTabs,
  [ZsptRolesEnum.GodTicket]: AllPlanSubTabs,
  [ZsptRolesEnum.ZsptPlan]: AllPlanSubTabs,
  [ZsptRolesEnum.UnionCoupon]: AllPlanSubTabs,
  [ZsptRolesEnum.SgBrand]: AllPlanSubTabs,
  [ZsptRolesEnum.SgAct]: AllPlanSubTabs,
  [ZsptRolesEnum.ZsptAdmin]: AllPlanSubTabs,
  [ZsptRolesEnum.WaiMaiDo]: [PlanSubTabResources.Mine, PlanSubTabResources.All],
  [ZsptRolesEnum.WaiMaiManager]: [PlanSubTabResources.Mine, PlanSubTabResources.All],
  [ZsptRolesEnum.WaimaiDoOfAct]: [PlanSubTabResources.Mine, PlanSubTabResources.All],
  [ZsptRolesEnum.WaimaSongJiuAdmin]: [],
  [ZsptRolesEnum.WaimaSongJiuOfAct]: []
}