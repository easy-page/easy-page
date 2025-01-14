import { PageUtil, nodeUtil } from '@easy-page/antd-ui'
import {
  createChildPlanContainer,
  createZsptPlanContainer,
  planName,
  planType,
  uoionCouponPlanName,
} from '../../fields'
import { planDesc } from '../../fields/planDesc'
import { toolbar } from '@/common/fields'
import { subPlan } from '../../fields/subPlan/subPlan'
import { UnionCouponSubsidyForm } from './fields/subPlanForm'
import { recordInfoField } from '@/common/fields/common/recordInfoField'

const pu = new PageUtil({ pageId: 'shenquan' })

pu.addFields([
  recordInfoField('id'),
  nodeUtil
    .createContainer('form-info', ({ children }) => {
      return <div className="p-6 overflow-auto min-w-[1000px]">{children}</div>
    })
    .appendChildren([
      createZsptPlanContainer().appendChildren([
        planType,
        uoionCouponPlanName,
        planDesc,
      ]),
      createChildPlanContainer().appendChildren([
        subPlan(UnionCouponSubsidyForm),
      ]),
    ]),
  toolbar({
    name: '提交并新建方案',
  }),
])

export const unionCouponPageInfo = pu.getPageInfo()
