import {
  ContainerIds,
  ContainerIdsText,
  FieldIds,
  FieldIdsText,
} from '@/common/constants/fieldMaps'
import { TreeOption } from '../../../interface'

export const subSidyConfig: TreeOption = {
  value: ContainerIds.SubSubsidy,
  label: ContainerIdsText.subSubsidy,
  children: [
    {
      value: FieldIds.SubsidyChargeFlowType,
      label: FieldIdsText.subsidyChargeFlowType,
    },
    {
      value: ContainerIds.ChargeInfoContainer,
      label: ContainerIdsText.chargeInfoContainer,
      children: [
        {
          value: FieldIds.MtSubsidyField,
          label: FieldIdsText.mtsubsidyField,
        },
        {
          value: FieldIds.ChargeSidePn,
          label: FieldIdsText.chargeSidePn,
        },
        {
          value: FieldIds.MerchantSubsidyField,
          label: FieldIdsText.merchantsubsidyField,
        },
      ],
    },
  ],
}
