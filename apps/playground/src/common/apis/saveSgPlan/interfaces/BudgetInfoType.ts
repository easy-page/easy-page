import { BudgetDegreeEnum } from "@/common/constants"

export type BudgetInfoType = {
  pn: string //pn号
  pnName: string //pn名
  budgetAmount: number | string // 预算
  budgetControl: BudgetDegreeEnum // 管控类型
  usedAmount?: number
  usedPercent?: number
}
