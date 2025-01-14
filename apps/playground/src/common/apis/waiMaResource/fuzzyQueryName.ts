import { RequestHandler, postReq } from '@/common/libs'

export type WaimaSupplierItem = {
  supplierId: number
  supplierName: string
}

export type FuzzyQueryNameParams = {
  keyWord: string
}

export type FuzzyQueryNameRes = {
  items: WaimaSupplierItem[]
  total: number
}

export const fuzzyQueryName: RequestHandler<
  FuzzyQueryNameParams,
  FuzzyQueryNameRes
> = (params) => {
  return postReq('/api/zspt/apply/resource/fuzzyQueryName', params)
}
