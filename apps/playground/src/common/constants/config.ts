/** 降级开关，若远程配置性能存在瓶颈，则修改为 false 发布，进行降级 */
// export const USE_REMOTE_CONFIG = true

/** 第一层级 */
export enum FieldBelongFirstLevel {
  /** 基础信息 */
  BaseInfo = 'baseInfo',
  /** 活动邀请 */
  ActInvitation = 'actInvitation',

  /** 报名控制 */
  ApplyControl = 'applyControl',

  /** 预算管控 */
  BudgetControl = 'budgetControl',
  /** 优惠设置 */
  PromotionSettings = 'promotionSettings',
}

/** 第二层级 */
export enum FieldBelongSecLevel {
  SubAct = 'subAct',
  PromotionBaseInfo = 'promotionBaseInfo',
  PromotionQualify = 'promotionQualify',
  PromotionRule = 'promotionRule',
  SubsidySettings = 'subsidySettings',
}

export enum AdminOpType {
  Modify = 1,
  BatchModify = 2,
  Publish = 3,
}

export const AdminOpTypeText: Record<AdminOpType, string> = {
  [AdminOpType.Modify]: '修改',
  [AdminOpType.BatchModify]: '批量修改',
  [AdminOpType.Publish]: '发布',
}

export const FieldBelongSecText: Record<FieldBelongSecLevel, string> = {
  [FieldBelongSecLevel.SubAct]: '子活动',
  [FieldBelongSecLevel.PromotionBaseInfo]: '基础信息',
  [FieldBelongSecLevel.PromotionQualify]: '报名资质',
  [FieldBelongSecLevel.PromotionRule]: '优惠规则',
  [FieldBelongSecLevel.SubsidySettings]: '补贴分摊设置',
}

export const FieldBelongText: Record<FieldBelongFirstLevel, string> = {
  [FieldBelongFirstLevel.BaseInfo]: '基础信息',
  [FieldBelongFirstLevel.ActInvitation]: '活动邀请',
  [FieldBelongFirstLevel.BudgetControl]: '预算管控',
  [FieldBelongFirstLevel.PromotionSettings]: '优惠设置',
  [FieldBelongFirstLevel.ApplyControl]: '报名控制',
}

export enum ConfigEnv {
  Prod = 2,
  ST = 1,
  TEST = 3,
  // DEV = 4,
}

export enum ConfigType {
  Plan = 2,
  Act = 1,
}

/** 是否是配置模板 */
export enum IsConfigTemplate {
  Yes = 1,
  No = 2,
}

export const IsConfigTemplateText: Record<IsConfigTemplate, string> = {
  [IsConfigTemplate.Yes]: '是',
  [IsConfigTemplate.No]: '否',
}

export const ConfigTypeText: Record<ConfigType, string> = {
  [ConfigType.Plan]: '方案',
  [ConfigType.Act]: '活动',
}

export enum ConfigPublishStatus {
  ToPublish = 4,
  Published = 1,
  Auditing = 2,
  AuditFail = 3,
}

export const ConfigPublishStatusText: Record<ConfigPublishStatus, string> = {
  [ConfigPublishStatus.ToPublish]: '待发布',
  [ConfigPublishStatus.Published]: '已发布',
  [ConfigPublishStatus.Auditing]: '审核中',
  [ConfigPublishStatus.AuditFail]: '审核失败',
}

export const ConfigEnvText: Record<ConfigEnv, string> = {
  [ConfigEnv.Prod]: '线上环境',
  [ConfigEnv.ST]: 'ST 环境',
  [ConfigEnv.TEST]: '测试环境',
  // [ConfigEnv.DEV]: '本地开发环境',
}

export enum ConfigBizline {
  Waimai = 2,
  ShanGou = 1,
  WaiMaSongJiu = 190
}

export const ConfigBizlineText: Record<ConfigBizline, string> = {
  [ConfigBizline.Waimai]: '外卖',
  [ConfigBizline.ShanGou]: '闪购',
  [ConfigBizline.WaiMaSongJiu]: '歪马送酒',
}
