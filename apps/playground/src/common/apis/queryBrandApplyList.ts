import { RequestHandler, postReq } from '@/common/libs'
import { ActivityStatusOfFilter } from '../constants'

export type QueryBrandApplyListParams = {
  actId?: number // 提报活动ID，必填
  poiIds?: number[] // 门店ID
  poiName?: string // 门店名称，支持模糊查询
  poiBrandIds?: number[] // 业务品牌ID
  poiBrandName?: string // 业务品牌名称，支持模糊查询
  status?: ActivityStatusOfFilter[] // 报名状态，选全部时不传即可，可通过Lion配置apply_result_status_4_poi获取
  cityIds?: number[] // 城市ID
  currentPage: number // 当前页码
  pageSize: number // 每页条数
}

export type BrandApplyListItem = {
  actId: number
  /** 报名结果唯一标识 */
  id: number
  /** 业务品牌ID */
  poiBrandId: number
  /** 业务品牌名称 */
  poiBrandName: string
  /** 门店/品牌负责人 */
  poiOwnerOrBrandOwner: string
  /** 通过审核门店数 */
  approvedPoiCount: string
  /** 代表已邀请门店数 */
  invitePoiCount: string
}

export type QueryBrandApplyListRes = {
  total: number
  items: BrandApplyListItem[]
}

export const queryBrandApplyList: RequestHandler<
  QueryBrandApplyListParams,
  QueryBrandApplyListRes
> = (params) => {
  return postReq('/api/zspt/apply/poiBrand/queryPoiBrandApplyList', params)
}
