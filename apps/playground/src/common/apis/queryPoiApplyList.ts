import { RequestHandler, postReq } from '@/common/libs'
import { ActivityStatusOfFilter } from '../constants'

export type QueryPoiApplyListParams = {
  actId?: number // 提报活动ID，必填
  poiIds?: number[] // 门店ID
  poiName?: string // 门店名称，支持模糊查询
  poiBrandIds?: number[] // 业务品牌ID
  poiBrandName?: string // 业务品牌名称，支持模糊查询
  status?: ActivityStatusOfFilter[] // 报名状态，选全部时不传即可，可通过Lion配置apply_result_status_4_poi获取
  cityIds?: number[] // 城市ID
  currentPage: number // 当前页码
  pageSize: number // 每页条数
  scene?: string
}

export type PoiApplyListItem = {
  /** 报名结果唯一标识 */
  id: number
  /**  门店ID */
  poiId: number
  /** 门店名称 */
  poiName: string
  /** 业务品牌ID */
  poiBrandId: number
  /** 业务品牌名称 */
  poiBrandName: string
  /** 门店/品牌负责人 */
  poiOwnerOrBrandOwner: string
  /** 商补出资 */
  chargeSidePoi: string
  /** 差异化商补 */
  chargeSidePoiy: string
  /** 差异化B补 */
  chargeSideMtb: string
  /** 差异化代补 */
  chargeSideAgent: string
  /**  商家预算（元） */
  budget4PoiDaily: string
  /** B补预算（元） */
  budget4MtbDaily: string
  /** 代补预算（元） */
  budget4AgentDaily: string
  /** 提交报名时间 */
  applyTime: string
  /** 报名状态 */
  status: ActivityStatusOfFilter
  /** 报名状态文本描述 */
  statusDesc: string
  /** 城市名 */
  cityName: string
  /** 通过审核门店数 */
  approvedPoiCount?: string
  /** 代表已邀请门店数 */
  invitePoiCount?: string
}

export type QueryPoiApplyListRes = {
  total: number
  items: PoiApplyListItem[]
}

export const queryPoiApplyList: RequestHandler<
  QueryPoiApplyListParams,
  QueryPoiApplyListRes
> = (params) => {
  return postReq('/api/zspt/apply/queryPoiApplyList', params)
}
