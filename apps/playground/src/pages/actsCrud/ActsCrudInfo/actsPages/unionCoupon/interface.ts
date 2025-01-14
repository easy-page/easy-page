import { EditableConfig, SelectState } from '@easy-page/antd-ui'
import { ToolbarProps } from '@/common/fields/common/toolbar/interface'
import { ConfirmDialogManagerState } from '@/common/fields'
import { GetSubsidyRule4GroupRes } from '@/common'
import {
  CommonActCrudFormProps,
  CommonActCrudFormState,
  InviteWay,
  UplaodIdState,
} from '../../fields'

export type SubsidyRuleState = GetSubsidyRule4GroupRes

export type NeedAuditResState = {
  needed: boolean
  option?: string
}

export type UnionCouponFormState = Pick<
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
  endTime: number
  subsidyRule: SubsidyRuleState
  subsidyRuleInfo: string[]
  subsidyPercent: string
  needAuditRes: NeedAuditResState
  dataType: InviteWay
  inputIdsWay: string
  inputId: string
  uploadId: UplaodIdState
  filterRule: SelectState<number | null>
  confirmDialogManager: ConfirmDialogManagerState
  canCancelAct: string[]
  canEditAct: string[]
  canApply: string[]
  stock4Expand: {
    min: string
    max: string
  }
}

export type UnionCouponFormProps = Pick<
  CommonActCrudFormProps,
  | 'bizlineOptions'
  | 'factors'
  | 'mccSubActMaxCount'
  | 'brandInviteTemplateUrl'
  | 'poiInviteTemplateUrl'
> &
  ToolbarProps & {
    editable: EditableConfig<UnionCouponFormState>
  }

export enum ActTime {
  ALL = 'all',
}

export const ActTimeText: Record<ActTime, string> = {
  [ActTime.ALL]: '长期有效',
}
