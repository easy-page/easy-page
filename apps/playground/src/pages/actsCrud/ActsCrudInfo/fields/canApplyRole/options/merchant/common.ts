import { CanApplyRoleEnum } from '@/common'
import { InviteWay } from '../../../interface'
import { createApplyRoleOption } from '../../base'

export const merchantRoleOption = createApplyRoleOption({
  id: CanApplyRoleEnum.Merchant,
  label: '商家',
  disabled: true,
  show({ effectedData }) {
    return effectedData['dataType'] === InviteWay.ByPoiInvite
  },
})
