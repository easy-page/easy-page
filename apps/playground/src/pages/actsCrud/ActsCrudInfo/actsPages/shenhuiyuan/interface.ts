import { GetSubsidyRule4GroupRes } from '@/common'
import {
  CommonActCrudFormProps,
  CommonActCrudFormState,
  InviteWay,
  NeedAuditResState,
  UplaodIdState,
} from '../../fields'
import { RuleTableFormState } from './fields/promotionSettings/subsidy/subsidyRuleTable/interface'
import { ChildFormState, EditableConfig, SelectState } from '@easy-page/antd-ui'
import { ToolbarProps } from '@/common/fields/common/toolbar/interface'

import { ConfirmDialogManagerState } from '@/common/fields'
import { StockReqFormState } from './fields/promotionSettings/subsidy/stockReq/interface'
import { BudgetRuleTableFormState } from './fields/promotionSettings/subsidy/diffStockReq/interface'

export type SubsidyRuleState = GetSubsidyRule4GroupRes

export type ShenhuiyuanFormState = Pick<
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
  ruleTable: ChildFormState<RuleTableFormState>
  stockRequest: ChildFormState<StockReqFormState>
  differStockRule: ChildFormState<BudgetRuleTableFormState>
  subsidyPercent: string
  needAuditRes: NeedAuditResState
  dataType: InviteWay
  inputIdsWay: string
  inputId: string
  uploadId: UplaodIdState
  filterRule: SelectState<string | null>
  confirmDialogManager: ConfirmDialogManagerState
  activitySceneTag?:string[]
}

export type ShenhuiyuanFormProps = Pick<
  CommonActCrudFormProps,
  | 'bizlineOptions'
  | 'factors'
  | 'mccSubActMaxCount'
  | 'brandInviteTemplateUrl'
  | 'poiInviteTemplateUrl'
  | 'activitySceneTagConfig'
> &
  ToolbarProps & {
    editable: EditableConfig<ShenhuiyuanFormState>
  }

export enum ActTime {
  ALL = 'all',
}

export const ActTimeText: Record<ActTime, string> = {
  [ActTime.ALL]: '长期有效',
}
