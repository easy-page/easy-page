import { RequestHandler, postReq } from "@/common/libs";
import { QueryPoiApplyListParams } from "./queryPoiApplyList";

export type ExportPoiApplyRecordParams = Omit<QueryPoiApplyListParams, 'currentPage' | 'pageSize'>

export type ExportPoiApplyRecordRes = string; // 提示信息


// 下载列表
export const exportPoiApplyRecord: RequestHandler<ExportPoiApplyRecordParams, ExportPoiApplyRecordRes> = (params) => {
  return postReq('/api/zspt/apply/exportPoiApplyRecord', params)
}