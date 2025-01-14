import { RequestHandler, postReq } from "@/common/libs";

export type Employ = {
  login: string;
  name: string;
}

export type GetUserInfosParams = {
  keyword?: string;
}

export type GetUserInfoRes = Employ[];

export const searchUserInfos: RequestHandler<GetUserInfosParams, GetUserInfoRes> = (params) => {
  return postReq('/api/zspt/operation/common/userQuery', params)
}