// pageInfo模块和锚点之间的映射
export enum FieldBelongToTitleEnum {
  /** 基础信息 */
  basicInfoContainer = 'PrimaryTitleEnum.BasicInfo',
  /** 活动邀请 */
  actInviteContainer = 'PrimaryTitleEnum.ActInvite',
  /** 预算管控 */
  budgetControlContainer = 'PrimaryTitleEnum.BudgetControl',
  /** 优惠设置 */
  promotionSettingsContainer = 'PrimaryTitleEnum.PromotionSettings',
  /** 优惠设置 */
  applyControlContainer = 'PrimaryTitleEnum.ApplyControl',
}

export const canPreviewComponentConfig = {
  promotionType: 'promotionType',
  actName: 'actName',
  actTimeRange: 'actTime',
  poiType: 'inviteType',
  endTime: 'poiApplyTime',
  BudgetAmount: 'actBudgetControl',
}

export const canPreviewComponentList = [
  'promotionType',
  'actName',
  'actTimeRange',
  'inviteType',
  'poiApplyTime',
  'actBudgetControl',
]

enum BizLineEnum {
  WaiMai = 2,
  ShanGou = 1,
}

export const BIZ_TYPE_MAP_TO_NAME = {
  [BizLineEnum.WaiMai]: 'wm',
  [BizLineEnum.ShanGou]: 'sg',
}

export const BIZ_TYPE_MAP_TO_STR = {
  [BizLineEnum.WaiMai]: 'BizLineEnum.WaiMai',
  [BizLineEnum.ShanGou]: 'BizLineEnum.ShanGou',
}
