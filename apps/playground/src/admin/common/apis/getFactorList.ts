// /api/zspt/factor/list

import { CategoryCode, postReq, RequestHandler } from '@/common'

export type GetFactorListParams = {
  factorCode?: string
  factorName?: string
  status?: number // 1 为线上因子
}

export type FactorInfo = {
  factorCode: string
  factorName: string
  categoryCode: CategoryCode
  id: number
}

export type GetFactorListRes = {
  items: FactorInfo[]
  total: number
}

export const getFactorList: RequestHandler<
  GetFactorListParams,
  GetFactorListRes
> = (params) => {
  return postReq('/api/zspt/factor/list', {
    ...params,
    currentPage: 1,
    status: 1,
  })
}
