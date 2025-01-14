import { RequestHandler, postReq } from "../libs";

export type GetActApplyResStatusOptionsParams = {}

export type StatusOption = {
  label: string;
  value: string | number;
}
export type GetActApplyResStatusOptionsRes = StatusOption[]

export const getStatusFilterOptions: RequestHandler<GetActApplyResStatusOptionsParams, GetActApplyResStatusOptionsRes> = async () => {
  return postReq('/api/zspt/apply/skuDetailState', {})
}