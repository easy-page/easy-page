// 流程节点码，在所有分组中一定是唯一的，值的第一位就是分组
export enum FlowNodeCodeEnum {
  BrandApply = 101, // 品牌商报名
  BrandOperateAudit = 102, // 品牌运营审核
  KaMerchantOperateConfirm = 201, // KA合作运营确认
  SuperiorAudit = 202, // 直属上级审核
  OwnerAudit = 203, // 业务负责人审核
  AgentConfirm = 301 // 代理商确认
}

// 流程节点码名称
export const FlowNodeCodeDesc = {
  [FlowNodeCodeEnum.BrandApply]: '品牌商报名周期',
  [FlowNodeCodeEnum.BrandOperateAudit]: '品牌运营审核',
  [FlowNodeCodeEnum.KaMerchantOperateConfirm]: 'KA合作运营确认周期',
  [FlowNodeCodeEnum.SuperiorAudit]: '直属上级审核周期',
  [FlowNodeCodeEnum.OwnerAudit]: '业务负责人审核周期',
  [FlowNodeCodeEnum.AgentConfirm]: '代理商确认周期'
}

// 流程节点类型
export enum FlowNodeTypeEnum {
  Apply = 1, // 报名
  SubsidyConfirm = 2, // 补贴确认
  Audit = 3 // 审核
}

// 流程节点组
export enum FlowNodeGroupEnum {
  BrandApply = 1, // 品牌商报名
  MerchantOperateConfirm = 2, // 合作运营确认
  AgentAudit = 3 // 代理商确认
}

// 流程节点组名称
export const FlowNodeGroupDesc = {
  [FlowNodeGroupEnum.BrandApply]: '品牌商报名',
  [FlowNodeGroupEnum.MerchantOperateConfirm]: '合作运营确认补贴',
  [FlowNodeGroupEnum.AgentAudit]: '代理商确认补贴'
}

// 时间类型
export enum TimeTypeEnum {
  TimePoint = 1, // 时间点枚举
  Timestamp = 2 // 具体时间戳
}

// 确认方式(提报流程设置)
export enum ConfirmTypeEnum {
  Direct = 'direct', // 直接设置
  FreeCharge = 'freeCharge' // 自主提报
}

// 确认方式名称
export const ConfirmTypeDesc = {
  [ConfirmTypeEnum.Direct]: '直接设置',
  [ConfirmTypeEnum.FreeCharge]: '自主提报',
}

// 配合方(提报流程设置)
export enum ConfirmPartnerEnum {
  SuperMarketKa = 'superMarketKA',
}

// 配合方名称
export const ConfirmPartnerDesc = {
  [ConfirmPartnerEnum.SuperMarketKa]: '超市便利KA业务组',
}