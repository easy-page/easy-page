import { RequestHandler, postReq } from '@/common/libs'
import { WaimaBrandItem } from './queryBrandByName'

export type QueryBrandByIdsParams = {
  brandIdList: string[]
}

export type QueryBrandByIdsRes = {
  items: WaimaBrandItem[]
  total: number
}

export const queryBrandByIds: RequestHandler<
  QueryBrandByIdsParams,
  QueryBrandByIdsRes
> = (params) => {
  return postReq('/api/zspt/apply/resource/queryBrandByIds', params)
}
