import { baseBudgetaryResponsibility } from './base'
import { commonBudgetAmount, pn, pnControl } from './pnForm'

export const commonBudgetaryResponsibility = baseBudgetaryResponsibility({
  nodes: [pn, commonBudgetAmount, pnControl],
})
