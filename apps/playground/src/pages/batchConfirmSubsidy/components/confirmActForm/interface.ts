import { SingleBatchConfirmAct } from '@/common/apis/getBatchConfirmActList'
import { ConfirmDialogManagerState } from '@/common/fields'

export type BatchConfirmFormState = {
  chooseAct: Array<SingleBatchConfirmAct>
  agent_14060: number
  agent_1: number
  agent_3: number
  direct_14060: number
  direct_1: number
  agent_pn: string
  direct_pn: string
  confirmDialogManager: ConfirmDialogManagerState
}
