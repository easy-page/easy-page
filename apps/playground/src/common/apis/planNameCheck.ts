import { BizLineEnum, PlanTypeEnum } from '../constants'
import { RequestHandler, postReq } from '../libs'

export type PlanNameCheckParams = {
  planName: string
  planType: PlanTypeEnum
  bizType: BizLineEnum
  planId?: number
}

export type PlanNameCheckRes = {
  nameRepeat: boolean
  repeatPlanList: number[]
}

export const planNameCheck: RequestHandler<
  PlanNameCheckParams,
  PlanNameCheckRes
> = (params) => {
  return postReq('/api/zspt/operation/plan/planNameCheck', params)
}
