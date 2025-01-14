import { AuthUrl, OperationEnum } from "../constants"
import { postReq, RequestHandler } from "../libs"

export type CheckActCopyAuthParams = {
  opType: OperationEnum
  activityId: number
}

export enum ActAuthTypeEnum {
  Charge = 'charge',
  SjInvited = 'sjInvited'
}

export type CheckActCopyAuthRes = {
  authResult: boolean
  reason: string
  authType?: ActAuthTypeEnum
}

export const checkActCopyAuth: RequestHandler<CheckActCopyAuthParams, CheckActCopyAuthRes> = (params) => {
  return postReq(AuthUrl.ActCheckAuth, params)
}