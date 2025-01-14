import { ZSPT_S3 } from '../upload'
import { OPTION_ALL } from './common'

export enum SubmitType {
  Default = 'default',
  Continue = 'continue',
}

export enum ActivityConfirmStatusEnum {
  NotStart = 1, // 未开始
  WaitConfirm = 2, //待确认
  Confirmed = 3, // 已确认
  Finished = 4, // 已结束
}

export const ACTIVITY_CONFIRM_STATUS_DESC = {
  [ActivityConfirmStatusEnum.Confirmed]: '已确认',
  [ActivityConfirmStatusEnum.Finished]: '已结束',
  [ActivityConfirmStatusEnum.NotStart]: '未开始',
  [ActivityConfirmStatusEnum.WaitConfirm]: '待确认',
}

export const ACTIVITY_CONFIRM_STATUS_OPTIONS = [
  OPTION_ALL,
  ...(
    Object.keys(
      ACTIVITY_CONFIRM_STATUS_DESC
    ) as any as ActivityConfirmStatusEnum[]
  ).map((item) => {
    return { label: ACTIVITY_CONFIRM_STATUS_DESC[item], value: Number(item) }
  }),
]

// 列表中的活动状态
export enum ActivityStatusCauseEnum {
  CreatingRiskControl = 11, //风控审批中
  CreatingContentControl = 12, //保时洁校验中
  CreatingInvite = 13, //上传门店校验中
  PauseRiskControl = 71, //风控审批未通过
  PauseContentControl = 72, //保时洁校验未通过
  PauseContentInvite = 73, //上传门店失败
  TerminatedTimeEnd = 81, //活动时间结束
  TerminatedBudget = 82, //超预算下线
  TerminatedApprove = 83, //业务负责人审批未通过
  TerminatedWithdraw = 84, //已撤回
  TerminatedPauseOvertime = 85, //已暂停超过60天
  TerminatedNoBrandOwner = 86, //无品牌商报名成功，活动作废
  UseOtherPnAndAudit = 14, // 使用非本组pn审批中
  UseOtherPnAndReject = 74, // 使用非本组pn审批不通过
}

export const ACTIVITY_STATUS_CAUSE_DESC = {
  [ActivityStatusCauseEnum.CreatingRiskControl]: '风控审批中',
  [ActivityStatusCauseEnum.CreatingContentControl]: '保时洁校验中',
  [ActivityStatusCauseEnum.CreatingInvite]: '上传门店校验中',
  [ActivityStatusCauseEnum.PauseRiskControl]: '风控审批未通过',
  [ActivityStatusCauseEnum.PauseContentControl]: '保时洁校验未通过',
  [ActivityStatusCauseEnum.PauseContentInvite]: '上传门店失败',
  [ActivityStatusCauseEnum.TerminatedTimeEnd]: '活动时间结束',
  [ActivityStatusCauseEnum.TerminatedBudget]: '超预算下线',
  [ActivityStatusCauseEnum.TerminatedApprove]: '业务负责人审批未通过',
  [ActivityStatusCauseEnum.TerminatedWithdraw]: '已撤回',
  [ActivityStatusCauseEnum.TerminatedPauseOvertime]: '已暂停超过60天',
  [ActivityStatusCauseEnum.TerminatedNoBrandOwner]:
    '无品牌商报名成功，活动作废',
  [ActivityStatusCauseEnum.UseOtherPnAndAudit]: '使用非本组pn审批中',
  [ActivityStatusCauseEnum.UseOtherPnAndReject]: '使用非本组pn审批不通过',
}

export enum FlowResourceStateEnum {
  /** 不存在，不可撤回 */
  Nonentity = -1,
  /** 可撤回 */
  Revocable = 0,
  /** 没有流量活动 */
  Irrevocably = 1,
}

export interface Activity {
  id: number // 提报活动ID
  name: string // 提报活动名称
}

export interface ActivityStatusAmount {
  activityStatus: number // 提报活动状态, 详见枚举
  amount: number // 当前状态下提报活动数量
  activities: Activity[] // 当前状态下提报活动信息
}

export enum PoiTypeEnum {
  /** 全部门店 */
  All = 'all',
  /** 直营门店 */
  Direct = 'direct',
  /** 代理门店 */
  Agent = 'agent',
}

