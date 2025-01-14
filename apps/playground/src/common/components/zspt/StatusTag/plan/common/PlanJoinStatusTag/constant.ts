import { PlanJoinStatusEnum } from '@/common/constants'
import { ShowStatusBoxProps } from '../../../common/interface'

export const PlanJoinStatusColors: Record<
  PlanJoinStatusEnum,
  ShowStatusBoxProps
> = {
  [PlanJoinStatusEnum.WaitJoin]: {
    fontColor: '#FFFFFF',
    bgColor: '#F96400',
  },
  [PlanJoinStatusEnum.HasJoin]: {
    fontColor: '#FFFFFF',
    bgColor: '#08C183',
  },
  [PlanJoinStatusEnum.Finished]: {
    fontColor: '#FFFFFF',
    bgColor: '#BCBCBD',
  },
  [PlanJoinStatusEnum.NoInvite]: {
    fontColor: '#FFFFFF',
    bgColor: '#BCBCBD',
  },
}
