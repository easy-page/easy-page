import { CanApplyRoleEnum } from "@/common/constants"

// 报名控制
export interface IApplyControl {
  // 可报名, 本次不传
  // canApply?: string[]
  canApply?: CanApplyRoleEnum[]
  // 可取消报名, 本次不传
  canCancel?: string[]
  // 可编辑报名信息
  canModify?: string[]
  // 报名结果审核
  audit: {
    // 是否需要审核, false-否, true-是, 本次默认为false
    isNeedAudit: boolean
    auditWorkflowId?: number
  }
  /** 可报名子活动数 */
  subactivityRule?: {
    enterMax: number // enterMax 为 -1 表示不限制
    enterMin: number // 限制的最小值
  }
}