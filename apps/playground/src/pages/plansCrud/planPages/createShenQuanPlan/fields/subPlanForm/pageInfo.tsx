import { PageUtil } from '@easy-page/antd-ui'
import { recordInfoField } from '@/common/fields'
import { actList, subPlanBaseInfo } from '@/pages/plansCrud/fields'
import { subsidyRule } from './subsidyRule'

const pu = new PageUtil({ pageId: 'shenquan-sub-plan' })

pu.addFields([
  subPlanBaseInfo,
  subsidyRule,
  actList,
  recordInfoField('id'),
  recordInfoField('groupStatus'),
])

export const shenQuanSubPlanInfo = pu.getPageInfo()
