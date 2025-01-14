import { RequestHandler, postReq } from '@/common/libs'

export type WaimaBrandItem = {
  brandId: string
  brandName: string
}

export type QueryBrandByNameParams = {
  brandName: string
  pageNum: number
  pageSize: number
}

export type QueryBrandByNameRes = {
  items: WaimaBrandItem[]
  total: number
}

export const queryBrandByName: RequestHandler<
  QueryBrandByNameParams,
  QueryBrandByNameRes
> = (params) => {
  return postReq('/api/zspt/apply/resource/queryBrandByName', params)
}
