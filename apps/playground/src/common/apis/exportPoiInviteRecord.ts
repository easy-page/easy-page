import { RequestHandler, postReq } from '@/common/libs'

export type ExportPoiInviteRecordParams = {
  actId: number
}

export type ExportPoiInviteRecordRes = string // 后端返回的提示信息

export const exportPoiInviteRecord: RequestHandler<
  ExportPoiInviteRecordParams,
  ExportPoiInviteRecordRes
> = (params) => {
  return postReq('/api/zspt/apply/exportPoiInviteRecord', params)
}
