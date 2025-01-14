import { ChildFormState, EditableConfig, SelectState } from '@easy-page/antd-ui'
import { ToolbarProps } from '@/common/fields/common/toolbar/interface'
import { ConfirmDialogManagerState } from '@/common/fields'
import { GetSubsidyRule4GroupRes } from '@/common'
import {
  CommonActCrudFormProps,
  CommonActCrudFormState,
  InviteWay,
  UplaodIdState,
} from '../../fields'
import { StockReqFormState } from '../../fields/subsidy/stockReq/interface'
// import { StockReqFormState } from './fields/promotionSettings/subsidy/stockReq/interface'
// import { BudgetRuleTableFormState } from './fields/promotionSettings/subsidy/diffStockReq/interface'

export type SubsidyRuleState = GetSubsidyRule4GroupRes

export type NeedAuditResState = {
  needed: boolean
  option?: string
}

export type ShenQuanFormState = Pick<
  CommonActCrudFormState,
  | 'chooseOperation'
  | 'activity'
  | 'belongBizline'
  | 'actName'
  | 'poiType'
  | 'brief'
  | 'ruleDesc'
  | 'qualify'
  | 'canApplyRole'
> & {
  actTime: ActTime
  subsidyRule: SubsidyRuleState
  subsidyRuleInfo: string[]
  stockRequest: ChildFormState<StockReqFormState>
  subsidyPercent: string
  needAuditRes: NeedAuditResState
  dataType: InviteWay
  inputIdsWay: string
  inputId: string
  uploadId: UplaodIdState
  filterRule: SelectState<string | null>
  confirmDialogManager: ConfirmDialogManagerState
}

export type ShenQuanFormProps = Pick<
  CommonActCrudFormProps,
  | 'bizlineOptions'
  | 'factors'
  | 'mccSubActMaxCount'
  | 'brandInviteTemplateUrl'
  | 'poiInviteTemplateUrl'
> &
  ToolbarProps & {
    editable: EditableConfig<ShenQuanFormState>
  }

export enum ActTime {
  ALL = 'all',
}

export const ActTimeText: Record<ActTime, string> = {
  [ActTime.ALL]: '长期有效',
}
