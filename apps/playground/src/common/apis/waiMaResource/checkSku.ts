import { RequestHandler, postReq } from '@/common/libs'

export interface checkSkuParams {
  skuCodes: string
}

export enum CheckSkuValidEnum {
  ALL_PASS = 1, // 全部通过
  NOT_ALL_PASS = 2, // 部分通过
}

export type checkSkuRes = {
  valid: CheckSkuValidEnum
  invalidCodes: string[]
}

export const checkSku: RequestHandler<checkSkuParams, checkSkuRes> = (
  params
) => {
  return postReq('/api/zspt/apply/resource/checkSku', params)
}
