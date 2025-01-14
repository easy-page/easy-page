import { PageUtil } from '@easy-page/antd-ui'
import { subsidyRule } from './subsidyStrategy'
import { recordInfoField } from '@/common/fields'
import { actList, subPlanBaseInfo } from '@/pages/plansCrud/fields'

const pu = new PageUtil({ pageId: 'shenhuiyuan-sub-plan' })

pu.addFields([
  subPlanBaseInfo,
  subsidyRule,
  actList,
  recordInfoField('id'),
  recordInfoField('groupStatus'),
])

export const shenhuiyuanSubPlanInfo = pu.getPageInfo()
