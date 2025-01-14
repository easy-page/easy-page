import { PlanInfo } from '@/common/apis'
import { Operation } from '../../../Operations'
import { BizLineEnum, OperationEnum, OperationType } from '@/common/constants'
import { toPlanDetailPage } from '@/common/routes/toUrls/toPlanDetail'
import { getBizLine } from '@/common/libs'
import { toOldCrudPlan } from '@/common/routes/toUrls/old/toOldCurdPlan'
import { getPlanConfig } from '@/common/configs'
import { getPlanActionHandler } from '../actions'
import { PlanActionHandlersEnum } from '../actions/common/constant'

export const planView: Operation<PlanInfo> = {
  id: OperationEnum.View,
  label: '查看',
  show() {
    return true
  },
  action: getPlanActionHandler({
    action: PlanActionHandlersEnum.PlanView,
    defaultAction: (context) => {
      const { record, configs } = context
      const config = getPlanConfig({ planType: record.planType, configs })
      console.log('查看:', record, config)

      if (config.useNewZsptFramework) {
        toPlanDetailPage(
          {
            planId: record.id,
            bizLine: getBizLine(),
            planType: record?.planType,
          },
          '_blank'
        )
        return
      }

      toOldCrudPlan(
        {
          operationType: OperationType.VIEW,
          bizLine: BizLineEnum.ShanGou,
          planId: record.id ? `${record.id}` : '',
          planType: record.planType,
        },
        '_blank'
      )
    },
  }),
  auth: [],
}
