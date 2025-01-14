import { Empty } from "@easy-page/antd-ui";
import { RequestHandler, postReq } from "../libs";

export type ActAuthInfo = {
  modify: string, // 编辑操作授权mis号
  send: string, // 发送邀请操作授权mis号
  withdraw: string // 撤回操作授权mis号
}

export type AuthActParams = {
  activityId: number;
  authInfo: ActAuthInfo
}



export const authAct: RequestHandler<AuthActParams, Empty> = (params) => {
  return postReq('/api/zspt/operation/act/saveAuthInfo', params)
}