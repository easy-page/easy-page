import { applyControlContainer } from '@/pages/actsCrud/ActsCrudInfo/fields'
import { csCancancelAct } from './fields/csCanCancelAct'
import { csCanEditAct } from './fields/csCanEditAct'
import { csCanEditGoodInfo } from './fields/csCanEditGoodInfo'
import { csCanAudit } from './fields/csCanAudit'
import { csCanApplyRole } from '@/pages/actsCrud/ActsCrudInfo/fields/canApplyRole'

export const applyControl = applyControlContainer().appendChildren([
  csCanApplyRole,
  csCancancelAct,
  csCanEditAct,
  csCanEditGoodInfo,
  csCanAudit,
])

export * from './fields'
