import { PageUtil } from '@easy-page/antd-ui'
import { skuAdminDateRange } from '../fields/skuAdminDateRange'
import { skuAdminRowTitle, supplierRowTitle } from '../fields/commonTitle'
import { supplierDateRange } from '../fields/supplierDateRange'

const pu = new PageUtil({ pageId: 'supplierPageInfo' })
pu.addFields([supplierRowTitle, supplierDateRange])
export const supplierPageInfo = pu.getPageInfo()
