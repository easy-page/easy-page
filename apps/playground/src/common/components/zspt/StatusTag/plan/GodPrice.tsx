import { PlanInfo } from '@/common/apis'
import { PlanStatusEnum } from '@/common/constants'
import { StatusTagSizeEnum } from '../common/constant'
import { PlanStatusTag } from './common/PlanStatusTag'
import { PlanStatus } from './Normal'

export const GodPriceStatus = ({ row }: { row: PlanInfo }) => {
  const { statusDesc, status, joinedGroupCnt, invitedGroupCnt } = row
  if (status === PlanStatusEnum.TobePublish) {
    return <PlanStatus row={row} />
  }
  return (
    <div>
      <PlanStatusTag
        size={StatusTagSizeEnum.Small}
        status={status as PlanStatusEnum}
      >
        {statusDesc}
      </PlanStatusTag>
      <div className="status-invite">
        邀约合作方{joinedGroupCnt}/{invitedGroupCnt}
      </div>
    </div>
  )
}
