import { CheckOpGrayResEnum, GrayRuleCode, PlanTypeEnum } from '../constants'
import { postReq, RequestHandler } from '../libs'

export type ExtendParams = {
  actId?: string
  planId?: string
}

// PRD: https://km.sankuai.com/collabpage/2132111062
export type BatchGrayParams = {
  ruleCodes?: GrayRuleCode[]
  extend: ExtendParams
}

export type BatchGrayRes = Record<GrayRuleCode, CheckOpGrayResEnum>

export const batchGray: RequestHandler<BatchGrayParams, BatchGrayRes> = async ({
  ...params
}) => {
  const result = await postReq('/api/zspt/operation/common/batchGray', {
    ...params,
    ruleCodeList: params.ruleCodes || [],
  })
  if (result.success) {
    return { success: true, data: result?.data }
  } else {
    return { success: false, msg: result.msg || '网络异常，请稍后重试' }
  }
}
