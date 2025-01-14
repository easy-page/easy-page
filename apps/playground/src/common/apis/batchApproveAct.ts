import { RequestHandler, postReq } from '@/common/libs'
import { QueryPoiApplyListParams } from './queryPoiApplyList'
import { ExitPoiApplyRes } from './exitPoiApply'

export type BatchApproveActParams = {
  esId: number
  /** 活动 ID */
  actId: number
  /** 门店 ID */
  poiId: number
  /** 商品 ID */
  skuId: number
}[]

export type BatchApproveActRes = ExitPoiApplyRes // 提示信息

// 批量审核通过
export const batchApproveAct: RequestHandler<
  BatchApproveActParams,
  BatchApproveActRes
> = async (params) => {
  const data = await postReq(
    '/api/zspt/apply/batchApproveSkuApplyRecord',
    params
  )
  const res = data.data as ExitPoiApplyRes
  return { success: res.failRecords?.length === 0, msg: '', data: res }
}
