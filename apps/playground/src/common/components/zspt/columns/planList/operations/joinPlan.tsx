import { PlanInfo } from '@/common/apis'
import { Operation } from '../../../Operations'
import { OperationEnum, BizLineEnum } from '@/common/constants'
import { toOldJoinPlan } from '@/common/routes/toUrls/old/toOldJoinPlan'
import { getShowConfig } from '../../utils'

export const joinPlanBtn: Operation<PlanInfo> = {
  id: OperationEnum.JoinPlan,
  label: '加入方案',
  show: getShowConfig((fullConfig) => {
    return fullConfig.showJoinPlanBtn
  }),
  action({ record }) {
    toOldJoinPlan(
      {
        planId: record.id ? `${record.id}` : '',
        planType: record.planType,
        bizLine: BizLineEnum.ShanGou,
      },
      '_blank'
    )
  },
  auth: [],
}
