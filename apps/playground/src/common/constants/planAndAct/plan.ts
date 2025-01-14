import { OPTION_ALL } from './common'

/** 方案状态枚举 */
export enum PlanStatusEnum {
  TobePublish = 1, // 未发布
  Published = 2, // 已发布
  Terminated = 3, // 已终止
}

export const PLAN_STATUS_DESC: Record<PlanStatusEnum, string> = {
  [PlanStatusEnum.Published]: '已发布', // 待邀请
  [PlanStatusEnum.Terminated]: '已终止', // 待邀请
  [PlanStatusEnum.TobePublish]: '未发布',
}

/** 方案类型枚举 */
export enum PlanTypeEnum {
  Brand = 0, // 品牌
  GodPrice = 1, // 神价
  ShenHuiYuan = 2, // 闪购神券方案
  /** 美团联盟红包方案 */
  UnionCoupon = 3, 
}

export const SG_PLAN_STATUS_DESC: Record<PlanTypeEnum, string> = {
  [PlanTypeEnum.Brand]: '品牌方案',
  [PlanTypeEnum.GodPrice]: '神价方案',
  [PlanTypeEnum.ShenHuiYuan]: '神券方案',
  [PlanTypeEnum.UnionCoupon]: '美团联盟红包方案',
}

export const WM_PLAN_STATUS_DESC: Record<PlanTypeEnum, string> = {
  [PlanTypeEnum.ShenHuiYuan]: '神会员方案',
  [PlanTypeEnum.Brand]: '品牌方案',
  [PlanTypeEnum.GodPrice]: '神价方案',
  [PlanTypeEnum.UnionCoupon]: '美团联盟红包方案',
}

export const PLAN_STATUS_OPTIONS = [
  OPTION_ALL,
  ...Object.keys(PLAN_STATUS_DESC).map((item) => {
    return {
      label: PLAN_STATUS_DESC[item as any as PlanStatusEnum],
      value: Number(item),
    }
  }),
]

// 闪购方案列表 筛选项 方案类型 下拉菜单选项
export const PLAN_TYPE_OPTIONS = [
  OPTION_ALL,
  ...Object.keys(SG_PLAN_STATUS_DESC).map((item) => {
    return {
      label: SG_PLAN_STATUS_DESC[item as any as PlanTypeEnum],
      value: Number(item),
    }
  }),
]

export const WM_PLAN_TYPE_OPTIONS = [
  OPTION_ALL,
  ...Object.keys(WM_PLAN_STATUS_DESC).map((item) => {
    return {
      label: WM_PLAN_STATUS_DESC[item as any as PlanTypeEnum],
      value: Number(item),
    }
  }),
]

export enum PlanJoinStatusEnum {
  WaitJoin = 0, // 待加入
  HasJoin = 1, // 已加入
  Finished = 2, // 已结束
  NoInvite = 3, // 未邀请
}

export const PLAN_JOIN_STATUS_DESC = {
  [PlanJoinStatusEnum.WaitJoin]: '待加入',
  [PlanJoinStatusEnum.HasJoin]: '已加入',
  [PlanJoinStatusEnum.Finished]: '已结束',
  [PlanJoinStatusEnum.NoInvite]: '未邀请',
}

export const PLAN_JOIN_STATUS_OPTIONS = [
  OPTION_ALL,
  ...Object.keys(PLAN_JOIN_STATUS_DESC)
    .map((item) => {
      return { label: PLAN_JOIN_STATUS_DESC[item], value: Number(item) }
    })
    .filter((e) => e.value !== PlanJoinStatusEnum.NoInvite),
]

export enum PlanListColumnId {
  Id = 'id',
  Name = 'name',
  Type = 'planType', // 方案类型
  SendTime = 'sendTime',
  Ctime = 'ctime',
  Creator = 'creator',
  Status = 'status',
  JoinStatus = 'joinStatus',
}

export enum PlanListScene {
  Home = 'home', // 主页的活动列表
}
