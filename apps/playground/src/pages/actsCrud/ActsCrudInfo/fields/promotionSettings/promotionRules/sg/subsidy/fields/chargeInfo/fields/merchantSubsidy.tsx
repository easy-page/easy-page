import { ChargeSideEnum } from '@/common'
import { subsidyField } from '../common'

export const merchantSubsidyField = subsidyField({
  title: '商家承担',
  id: 'merchant',
  inputSuffix: '%',
  defaultVal: '100',
  disabledMaxAmount: true,
  disabledAmt: true,
  chargeSideCode: ChargeSideEnum.Merchant,
})
