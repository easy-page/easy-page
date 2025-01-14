// 补贴方式
export enum ChargeTypeEnum {
  // 金额
  Amount = 1,
  // 比例
  Percentage = 2,
}

export const ChargeTypeEnumDesc = {
  [ChargeTypeEnum.Amount]: '按金额',
  [ChargeTypeEnum.Percentage]: '按比例',
}

export enum PriceLimitEnum {
  //无限制
  Unlimited = 0,
  // 近15天最低价
  Last15DaysLowestPrice = 1,
  // 近30天最低价
  Last30DaysLowestPrice = 2,
  // 近45天最低价
  Last45DaysLowestPrice = 3,
}

export const PriceLimitEnumDesc = {
  [PriceLimitEnum.Unlimited]: '无限制',
  [PriceLimitEnum.Last15DaysLowestPrice]: '近15天最低价',
  [PriceLimitEnum.Last30DaysLowestPrice]: '近30天最低价',
  [PriceLimitEnum.Last45DaysLowestPrice]: '近45天最低价',
}

export enum FacePeopleEnum {
  // 全部用户
  All = 0,
  // 平台新客
  PlatformNewComers = 7,
  // 闪购新客
  ShangouNewComers = 102,
  // 沉流用户
  ChenliuUsers = 8
}

export const FacePeopleEnumDesc = {
  [FacePeopleEnum.All]: '全部用户',
  [FacePeopleEnum.PlatformNewComers]: '平台新客',
  [FacePeopleEnum.ShangouNewComers]: '闪购新客',
  [FacePeopleEnum.ChenliuUsers]: '沉流用户',
}
// 补贴方式
export enum ChargeSideEnum {
  // 品牌补贴
  Brand = 14,
  // 代理商补贴
  Agent = 3,
  // 商家补贴
  Merchant = 1,
  // 美补-外卖
  MeiTuanWaiMai = 14010,
  // 美补-闪购
  MeiTuanShanGou = 14060,
  // 美补-医药
  MeiTuanMedicine = 14090,
  // 其他补贴方，仅前端使用
  Other = -9999,
}

// 展示在活动、合作运营确认编辑态的desc
export const ChargeSideDesc = {
  [ChargeSideEnum.Brand]: '品牌承担',
  [ChargeSideEnum.MeiTuanWaiMai]: '美团承担(外卖)',
  [ChargeSideEnum.MeiTuanShanGou]: '美团承担(闪购)',
  [ChargeSideEnum.MeiTuanMedicine]: '美团承担(医药)',
  [ChargeSideEnum.Agent]: '代理商承担',
  [ChargeSideEnum.Merchant]: '商家承担',
  [ChargeSideEnum.Other]: '其他承担',
}
// 展示在活动、合作运营确认运行态的desc
export const ChargeSideOperatingDesc = {
  ...ChargeSideDesc,
  [ChargeSideEnum.MeiTuanWaiMai]: '美团承担',
  [ChargeSideEnum.MeiTuanShanGou]: '美团承担',
  [ChargeSideEnum.MeiTuanMedicine]: '美团承担',
}

/** 神会员中，Subsidy 结构里的操作类型 */
export enum SubsidyOptEnum {
  /** 在 ... 中 */
  In = 'in',
  /** 相等 */
  Eq = 'eq',
  /** 小于 */
  Lt = 'lt',
  /** 小于等于 */
  Le = 'le',
  /** 大于 */
  Gt = 'gt',
  /** 大于等于 */
  Ge = 'ge',
  /** 左闭右开区间 */
  LcRoInterval = 'lc_ro_interval',
  /** 闭区间 */
  CloseInterval = 'close_interval',
  /** 不限制 */
  Unlimited = 'unlimited',
  /** 左开右开 */
  OpenInterval = 'open_interval',
}

/** 神会员中，膨胀补贴 rule 字段 key 类型 */
export enum SubsidyConditionKeyEnum {
  /** 补贴条件-订单券前价  */
  ScOrderPriceWithoutCoupon = 'scOrderPriceWithoutCoupon',
  /** 补贴条件-目标人群  */
  ScTargetUserType = 'scTargetUserType',
  /** 补贴条件-全天  */
  ScAllDay = 'scAllDay',
  /** 补贴条件-时段  */
  ScPeriod = 'scPeriod',
  /** 补贴条件-商家补贴 */
  ScChargeSidePoi = 'scChargeSidePoi',
  /** 商家-代理差异化补贴比例 */
  SubsidyRatePoi2Agent = 'subsidyRatePoi2Agent',
  /** 券门槛 */
  ScCouponThreshold = 'scCouponThreshold',
}

/** 神会员中，膨胀补贴 rule charge 字段 key 类型 */
export enum SubsidyChargeKeyEnum {
  /** 商家承担-最高  */
  ChargeSidePoi = 'chargeSidePoi',
  /** 美团承担-最低  */
  ChargeSideMt = 'chargeSideMt',
  /** BD承担 */
  ChargeSideMtb = 'chargeSideMtb',
  /** 代理CM承担  */
  ChargeSideAgent = 'chargeSideAgent',
  /** 补贴承担(商家) 用于闪购神券*/
  chargeSidePoi4Sg = 'chargeSidePoi4Sg',
}
