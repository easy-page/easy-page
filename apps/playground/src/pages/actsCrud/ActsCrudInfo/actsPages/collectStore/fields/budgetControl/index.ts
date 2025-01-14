import {
  budgetControlContainer,
  commonApplyReason,
} from '@/pages/actsCrud/ActsCrudInfo/fields'
import { csBudgetResponsibility } from './budgetaryResponsibility'

export const csBudgetControl = budgetControlContainer().appendChildren([
  csBudgetResponsibility(),
  commonApplyReason,
])
