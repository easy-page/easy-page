import { RequestHandler, postReq } from '@/common/libs'
import { QueryPoiApplyListParams } from './queryPoiApplyList'
import { ExitPoiApplyRes } from './exitPoiApply'

export interface BatchConfirmSubsidyActInfo {
  actId: number // 提报活动ID
  relBrandIds: number[] // 该提报活动关联的品牌ID
}

export interface BatchConfirmSubsidyChargeDetailVo {
  poiType: string // 门店类型
  chargeSide: number // 补贴承担方 (14-品牌 3-代理商 1=门店 14010-美团外卖 14060-美团闪购 14090-美团医药)
  chargeType: number // 补贴类型(1金额/2比例)
  chargeAmt: number // 补贴数额，单位元
  maxAmount?: number | null // 最大金额，单位元
  pn?: string // pn码
}

export type SubmidBatchConfirmSubsidyParams = {
  actInfo: BatchConfirmSubsidyActInfo[] // 确认活动信息，必填
  chargeDetailVos: BatchConfirmSubsidyChargeDetailVo[] // 补贴分摊信息，必填
  confirm4Batch: boolean // 是否是批量提报
}

export type SubmidBatchConfirmSubsidyRes = null

// 批量确认提报补贴
export const submidBatchConfirmSubsidy: RequestHandler<
  SubmidBatchConfirmSubsidyParams,
  SubmidBatchConfirmSubsidyRes
> = async (params) => {
  return postReq('/api/zspt/operation/operConfirm/batch/confirmJoin', params)
}
