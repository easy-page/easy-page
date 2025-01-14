export enum SubFormIds {
  SubAct = 'subAct',
  BudgetControl = 'budgetControl',
  /** 生效时段 */
  ActPeriod = 'actPeriod',
}

export const SubFormIdsText: Record<SubFormIds, string> = {
  [SubFormIds.SubAct]: '子活动',
  [SubFormIds.BudgetControl]: '补贴分担',
  [SubFormIds.ActPeriod]: '生效时段',
}
