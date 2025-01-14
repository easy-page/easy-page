import { RequestHandler, postReq } from '@/common/libs'

export type ExportSkuInviteRecordParams = {
  actId: number
}

export type ExportSkuInviteRecordRes = string // 后端返回的提示信息

export const exportSkuInviteRecord: RequestHandler<
  ExportSkuInviteRecordParams,
  ExportSkuInviteRecordRes
> = (params) => {
  return postReq('/api/zspt/apply/exportSkuInviteRecord', params)
}
