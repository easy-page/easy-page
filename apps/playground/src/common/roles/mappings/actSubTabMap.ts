import { ActSubTabResources, ZsptRolesEnum } from "@/common/constants";

// 暂时不要 ActSubTabResources.Confirm
export const AllActSubTabs: ActSubTabResources[] = [ActSubTabResources.Mine, ActSubTabResources.Confirm, ActSubTabResources.All]
export const roleAndActSubTabMap: Record<ZsptRolesEnum, ActSubTabResources[]> = {
  [ZsptRolesEnum.Admin]: AllActSubTabs,
  [ZsptRolesEnum.GodPrice]: AllActSubTabs,
  [ZsptRolesEnum.GodTicket]: AllActSubTabs,
  [ZsptRolesEnum.ZsptPlan]: AllActSubTabs,
  [ZsptRolesEnum.SgBrand]: AllActSubTabs,
  [ZsptRolesEnum.SgAct]: AllActSubTabs,
  [ZsptRolesEnum.ZsptAdmin]: AllActSubTabs,
  [ZsptRolesEnum.WaiMaiDo]: [ActSubTabResources.All, ActSubTabResources.Mine],
  [ZsptRolesEnum.WaiMaiManager]: [ActSubTabResources.All, ActSubTabResources.Mine],
  [ZsptRolesEnum.WaimaiDoOfAct]: [ActSubTabResources.All, ActSubTabResources.Mine],
  [ZsptRolesEnum.WaimaSongJiuAdmin]: [ActSubTabResources.All, ActSubTabResources.Mine],
  [ZsptRolesEnum.UnionCoupon]: [ActSubTabResources.All, ActSubTabResources.Mine],
  [ZsptRolesEnum.WaimaSongJiuOfAct]: AllActSubTabs
}