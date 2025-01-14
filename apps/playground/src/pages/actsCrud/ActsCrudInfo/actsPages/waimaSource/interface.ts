import { AuthResInfo, Employ, FactorInfo, PnInfo } from '@/common'

import { ToolbarProps } from '@/common/fields'
import { CommonActCrudFormState, CommonSubActPageState } from '../../fields'
import { ChildFormState } from '@easy-page/antd-ui'
import { WorkFlowTableFormState } from './fields/workflow/workflowTable/interface'

export type CommonDateRangeState = {
  startTime?: any
  endTime?: any
  disableEnd?: boolean
}

/** 表单中数据状态 */
export type WmsActFormState = CommonActCrudFormState & {
  skuAdminPartner: {
    isSelectSkuPartner: boolean
    skuAdmin: Employ[]
  }
  purchaseManagerPartner: {
    purchaseManager: Employ[]
  }
  'invitation.actionType': string
  'invitation.inputData': string
  'invitation.inputType': number
  'invitation.dataType': string
  totalPrice: number
  purchaseManager?: CommonDateRangeState
  skuAdmin?: CommonDateRangeState
  supplier?: CommonDateRangeState
  subSourceInfo: ChildFormState<CommonSubActPageState>
  workflowTable: ChildFormState<WorkFlowTableFormState>
}

/** 表格提交的数据类型，即后端接口的数据类型 */
export type WmsActFormSubmitData = {}

/** 表单外部上下文 */
export type WmsActFormProps = ToolbarProps & {}
