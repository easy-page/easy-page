import { RequestHandler, getBizLine, postReq } from "../libs";

/** 不知道参数含义，太久远 */
export type GetCollectorListParams = {
  status?: string;
  isRelatedInvite?: number; // 0 - 
  keyword: string; // id 或者名称
  showType?: string;
  sourceType?: string;
  page?: number;
  pageSize?: number;
}

export type Collector = {
  id: number;
  name: string;
}

export type GetCollectorListRes = { collectorList: Collector[] }

export const getCollectorList: RequestHandler<GetCollectorListParams, GetCollectorListRes> = (params) => {
  const form = new FormData()
  const newParams = {
    status: '0,1,2,3',
    isRelatedInvite: 0,
    showType: '1',
    sourceType: '1',
    bizType: getBizLine(),
    page: 0,
    pageSize: 10,

    ...params
  }
  Object.keys(newParams).forEach((key) => {
    form.append(key, newParams[key as keyof GetCollectorListParams] as any)
  })
  return postReq('/collector/search', form, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}