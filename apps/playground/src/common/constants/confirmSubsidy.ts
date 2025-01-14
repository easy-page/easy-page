export enum ConfirmStatusEnum {
  All = -1, //全部
  UnConfirm = 1, // 待确认
  AuditIng = 2, // 审批中
  Confirm = 3, // 确认参加
  Reject = 4, // 确认不参加
}

export enum ConfirmOptionSelectType {
  Select = 1,
  UnSelect = 0,
}

export const ConfirmRejectReasonOptions = [
  { label: '【品牌未提报核心品】', value: 'coreLose' },
  { label: '【品牌补贴比例偏低】', value: 'lowRatio' },
  { label: '【品牌预算不足】', value: 'underbudgeted' },
  { label: '【其他】', value: 'other' },
]

// 其他描述key值
export const ConfirmOtherReason = 'otherReason'
