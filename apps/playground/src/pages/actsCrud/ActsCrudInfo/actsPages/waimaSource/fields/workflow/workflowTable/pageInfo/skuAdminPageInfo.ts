import { PageUtil } from '@easy-page/antd-ui'
import { skuAdminDateRange } from '../fields/skuAdminDateRange'
import { skuAdminRowTitle } from '../fields/commonTitle'

const pu = new PageUtil({ pageId: 'skuAdminPageInfo' })
pu.addFields([skuAdminRowTitle, skuAdminDateRange])
export const skuAdminPageInfo = pu.getPageInfo()
