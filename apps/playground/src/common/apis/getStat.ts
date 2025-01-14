import { RequestHandler, postReq } from "@/common/libs";
import { ConfirmChargeEnum, PoiTypeEnum, ShowProgressBtn } from "../constants";

export type GetStatParams = {
  activityIds: number[]
}

export type ActListBudgetInfo = {
  budgetAmount: number;
  chargeOrg: string;
  usedAmount: number;
  usedPercent: number;
}

export type ActListOpConfig = {
  confirmCharge: ConfirmChargeEnum;
  flowNode: ShowProgressBtn;
}

export interface StatusInfo {
  activityStatusCause: number // 流转到当前状态的原因, 详见枚举
  activityStatusCauseDesc: string // 流转到当前状态的原因
  activityStatusCauseTip: string
}

export type ActStatInfo = {
  activityId: number;
  budgetInfo: ActListBudgetInfo[]
  opConfig: ActListOpConfig
  poiType: PoiTypeEnum
  statusInfo: StatusInfo[]
}

/** 获取表格列更多数据 */
export const getActStat: RequestHandler<GetStatParams, ActStatInfo[]> = (params) =>
  postReq('/api/zspt/operation/act/getStat', params)