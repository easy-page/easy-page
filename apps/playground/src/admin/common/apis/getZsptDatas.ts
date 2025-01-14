import { adminPostReq, RequestHandler } from '@/common'

export interface ActTotalInfo {
  /** 总数 */
  totalCount: number
  /** 业务线 */
  bizLine?: number
  /** 业务线名 */
  bizLineName?: string
  templateId?: number
  actName?: string
  /** 运营 */
  creatorCount: number
  month?: string
}

export interface PlanTotalInfo {
  /** 总数 */
  totalCount: number
  /** 业务线 */
  bizLine?: number
  /** 业务线名 */
  bizLineName?: string
  /** 方案类型 */
  type?: number
  planName?: string
  /** 运营 */
  creatorCount: number
}

export type ZsptDatas = {
  allActsDatas: ActTotalInfo
  actsDatas: ActTotalInfo[]
  actsDatasByYears: ActTotalInfo[]
  allPlansDatas: PlanTotalInfo
  plansData: PlanTotalInfo[]
}

export const getZsptData: RequestHandler<{}, ZsptDatas> = async () => {
  const res = await adminPostReq('/zspt-admin-api/zspt-datas/datas', {})
  console.log('zspt data:', res)
  return res
}
