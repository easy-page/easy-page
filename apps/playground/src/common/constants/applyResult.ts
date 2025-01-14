export enum ChargeSideEnum {
  POI = 'POI',
  AGENT = 'AGENT',
  MT = 'MT',
  BRAND = 'BRAND',
}

export const ChargeSideTextEnum = {
  [ChargeSideEnum.POI]: '商补',
  [ChargeSideEnum.AGENT]: '代补',
  [ChargeSideEnum.MT]: '美补',
  [ChargeSideEnum.BRAND]: '品牌补',
}

export enum StatusEnum {
  PENDING = 'to_audit',
  APPROVE = 'audit_pass',
  REJECT = 'audit_reject',
  EXIT = 'exit',
  CANCEL = 'cancel',
}

export const StatusText = {
  [StatusEnum.APPROVE]: '审核通过',
  [StatusEnum.PENDING]: '待审核',
  [StatusEnum.REJECT]: '审核驳回',
  [StatusEnum.EXIT]: '已清退',
  [StatusEnum.CANCEL]: '活动取消',
}

export enum BuyLimitType {
  ORDER = 'ORDER',
}

export const getText = (str?: any) => {
  if (str === undefined) {
    return '-'
  }
  return str
}

export enum WeekEnum {
  MON = 1,
  TUE = 2,
  WED = 3,
  THU = 4,
  FRI = 5,
  SAT = 6,
  SUN = 7,
}

export const WeekEnumText = {
  [WeekEnum.MON]: '每周一',
  [WeekEnum.TUE]: '每周二',
  [WeekEnum.WED]: '每周三',
  [WeekEnum.THU]: '每周四',
  [WeekEnum.FRI]: '每周五',
  [WeekEnum.SAT]: '每周六',
  [WeekEnum.SUN]: '每周日',
}
