import { RequestHandler, postReq } from '@/common/libs'
import { QueryPoiApplyListParams } from './queryPoiApplyList'

export enum ExportSenceEnum {
  Discount = 'discount',
  GodPrice = 'godprice',
}
export type ExportSkuApplyRecordParams = Omit<
  QueryPoiApplyListParams,
  'currentPage' | 'pageSize'
> & {
  sence?: ExportSenceEnum
}

export type ExportSkuApplyRecordRes = string // 提示信息

// 列表下载
export const exportSkuApplyRecord: RequestHandler<
  ExportSkuApplyRecordParams,
  ExportSkuApplyRecordRes
> = (params) => {
  return postReq('/api/zspt/apply/exportSkuApplyRecord', params)
}