export const PoiTypeText: Record<PoiTypeEnum, string> = {
  [PoiTypeEnum.All]: '全部门店',
  [PoiTypeEnum.Direct]: '直营门店',
  [PoiTypeEnum.Agent]: '代理门店',
}

export enum ActListScene {
  Home = 'home', // 主页的活动列表
  CrudPlan = 'crudPlan', // 创建方案页面的活动列表
  JoinPlan = 'joinPlan', // 加入方案页面
}

export enum ActListColumnId {
  ActId = 'id',
  ActName = 'name',
  // TemplateId = 'templateId',
  TemplateName = 'templateName',
  /** 所属业务 */
  ServiceTypeDesc = 'serviceTypeDesc',
  ActTime = 'activityStartTime',
  ActStatsInfo = 'actStatsInfo',
  CreatorAndTime = 'creatorAndTime',
  PlanIdAndNameAndCreator = 'planIdAndNameAndCreator',
  ConfirmStatus = 'activityConfirmStatus',
  Status = 'status',
}

export enum ActivityStatusEnum {
  /** 创建校验中 */
  Creating = 1,
  /** 待邀请 */
  Created = 2,
  /**  邀请中 */
  Inviting = 3,
  /** 报名中 */
  Applying = 4,
  /** 待生效 */
  TobeActive = 5,
  /** 生效中 */
  Active = 6,
  /** 已暂停 */
  Pause = 7,
  /** 已终止 */
  Terminated = 8,
}

// 活动列表-筛选条件中的状态
export enum ActivityStatusOfFilter {
  /** 待审核 */
  ToAudit = 'to_audit', // 待审核
  /** 审核通过 */
  AuditPass = 'audit_pass', // 审核通过
  /** 审核拒绝 */
  Reject = 'audit_reject', // 审核拒绝
  /** 已清退 */
  Exit = 'exit',
  /** 取消 */
  Cancel = 'cancel', // 取消
}

//补贴类型
export enum ChargeFlowTypeEnum {
  DirectMtCharge = 'directMtCharge',
  AgentMtCharge = 'agentMtCharge',
  BrandCharge = 'brandCharge',
  NeedOtherCharge = 'needOtherCharge',
}

export const ChargeFlowTypeText: Record<ChargeFlowTypeEnum, string> = {
  [ChargeFlowTypeEnum.DirectMtCharge]: '直营门店美补',
  [ChargeFlowTypeEnum.AgentMtCharge]: '代理门店美补',
  [ChargeFlowTypeEnum.BrandCharge]: '品牌补贴',
  [ChargeFlowTypeEnum.NeedOtherCharge]: '需要其他补贴方',
}

/** 补贴类型对应的 ID，用于权限校验 */
export enum ChargeResourceEnum {
  SgDirectMtCharge = 26, // 折扣-直营门店美补
  SgAgentMtCharge = 63, // 折扣-代理门店美补
  SgBlockbusterDirectMtCharge = 27, //爆品-直营门店美补
  SgBlockbusterAgentMtCharge = 64, //爆品-代理门店美补
}

export const ACTIVITY_STATUS_DESC = {
  [ActivityStatusEnum.Creating]: '创建中',
  [ActivityStatusEnum.Pause]: '已暂停',
  [ActivityStatusEnum.Created]: '待邀请',
  [ActivityStatusEnum.Inviting]: '邀请中',
  [ActivityStatusEnum.Applying]: '报名中',
  [ActivityStatusEnum.TobeActive]: '待生效',
  [ActivityStatusEnum.Active]: '生效中',
  [ActivityStatusEnum.Terminated]: '已终止',
}

// 是否需要合作运营确认
export enum ConfirmChargeEnum {
  No = 0,
  Yes = 1,
}

export enum ShowProgressBtn {
  /** 展示进度按钮 */
  SHOW = 1,
  /** 不展示 */
  HIDE = 0,
}

export const ACTIVITY_STATUS_OPTIONS = [
  OPTION_ALL,
  ...(Object.keys(ACTIVITY_STATUS_DESC) as any as ActivityStatusEnum[]).map(
    (item) => {
      return {
        label: ACTIVITY_STATUS_DESC[item],
        value: Number(item),
      }
    }
  ),
]

export enum UploadSceneEnum {
  // 品牌商邀请
  BrandInvitation = 1,
  // 门店邀请
  PoiInvitation = 2,
  // 上传方案简介
  PlanIntroduction = 3,
  // 活动规则上传图片
  RuleDesc = 4,
  // 神价方案规则文件上传
  GodPriceRule = 5,
}

