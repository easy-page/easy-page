import { RequestHandler, postReq } from '@/common/libs'
import { BrandListDismissCountRes } from './getBrandListDismissCount'

export type BrandDismissCountParams = {
  poiBrandIds: number[]
  actId: number
  operateTime: number
}

export type BrandDismissCountRes = BrandListDismissCountRes

export const getBrandDismissCount: RequestHandler<
  BrandDismissCountParams,
  BrandDismissCountRes
> = (params) => {
  return postReq(
    '/api/zspt/apply/poiBrand/queryExitPoiCountByPoiBrandIdList',
    params
  )
}
