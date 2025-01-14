import { workFlowContainer } from '@/pages/actsCrud/ActsCrudInfo/fields'
import { skuAdminPartner } from './skuAdminPartner'
import { purchaseManagerPartner } from './purchaseManagerPartner'
import { workflowTable } from './workflowTable'

export const wmsWorkFlow = workFlowContainer().appendChildren([
  skuAdminPartner,
  purchaseManagerPartner,
  workflowTable,
])
