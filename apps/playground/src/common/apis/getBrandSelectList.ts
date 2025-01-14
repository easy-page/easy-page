import { RequestHandler, postReq } from '@/common/libs'
import { Empty } from '@easy-page/antd-ui'

export type SingleBrandSelectOption = {
  label: string
  value: number
}

/**
 * 业务品牌维度的确认：获取查询品牌列表
 */

export const getBrandSelectList: RequestHandler<
  Empty,
  SingleBrandSelectOption[]
> = (params) => {
  return postReq(
    '/api/zspt/operation/operConfirm/batch/getBrandSelectList',
    params
  )
}
