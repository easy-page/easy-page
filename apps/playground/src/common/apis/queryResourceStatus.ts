import { AuthTypeEnum } from "../constants"
import { postReq, RequestHandler } from "../libs";

// 仅有“品牌补贴”权限可用,否则提示申请权限
export type QueryResourceStatusParams = {
  resourceIdList: AuthTypeEnum[]
}
export type AuthResInfo = {
  resourceId: AuthTypeEnum;
  status: boolean;
}
export type QueryResourceStatusRes = AuthResInfo[]

export const queryResourceStatus: RequestHandler<QueryResourceStatusParams, QueryResourceStatusRes> = (params) => {
  return postReq('/api/sg/uoc/auth/queryResourceStatus', params)
}