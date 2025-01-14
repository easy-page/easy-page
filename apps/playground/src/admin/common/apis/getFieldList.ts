import {
  adminPostReq,
  ConfigEnv,
  FieldBelongFirstLevel,
  RequestHandler,
  RequestResult,
} from '@/common'
import { FieldConfig } from '@/common/constants/fieldMaps/interface'

export type GetFieldListParams = {
  pageNo: number
  pageSize: number
  belong?: FieldBelongFirstLevel
  fieldName?: string
  fieldIds?: number[]
  env?: ConfigEnv
}

export type GetFieldListRes = {
  data: FieldConfig[]
  total: number
}

export const getFieldList: RequestHandler<
  GetFieldListParams,
  GetFieldListRes
> = async (params) => {
  const result: RequestResult<GetFieldListRes> = await adminPostReq(
    '/zspt-admin-api/fieldconfig/search',
    params
  )
  console.log('resultresult:', result)
  if (!result || !result.success) {
    return result as any as RequestResult<GetFieldListRes>
  }

  return {
    ...result,
    data: {
      total: result.data?.total || 0,
      data: result.data?.data || [],
    },
  }
}
