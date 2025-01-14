import { PlanInfo } from '@/common/apis'
import { PlanJoinStatusTag } from './common'
import { PLAN_JOIN_STATUS_DESC } from '@/common/constants'
import { StatusTagSizeEnum } from '../common/constant'

export const JoinPlanStatus = ({ row }: { row: PlanInfo }) => {
  const { joinStatus } = row
  return (
    <div>
      <PlanJoinStatusTag size={StatusTagSizeEnum.Small} status={joinStatus}>
        {PLAN_JOIN_STATUS_DESC[joinStatus]}
      </PlanJoinStatusTag>
    </div>
  )
}