/**
 * 活动来源
 */
export enum ActivitySourceEnum {
  Plan = 'plan',
  Activity = 'activity',
  /** 神价方案 */
  GodPricePlan = 'godpriceplan',
  /** 方案报名结果页进入的编辑页面 */
  PlanResult = 'planresult',
}

// 是否限制活动生效时间
export enum IsRestrictEnum {
  UnRestrict = 0,
  Restrict = 1,
}

export enum IsInMisOrgPn {
  No,
  Yes,
}

// 预算管控
export enum BudgetDegreeEnum {
  STRONG = 'STRONG',
  WEAK = 'WEAK',
}

export const BudgetDegreeDesc = {
  [BudgetDegreeEnum.STRONG]: '强管控',
  [BudgetDegreeEnum.WEAK]: '弱管控',
}

// 数据类型
export enum DataTypeEnum {
  // 通过门店邀请
  Poi = 1,
  // 通过商家品牌邀请
  MerchantBrand = 2,
  // 根据条件筛选商家-数据类型还是门店(此处仅作为前端筛选)
  ConditionalFilter = 3,
}

// 录入动作
export enum ActionTypeEnum {
  // 不操作
  NoChange = 0,
  //整体替换
  Replace = 1,
  // 追加
  Add = 2,
  // 删除
  Remove = 3,
  // 限制（限制默认 === 替换的值）
  Limited = -999,
  // 不限制
  Unlimited = -1,
}

// 录入数据类型
export enum InputTypeEnum {
  // 手动录入
  ManualEntry = 1,
  // 文件
  File = 2,
  // 城市渠道
  CityChannel = 3,
  // 筛选集
  FilterAssemble = 4,
}

// 内容风控(保时洁)结果
export enum IContentRiskControlResult {
  // 无风险不拦截
  NoIntercept = 0,
  // 非拦截校验，有异步送审
  AsyncAudit = 1,
  // 实时拦截
  RealTimeAudit = 2,
}
// 成本风控结果
export enum ICostRiskControlResult {
  // 无成本风控
  NoCostControl = 0,
  // 成本风控高危
  CostControlHighRisk = 1,
  // 成本风控疑似高危
  CostControlSuspected = 2,
  // 调用风控失败
  CallRiskControlFail = 3,
}

export enum CanApplyRoleEnum {
  /** 商家 */
  Merchant = 'poi', 
  /** 门店负责人 */
  PoiOwner = 'bd',
  /** 品牌负责人 */
  BrandOwner = 'ka',
  /** 合作商CM（城市经理） */
  CityManager = 'agent',
  /** 连锁商家总账号 */
  ChainPoiAccount = 'brandAcct'
}

export const CanApplyRoleEnumText: Record<CanApplyRoleEnum, string> = {
  [CanApplyRoleEnum.Merchant]: '商家',
  [CanApplyRoleEnum.PoiOwner]: '门店负责人',
  [CanApplyRoleEnum.BrandOwner]: '品牌负责人',
  [CanApplyRoleEnum.CityManager]: '合作商CM（城市经理）',
  [CanApplyRoleEnum.ChainPoiAccount]: '连锁商家总账号',
}
export enum CanCancelEnum {
  afterTimePoiCanCancel = 'afterTimePoiCanCancel', // 报名截止时间后，商家可取消
  beforeTimePoiCanCancel = 'beforeTimePoiCanCancel', //报名截止时间前，商家可取消
  afterTimeCMCanCancel = 'afterTimeCMCanCancel', // 报名截止时间后，合作商可取消
}

/** 神价活动创建表格下载 */
export const GOD_PRICE_ACT_DOWNLOAD_FILE = `${ZSPT_S3}/god-price/%E7%A5%9E%E4%BB%B7%E9%A1%B9%E7%9B%AE%E7%BB%84%E6%A8%A1%E6%9D%BF.xlsx`

export const COLLECT_STORE_ACT_DOWNLOAD_FILE = `${ZSPT_S3}/collect-store/%E3%80%90%E9%9B%86%E5%90%88%E5%BA%97%E6%8B%9B%E5%95%86%E3%80%91%E9%80%89%E5%93%81%E4%B8%8E%E4%BC%98%E6%83%A0%E8%A7%84%E5%88%99%E6%A8%A1%E6%9D%BF.xlsx`
