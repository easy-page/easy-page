import { RequestHandler, postReq } from '@/common/libs'
import { Empty } from '@easy-page/antd-ui'
import { ActivityConfirmStatusEnum } from '../constants'
import { PageInfo } from '../models/base/list'
export interface GetKaConfirmActListStaticParams {
  brandId: number // 业务品牌ID，必填
}

// 单个业务品牌信息
export interface GetKaConfirmActListParams {
  brandName?: number // 业务名称，必填
  currentPage: number // [必填]分页信息, 详见API协议
  pageSize: number // [必填]分页信息, 详见API协议
  activityIds?: string // 活动ID，可选
  activityName?: string // 支持模糊查询，可选
  activityTime?: number[] // 活动时间，可选，格式为时间戳数组 [开始时间, 结束时间]
  confirmTime?: number[] // 合作运营确认时间，可选，格式为时间戳数组 [开始时间, 结束时间]
  confirmStatus?: ConfirmStatusEnum[] // 补贴提报状态，-1全部 1待确认 2审批中 3确认参加 4确认不参加，详见枚举confirmStatus
  activityConfirmStatus?: number // 活动确认状态
}

export interface SingleKaConfirmActInfo {
  id: number // 活动ID
  name: string // 活动名称
  activityStartTime: number // 活动时间-开始（时间戳）
  activityEndTime: number // 活动时间-结束（时间戳）
  confirmContent: KaConfirmContent // 确认内容
  confirmStartTime: number // 合作运营确认时间-开始（时间戳）
  confirmEndTime: number // 合作运营确认时间-结束（时间戳）
  confirmStatus: number // 补贴提报状态
  confirmStatusDesc: string // 补贴提报状态文本描述
  ctime: number // 活动创建时间（时间戳）
  creator: string // 活动创建人mis号
  relBrandIds: number[] // 该提报活动关联的品牌ID
  activityConfirmStatus: number // 活动确认状态
  activityConfirmStatusDesc: string // 活动确认状态文本描述
  auditResultList?: Array<{
    title: string
    text: string
    url: string
  }>
}

export interface KaConfirmContent {
  couponRule: string // 券规则
  couponChannel: string // 发券渠道
  productBrandCharge: string // 品牌补贴（注意这里使用了string，因为可能包含货币符号等非数字字符）
  subsidyRule: string // 补贴分摊规则
}

export enum ConfirmStatusEnum {
  All = -1, //全部
  NotConfirm = 1, //  待确认
  Audit = 2, // 审批中
  Confirm = 3, // 确认参加
  Reject = 4, // 确认不参加
}

export const ConfirmStatusOptions = [
  {
    label: '待确认',
    value: ConfirmStatusEnum.NotConfirm,
  },
  {
    label: '审批中',
    value: ConfirmStatusEnum.Audit,
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

export interface GetKaConfirmActListRes {
  total: number
  items: SingleKaConfirmActInfo[]
}

export const getKaConfirmActList: RequestHandler<
  GetKaConfirmActListParams & GetKaConfirmActListStaticParams & PageInfo,
  GetKaConfirmActListRes
> = (params) => {
  return postReq('/api/zspt/operation/confirmResult/actList', {
    ...params,
    currentPage: params.pageNo,
  })
}
