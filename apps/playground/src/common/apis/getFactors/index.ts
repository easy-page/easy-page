import { RequestHandler, RequestResult, postReq } from '@/common/libs'
import {
  FactorListFromBackend,
  GetFactorsParams,
  FactorInfo,
} from './interface'
import { getFirstCategoryList, prepareFactorsResult } from './utils'

export const getAllFactors: RequestHandler<
  GetFactorsParams,
  FactorInfo
> = async (params: GetFactorsParams) => {
  const result: RequestResult<FactorListFromBackend> = await postReq(
    '/api/zspt/operation/factor/list',
    params
  )
  if (!result.success) {
    return result as any as RequestResult<FactorInfo>
  }
  const fullInfo = prepareFactorsResult(result.data || {})

  const firstCategoryList = getFirstCategoryList(fullInfo)

  return {
    ...result,
    data: {
      fullInfo,
      firstCategoryList,
    },
  }
}

export * from './interface'
export * from './utils'
