import { PlanAndActTabResources, ZsptRolesEnum } from "@/common/constants"

const AllPlanAndActTabs = [PlanAndActTabResources.Act, PlanAndActTabResources.Plan]
export const roleAndPlanActTabMap: Record<ZsptRolesEnum, PlanAndActTabResources[]> = {
  [ZsptRolesEnum.Admin]: AllPlanAndActTabs,
  [ZsptRolesEnum.GodPrice]: AllPlanAndActTabs,
  [ZsptRolesEnum.GodTicket]: AllPlanAndActTabs,
  [ZsptRolesEnum.ZsptPlan]: [PlanAndActTabResources.Plan],
  [ZsptRolesEnum.SgBrand]: AllPlanAndActTabs,
  [ZsptRolesEnum.SgAct]: [PlanAndActTabResources.Act],
  [ZsptRolesEnum.ZsptAdmin]: [PlanAndActTabResources.Act],
  [ZsptRolesEnum.WaiMaiDo]: AllPlanAndActTabs,
  [ZsptRolesEnum.WaiMaiManager]: AllPlanAndActTabs,
  [ZsptRolesEnum.WaimaiDoOfAct]: [PlanAndActTabResources.Act],
  [ZsptRolesEnum.WaimaSongJiuOfAct]:  [PlanAndActTabResources.Act],
  [ZsptRolesEnum.WaimaSongJiuAdmin]: [PlanAndActTabResources.Act],
  [ZsptRolesEnum.UnionCoupon]: AllPlanAndActTabs
}