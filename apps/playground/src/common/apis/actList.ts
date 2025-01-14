import { RequestHandler, RequestResult, postReq } from '@/common/libs'
import {
  ActivityConfirmStatusEnum,
  ActivityStatusEnum,
  ChargeFlowTypeEnum,
  ConfirmChargeEnum,
  FlowNodeCodeEnum,
  FlowNodeGroupEnum,
  FlowNodeTypeEnum,
  InviteActionTypeEnum,
  InviteDataTypeEnum,
  InviteInputTypeEnum,
  TimeTypeEnum,
} from '../constants'
import { ActStatInfo, getActStat } from './getStat'
import { IApplyControl } from './saveAct/interfaces/applyControl'
import { BizLineEnum } from '@/common/constants'
import { FlowNode } from './saveAct'

export type ActListFilter = {
  activityId?: number // 活动ID
  activityName?: string // 活动名称, 支持模糊查询
  filterType: number // [必填]1-全部, 2-我创建的, 3-需要我确认的
  templateId?: number // 模板ID，即：促销类型
  activityStatus: ActivityStatusEnum // [必填] 活动状态, 详见枚举
  activityTime?: number[] // 活动时间
  ctime?: number[] // 创建时间
  kaConfirmTime?: number[]
  planId?: number // 归属方案ID
  planName?: string // 归属方案名称, 支持模糊查询
  planCreator?: string // 方案创建人mis号
  groupId?: number
  creator?: string // 创建人mis号
  activityConfirmStatus?: ActivityConfirmStatusEnum
}

export type GetActListParams = ActListFilter & {
  bizLine?: BizLineEnum // [必填]详见枚举，本次为闪购
  groupId?: number
  currentPage: number // [必填]分页信息, 详见API协议
  pageSize: number // [必填]分页信息, 详见API协议
  bpIdList?: number[]
}

export interface Invitation {
  // 数据类型：1品牌商，2门店品牌，3门店
  dataType: InviteDataTypeEnum
  // 录入动作：1设置，2追加, 本次为1
  actionType: InviteActionTypeEnum

  // 录入数据方式
  inputType?: InviteInputTypeEnum
  // 录入数据
  inputData?: string
}

export interface TemplateInfoResult {
  feProperties: string // FeProperties
  templateId: number
  templateName: string
}

export enum ButtonEnableEnum {
  NotShow = 0, // 不展示
  Show = 1, // 展示
}

export interface ButtonControl {
  buttonName: string
  buttonEnable: ButtonEnableEnum
}

export enum IsRestrictPromotionTimeEnum {
  NoLimit,
  Limit,
}

export type ActInfo = {
  activityConfirmStatus?: ActivityConfirmStatusEnum
  activityConfirmStatusDesc?: string
  activityEndTime: number
  activityStartTime: number
  brandApplyEndTime?: number
  brandOperateAuditEndTime?: number
  chargeFlowType?: ChargeFlowTypeEnum[]
  creator: string
  creatorBusinessPartition?: string
  ctime: number
  flowNode: FlowNode[]
  groupEndTime: number
  groupId?: number
  groupName?: string
  groupStartTime?: number
  // opConfig?: OpConfig;
  id: number
  invitation: Invitation
  applyControl?: IApplyControl
  name: string
  planCreator?: string
  planId?: number
  planName?: string
  status: ActivityStatusEnum
  statusDesc: string
  templateId?: number
  templateName?: string
  templateInfo?: TemplateInfoResult
  actStatsInfo?: ActStatInfo
  bizLine: BizLineEnum
  isRestrictPromotionTime?: IsRestrictPromotionTimeEnum
  contractUrl?: string // 协议id拼接的跳转链接
  buttonControl?: ButtonControl[]
}

export type GetActListResult = {
  items: ActInfo[]
  total: number
}

export const getActList: RequestHandler<
  GetActListParams,
  GetActListResult
> = async (params) => {
  const result: RequestResult<GetActListResult> = await postReq(
    '/api/zspt/operation/act/actList',
    params
  )
  if (!result || !result.success) {
    return result
  }
  const records = result.data?.items || []
  const actIds = records.map((e) => e.id)
  const stats = await getActStat({ activityIds: actIds })
  const statsRecords = stats.data || []
  const newData = records.map((e) => {
    const statItem = statsRecords.find((s) => s.activityId === e.id)
    if (statItem) {
      return { ...e, actStatsInfo: statItem }
    }
    return e
  })
  return {
    ...result,
    data: {
      total: result.data?.total || 0,
      items: newData,
    },
  }
}
