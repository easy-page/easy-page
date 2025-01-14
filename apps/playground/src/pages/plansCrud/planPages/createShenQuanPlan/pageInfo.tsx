import { PageUtil, nodeUtil } from '@easy-page/antd-ui'
import {
  createChildPlanContainer,
  createZsptPlanContainer,
  planName,
  planType,
} from '../../fields'
import { planDesc } from '../../fields/planDesc'
import { toolbar } from '@/common/fields'
import { subPlan } from '../../fields/subPlan/subPlan'
import { ShenQuanSubsidyForm } from './fields/subPlanForm'
import { recordInfoField } from '@/common/fields/common/recordInfoField'

const pu = new PageUtil({ pageId: 'shenquan' })

pu.addFields([
  recordInfoField('id'),
  nodeUtil
    .createContainer('form-info', ({ children }) => {
      return <div className="p-6 overflow-auto min-w-[1000px]">{children}</div>
    })
    .appendChildren([
      createZsptPlanContainer().appendChildren([planType, planName, planDesc]),
      createChildPlanContainer().appendChildren([subPlan(ShenQuanSubsidyForm)]),
    ]),
  toolbar({
    name: '提交并新建方案',
  }),
])

export const shenQuanPageInfo = pu.getPageInfo()

console.log('shenhuiyuanPageInfo:', shenQuanPageInfo)
