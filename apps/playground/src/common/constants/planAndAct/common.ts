export const ALL = -1

export enum OperationType {
  CREATE = 'create', // 新建
  COPY = 'copy', // 复制
  VIEW = 'view', // 预览
  EDIT = 'edit', // 编辑
}

export const OPTION_ALL = {
  label: '全部',
  value: ALL,
}

/** 活动方案列表的 tab 路由参数 ID */
export enum PlanAndActParamsEnum {
  ListTab = 'tab',
  PlanFilterType = 'planFilterType',
  ActFilterType = 'actFilterType',
  Bizline = 'bizLine',
  FilterType = 'filterType',
  /** 需要我确认的tab -> 子tab */
  ConfirmSubTab = 'confirmSubTab',
  /** 活动id 回显至输入框 */
  ActivityId = 'activityId',
}

export enum NeedSkuEnum {
  NoNeed = 0,
  Need = 1,
}
