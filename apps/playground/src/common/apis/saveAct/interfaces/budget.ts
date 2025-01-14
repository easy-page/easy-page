import { BudgetDegreeEnum, IsInMisOrgPn } from '@/common/constants'

// 预算管理
export interface IBudget {
  degree: BudgetDegreeEnum
  //品牌分摊组织
  pn: string
  pnName: string
  //预算金额，由品牌录入，此时不填充
  budget?: number

  /** pn 剩余预算 */
  balance?: number

  /** 返回预算消耗 */
  budgetCost?: string

  offline?: boolean

  isInMisOrg?: IsInMisOrgPn
}
