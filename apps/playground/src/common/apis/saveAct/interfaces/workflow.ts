import {
  ConfirmPartnerEnum,
  ConfirmTypeEnum,
  FlowNodeCodeEnum,
  FlowNodeGroupEnum,
  FlowNodeTypeEnum,
  TimeTypeEnum,
} from '@/common/constants'

export interface FlowNode {
  // 流程节点码 101=品牌商报名，102=品牌运营审核，201=KA合作运营确认，202=直属上级审核，203=业务负责人审核，301=代理商确认
  flowNodeCode: FlowNodeCodeEnum
  // 流程节点类型 1=报名apply，2=补贴确认subsidy_verify，3=审核audit
  flowNodeType: FlowNodeTypeEnum
  // 流程节点组 1=品牌商报名，2=合作运营确认，3=代理商确认
  flowNodeGroup: FlowNodeGroupEnum
  // 开始时间类型 1=时间点枚举 2=具体时间戳
  startTimeType: TimeTypeEnum
  // 开始时间
  startTime?: number
  // 结束时间类型 1=时间点枚举 2=具体时间戳
  endTimeType: TimeTypeEnum
  // 结束时间
  endTime?: number
  // 各配置项值json，是否默认参加{"isTimeOutDefaultEnter":true}
  configVal?: string
  // 序号
  order?: number
  // 节点名称
  flowNodeName?: string
  // 并行的key
  sameFlowNodeKey?: number
  // 是否配置了上级确认时间
  isSettingSuperiorAudit?: boolean
  isParallel?: boolean // 是否配置了并行节点
  paraNode?: number // 并行节点key值
}

export interface IWorkflow {
  confirmType: ConfirmTypeEnum
  confirmPartner: ConfirmPartnerEnum.SuperMarketKa
  flowNode: FlowNode[]
}
