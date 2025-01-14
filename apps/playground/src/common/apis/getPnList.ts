import { RequestHandler, postReq } from "@/common/libs";
import { ChargeSideEnum } from "../constants/subsidy"

export enum IsMisOrgPn {
  Yes = 1,
  No = 0
}

export type GetPnListParams = {
  bgBuList: ChargeSideEnum[] // 补贴承担方，不同的活动可能不同
  isInMisOrg: IsMisOrgPn; // 查所有的时候，默认传 0 表示：剋元非自己组织的 PN
  page: {
    currentPage: number;
    pageSize: number;
  } // 查询所有，默认：0 - 1000 
  period: number; // 获取活动生效时间开始时间
}

export type PnListItem = {
  balance: number // 余额
  isMisOrgPn: IsMisOrgPn // 是否为本人所在组织PN
  pn: string; // pn ID
  pnName: string; // pn 名
}

export const getPnList: RequestHandler<GetPnListParams, PnListItem[]> = (params) => {
  return postReq('/api/zspt/operation/operConfirm/getPnList', params)
}