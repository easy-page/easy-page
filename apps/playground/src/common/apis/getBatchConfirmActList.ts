import { RequestHandler, postReq } from '@/common/libs'
import { Empty } from '@easy-page/antd-ui'
import { PageInfo } from '../models/base/list'
import { ConfirmStatusEnum } from '../constants'

// 单个业务品牌信息
export interface GetBatchConfirmActListParams {
  brandIds: number[] // 业务品牌ID，必填
  getAll: boolean // 0-否，1-是，获取全部，仅用于全选所有场景，此时分页信息无效
  currentPage: number // [必填]分页信息, 详见API协议
  pageSize: number // [必填]分页信息, 详见API协议
  activityIds?: string // 活动ID，可选
  activityName?: string // 支持模糊查询，可选
  activityTime?: number[] // 活动时间，可选，格式为时间戳数组 [开始时间, 结束时间]
  confirmTime?: number[] // 合作运营确认时间，可选，格式为时间戳数组 [开始时间, 结束时间]
  confirmStatus?: ConfirmStatusEnum[] // 补贴提报状态，-1全部 1待确认 2审批中 3确认参加 4确认不参加，详见枚举confirmStatus
}

export interface SingleBatchConfirmAct {
  id: number // 活动ID
  name: string // 活动名称
  activityStartTime: number // 活动时间-开始（时间戳）
  activityEndTime: number // 活动时间-结束（时间戳）
  confirmContent: ConfirmContent // 确认内容
  confirmStartTime: number // 合作运营确认时间-开始（时间戳）
  confirmEndTime: number // 合作运营确认时间-结束（时间戳）
  confirmStatus: ConfirmStatusEnum // 补贴提报状态，详见枚举confirmStatus
  confirmStatusDesc: string // 补贴提报状态文本描述
  ctime: number // 活动创建时间（时间戳）
  creator: string // 活动创建人mis号
  relBrandIds: number[] // 该提报活动关联的品牌ID
  groupEndTime: number
  groupId: number
  groupName: string
  groupStartTime: number
  planId: number
  templateId: number
  templateInfo: {
    feProperties: string
    templateId: number
    templateName: string
  }
  auditResultList?: Array<{
    title: string
    text: string
    url: string
  }>
}

export interface ConfirmContent {
  couponRule: string // 券规则
  couponChannel: string // 发券渠道
  productBrandCharge: string // 品牌补贴（注意这里使用了string，因为可能包含货币符号等非数字字符）
}

export const ConfirmStatusOptions = [
  {
    label: '待确认',
    value: ConfirmStatusEnum.UnConfirm,
  },
  {
    label: '审批中',
    value: ConfirmStatusEnum.AuditIng,
  },
  {
    label: '确认参加',
    value: ConfirmStatusEnum.Confirm,
  },
  {
    label: '确认不参加',
    value: ConfirmStatusEnum.Reject,
  },
]

export interface GetBatchConfirmActListRes {
  total: number
  items: SingleBatchConfirmAct[]
}

export const getBatchConfirmActList: RequestHandler<
  GetBatchConfirmActListParams & PageInfo,
  GetBatchConfirmActListRes
> = (params) => {
  return postReq('/api/zspt/operation/operConfirm/batch/actList', {
    ...params,
    currentPage: params.pageNo,
  })
}
