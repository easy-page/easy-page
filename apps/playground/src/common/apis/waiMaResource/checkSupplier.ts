import { RequestHandler, postReq } from '@/common/libs'
import { WaimaBrandItem } from '../queryBrandByName'

export type CheckSupplierParams = {
  supplierId: string
}

export type CheckSupplierRes = {
  supplierId: number
  supplierName: string
}

export const checkSupplier: RequestHandler<
  CheckSupplierParams,
  CheckSupplierRes
> = (params) => {
  return postReq('/api/zspt/apply/resource/checkSupplier', params)
}
