import { PageUtil } from '@easy-page/antd-ui'
import { dismisWay, poiId, reason } from './fields'
import { bottomToolbar } from '@/common/fields'

export const pu = new PageUtil({
  pageId: 'batch-dismiss',
})
pu.addFields([dismisWay, poiId, reason, bottomToolbar({})])
export const pageInfo = pu.getPageInfo()
