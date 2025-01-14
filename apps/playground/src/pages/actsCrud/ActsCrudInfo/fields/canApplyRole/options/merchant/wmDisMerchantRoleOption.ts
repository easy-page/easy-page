import { CanApplyRoleEnum } from '@/common'
import { InviteWay } from '../../../interface'
import { createApplyRoleOption } from '../../base'
import { findLastKey } from 'lodash'

export const wmDisMerchantRoleOption = createApplyRoleOption({
  id: CanApplyRoleEnum.Merchant,
  label: '商家',
  disabled: false,
  show({ effectedData }) {
    return effectedData['dataType'] === InviteWay.ByPoiInvite
  },
})
