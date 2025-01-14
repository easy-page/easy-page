import { RequestHandler, postReq } from '../libs'

export type GetJhdTypeParams = {}

export type JhdTypeItem = {
  value: string
  label: string
}

export const getJhdType: RequestHandler<GetJhdTypeParams, JhdTypeItem[]> = (
  params
) => {
  return postReq('/api/zspt/operation/act/jhdType', params)
}
