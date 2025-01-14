import { RequestHandler, postReq } from '@/common/libs'

export type ExitBrandApplyParams = {
  actId: number // 提报活动 ID
  reason: string // 清退理由
  poiBrandIds: number[]
  operateTime: number //操作时间
}
export type ExitBrandApplyRes = number

export const exitBrandApply: RequestHandler<
  ExitBrandApplyParams,
  ExitBrandApplyRes
> = (params) => {
  return postReq(
    '/api/zspt/apply/poiBrand/exitPoiApplyByPoiBrandIdList',
    params
  )
}
