import { postReq, RequestHandler } from '../libs'
import { ActFullInfo } from './saveAct'

export type CheckGuideCreateInfoParams = ActFullInfo
export type CheckGuideCreateInfoRes = {
  canUpdateRule: boolean
  reason?: string
}

export const checkGuideCreateInfo: RequestHandler<
  CheckGuideCreateInfoParams,
  CheckGuideCreateInfoRes
> = (params) => {
  return postReq('/api/zspt/operation/act/poiBuildProductCheck', params)
}
