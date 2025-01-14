import { RequestHandler, postReq } from "@/common/libs";

export type ExportPoiApplyRecordDetailParams = {
  actId: number
}

export type ExportPoiApplyRecordDetailRes = string; // 提示信息


// 下载已报名明细
export const exportPoiApplyRecordDetail: RequestHandler<ExportPoiApplyRecordDetailParams, ExportPoiApplyRecordDetailRes> = (params) => {
  return postReq('/api/zspt/apply/exportPoiApplyRecord', params)
}