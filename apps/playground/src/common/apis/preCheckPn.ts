import { RequestHandler, postReq } from '@/common/libs'

export type PreCheckPnParams = {
  pn: string
  actIds: number[]
}

export type PreCheckPnRes = {
  isValid: boolean // PN合法
  reason: string // PN不可用的理由
}

export const preCheckPn: RequestHandler<PreCheckPnParams, PreCheckPnRes> = (
  params
) => {
  return postReq('/api/zspt/operation/operConfirm/batch/preCheckPn', params)
}
