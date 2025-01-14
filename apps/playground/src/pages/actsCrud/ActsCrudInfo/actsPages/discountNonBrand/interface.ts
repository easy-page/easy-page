import { AuthResInfo, ChargeSideEnum, FactorInfo, PnInfo } from '@/common'

import { ToolbarProps } from '@/common/fields'
import { CommonActCrudFormState } from '../../fields'

/** 表单中数据状态 */
export type DisActFormState = CommonActCrudFormState

/** 表格提交的数据类型，即后端接口的数据类型 */
export type DisActFormSubmitData = {}

type FactorAssociationRule = {
  exclusion?: string[]
  /** 只有当选择了某些因子后，才允许选择，否则禁用 */
  co_occurrence?: string[]
}

export type FactorAssociationRulesMap = Record<string, FactorAssociationRule>

/** 表单外部上下文 */
export type DisActFormProps = ToolbarProps & {
  mccSubActMaxCount?: number // 获取的 mcc 最大子活动数
  brandInviteTemplateUrl: string
  poiInviteTemplateUrl: string
  factors?: FactorInfo
  // pnListData: PnInfo[]
  resourceIdRes: AuthResInfo[]
  factorAssociationRulesMap: FactorAssociationRulesMap
}
