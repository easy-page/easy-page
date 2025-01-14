import {
  FieldIds,
  FieldIdsText,
  FieldOptionIds,
  FieldOptionIdsText,
} from '@/common/constants/fieldMaps'
import { TreeOption } from '../../interface'

export const chargeFlowTypeConfig: TreeOption = {
  value: FieldIds.ChargeFlowType,
  label: FieldIdsText.chargeFlowType,
  children: [
    {
      value: FieldOptionIds.DirectMtCharge,
      label: FieldOptionIdsText.directMtCharge,
    },
    {
      value: FieldOptionIds.AgentMtCharge,
      label: FieldOptionIdsText.agentMtCharge,
    },
    {
      value: FieldOptionIds.BrandCharge,
      label: FieldOptionIdsText.brandCharge,
    },
    {
      value: FieldOptionIds.NeedOtherCharge,
      label: FieldOptionIdsText.needOtherCharge,
    },
  ],
}
