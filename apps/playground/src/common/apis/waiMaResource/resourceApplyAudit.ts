import { RequestHandler, postReq } from '@/common/libs'

export interface AuditResource {
  activityId: number // 活动ID
  resourceId: number // 资源位ID
  auditStatus: number // 1 通过，2 驳回
  rejectReason: string // 驳回理由，通过传空字符串
}

export type AuditResourceRes = {}

export const resourceApplyAudit: RequestHandler<
  AuditResource,
  AuditResourceRes
> = (params) => {
  return postReq('/api/zspt/apply/resource/resourceApplyAudit', params)
}
