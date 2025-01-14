import { ActivityStatusOfFilter } from '@/common/constants'
import { RequestHandler, postReq } from '@/common/libs'
// import { ActivityStatusOfFilter } from '../constants'

export type QuerySkuApplyListParams = {
  actId?: number
  /** 商品 ID */
  skuIds?: number[]
  /** 商品名 */
  skuName?: string[]
  /** 门店 ID */
  poiIds?: number[]
  /** 门店名称 */
  poiName?: string
  upcList?: string[]
  /** 门店品牌 ID */
  poiBrandIds?: number[]
  /** 活动状态 */
  status?: string[]
  /** 城市 */
  cityIds?: number[]
  applyStartTime?: string //报名开始结束时间
  applyEndTime?: string
  /** 子活动 ids */
  subActIds?: number[]
  /** 券类型筛选条件 key */
  applyType?: string
  currentPage: number // 当前页码
  pageSize: number // 每页条数
}

export interface Charge {
  side: string
  value: number
}

export interface BuyLimit {
  type: string // "ORDER"
  value: number
}

export type SkuApplyListItem = {
  esId: number
  actId: number
  subActId: string
  subActName: string
  skuId: number
  skuCode: string
  upc: string
  price: number //单位分   12月12确认实际记录的元，实际返回元
  actPrice: number //单位分，12月12确认实际记录的元，实际返回元
  discount: number
  charge: Charge[] //[{"side":"MT","value":100}], //POI-商家，AGENT-代理商，MT-美团，BRAND-品牌，单位元
  actStock: number
  buyLimit: BuyLimit[] // ["type":"order","value":1] //ORDER-每单限购
  /**  门店ID */
  poiId: number
  /** 门店名称 */
  poiName: string
  /** 业务品牌ID */
  poiBrandId: number
  /** 业务品牌名称 */
  poiBrandName: string
  poiBrandOpMis: string // 品牌运营mis
  poiBrandOpName: string // 品牌运营名称
  /** 城市名 */
  cityName: string
  // "status":"待审核",
  /** 报名状态 */
  status: ActivityStatusOfFilter

  remark: string //状态备注，驳回、清退等原因提示
  targetUser: string // "目标人群",
  inviteTime: string
  /** 提交报名时间 */
  applyTime: string
  actionList: string[] // ["cancel","reject","approve"]
  picture: string
  dayStock: number
}

export type QuerySkuApplyListRes = {
  total: number
  items: SkuApplyListItem[]
}

export const querySkuApplyList: RequestHandler<
  QuerySkuApplyListParams,
  QuerySkuApplyListRes
> = (params) => {
  return postReq('/api/zspt/apply/querySkuApplyList', params)
}
