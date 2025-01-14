export enum PlanSubTabResources {
  All = 1, // 全部
  Mine = 2, // 我创建的
  Confirm = 3, // 需要我确认的
}

export const PlanSubTabText: Record<PlanSubTabResources, string> = {
  [PlanSubTabResources.Mine]: '我创建的方案',
  [PlanSubTabResources.Confirm]: "邀请我加入的方案",
  [PlanSubTabResources.All]: "全部方案",
}