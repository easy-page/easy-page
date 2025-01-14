import {
  applyControlContainer,
  needAuditRes,
  shyCancancelAct,
  shyCanEditAct,
} from '@/pages/actsCrud/ActsCrudInfo/fields'

export const applyControl = applyControlContainer().appendChildren([
  needAuditRes,
  shyCancancelAct,
  shyCanEditAct,
])
