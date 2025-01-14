import { toOldJoinPlan } from '@/common/routes/toUrls/old/toOldJoinPlan'
import { PlanOpActionHandler } from '../common/interface'
import { BizLineEnum, OperationType } from '@/common/constants'

export const handleGodPricePlanView: PlanOpActionHandler = async ({
  record,
}) => {
  toOldJoinPlan(
    {
      operationType: OperationType.VIEW,
      planId: record.id ? `${record.id}` : '',
      planType: record.planType,
      bizLine: BizLineEnum.ShanGou,
    },
    '_blank'
  )
}
