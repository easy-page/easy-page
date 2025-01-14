import { openInUocEntry } from '@/common/libs'
import { BizLineEnum, OperationType, PlanTypeEnum } from '@/common/constants'
import { ToPageHandler } from '../../interface'
import { UrlEnum } from '../../urls'
import { appendParamsToUrl } from '../../utils'

export enum JoinPlanParamsEnum {
  PlanId = 'planId',
  PlanType = 'planType',
  OperationType = 'operationType',
  BizLine = 'bizLine',
}

export type JoinPlanParams = {
  planId: string
  planType: PlanTypeEnum
  operationType?: OperationType
  bizLine: BizLineEnum
}

export const toOldJoinPlan: ToPageHandler<JoinPlanParams> = (
  params,
  target
) => {
  openInUocEntry(
    appendParamsToUrl(UrlEnum.OldJoinPlan, {
      ...params,
      in_uoc_sys: true,
    }),
    target
  )
}
