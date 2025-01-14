import { CheckOpGrayResEnum, GrayRuleCode, PlanTypeEnum } from '../constants'
import { postReq, RequestHandler } from '../libs'

export type ExtendParams = {
  actId?: string
  planId?: string
}

// PRD: https://km.sankuai.com/collabpage/2132111062
export type CheckOpGrayParams = {
  ruleCodes?: GrayRuleCode[]
  extend: ExtendParams
}

export type CheckOpGrayRes = CheckOpGrayResEnum

export const checkOpGray: RequestHandler<
  CheckOpGrayParams,
  CheckOpGrayRes
> = async ({ ...params }) => {
  const result = await postReq('/api/zspt/operation/common/batchGray', {
    ...params,
    // 改名字了？
    ruleCodeList: params.ruleCodes || [GrayRuleCode.FlowControlGray],
  })
  if (
    result.success &&
    Object.keys(result.data || {}).every(
      (key) => result.data[key] === CheckOpGrayResEnum.Pass
    )
  ) {
    return { success: true }
  } else if (result.success) {
    return { success: false, msg: result.msg || '无新功能灰度权限，不可操作。' }
  } else {
    return { success: false, msg: result.msg || '网络异常，请稍后重试' }
  }
}
