import { AuthResInfo, FactorInfo, PnInfo } from '@/common'

import { SelectState } from '@easy-page/antd-ui'
import { ToolbarProps } from '@/common/fields'
import { CommonActCrudFormState } from '../../fields'

/** 表单中数据状态 */
export type CsActFormState = CommonActCrudFormState & {
  jhdType: SelectState<string | null>
}

/** 表格提交的数据类型，即后端接口的数据类型 */
export type CsActFormSubmitData = {}

/** 表单外部上下文 */
export type CsActFormProps = ToolbarProps & {
  mccSubActMaxCount?: number // 获取的 mcc 最大子活动数
  brandInviteTemplateUrl: string
  poiInviteTemplateUrl: string
  factors?: FactorInfo
  pnListData: PnInfo[]
  resourceIdRes: AuthResInfo[]
}
