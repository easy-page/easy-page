import { RequestHandler, postReq } from '@/common/libs';

export enum BrandApplyRecordDownloadType {
  InviteDetail = 1,
  ApplyDetail = 2,
  ListDetail = 3,
}

export type ExportBrandApplyRecordDetailParams = {
  actId: number;
  exportType: BrandApplyRecordDownloadType; //下载类型。1-下载已邀请明细、2-下载已报名明细、3-列表下载
};

export type ExportPoiApplyRecordDetailRes = string; // 提示信息

// 业务品牌维度-文件下载
export const exportBrandApplyRecordDetail: RequestHandler<ExportBrandApplyRecordDetailParams, ExportPoiApplyRecordDetailRes> = (params) => {
  return postReq('/api/zspt/apply/poiBrand/exportPoiBrandApplyRecord', params);
};
