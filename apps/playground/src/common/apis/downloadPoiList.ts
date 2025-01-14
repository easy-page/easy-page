import { Empty } from "@easy-page/antd-ui";
import { RequestHandler, postReq } from "../libs";

export type DownloadPoiListParams = {
  activityId: number;
}

export type DownloadPoiListRes = Empty;

export const downloadPoiList: RequestHandler<DownloadPoiListParams, DownloadPoiListRes> = (params) => {
  return postReq('/api/zspt/operation/invitation/downloadPoiExcel', params);
}