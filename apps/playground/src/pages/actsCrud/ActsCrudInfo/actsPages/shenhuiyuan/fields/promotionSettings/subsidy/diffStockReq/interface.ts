import { RangeState } from '@/common/fields/common/numberRangeField'

import type { ShenhuiyuanFormState } from '../../../../interface'
import { EditableConfig } from '@easy-page/antd-ui'

export type BudgetRuleTableFormState = {
  budget4PoiDaily: RangeState
  budget4MtbDaily: RangeState
  budget4AgentDaily: RangeState
}
export type BudgetRuleTableFormProps = Partial<ShenhuiyuanFormState> & {
  editable: EditableConfig<BudgetRuleTableFormState>
}
