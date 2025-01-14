import { RequestHandler, postReq } from "../libs"

export type QueryPoiListParams = {
  activityId: number;
  currentPage: number;
  pageSize: number;
  poiBrandId?: string;
  poiId?: string;
}
export type QueryPoiListRes = {
  items: PoiInfo[]
  total: number;
}
export type PoiInfo = {
  poiId: number;
  poiBrandId: number;
}

export const queryPoiList: RequestHandler<QueryPoiListParams, QueryPoiListRes> = (params) => {
  if (!params.activityId) {
    return Promise.resolve({
      success: true,
      data: { total: 0, items: [] }
    })
  }
  return postReq('/api/zspt/operation/invitation/queryPoiList', params)
}