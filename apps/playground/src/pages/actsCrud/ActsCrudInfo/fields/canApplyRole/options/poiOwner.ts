import { CanApplyRoleEnum } from '@/common'
import { InviteWay } from '../../interface'

import { createApplyRoleOption } from '../base'

export const poiOwnerRoleOption = createApplyRoleOption({
  id: CanApplyRoleEnum.PoiOwner,
  label: '门店负责人（BD）',
  disabled: true,
  show({ effectedData }) {
    return effectedData['dataType'] === InviteWay.ByPoiInvite
  },
})
