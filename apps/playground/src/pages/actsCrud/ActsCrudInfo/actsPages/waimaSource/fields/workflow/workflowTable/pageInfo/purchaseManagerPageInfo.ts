import { PageUtil } from '@easy-page/antd-ui'
import { skuAdminDateRange } from '../fields/skuAdminDateRange'
import {
  purchaseManagerRowTitle,
  skuAdminRowTitle,
} from '../fields/commonTitle'
import { purchaseManagerDateRange } from '../fields/purchaseManagerDateRange'

const pu = new PageUtil({ pageId: 'purchaseManagerPageInfo' })
pu.addFields([purchaseManagerRowTitle, purchaseManagerDateRange])
export const purchaseManagerPageInfo = pu.getPageInfo()
