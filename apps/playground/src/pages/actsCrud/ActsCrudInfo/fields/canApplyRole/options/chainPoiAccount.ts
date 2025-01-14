import { CanApplyRoleEnum } from '@/common'
import { createApplyRoleOption } from '../base'
import { InviteWay } from '../../interface'

export const chainPoiAccountRoleOption = createApplyRoleOption({
  id: CanApplyRoleEnum.ChainPoiAccount,
  label: '连锁商家总账号',
  show({ effectedData }) {
    return effectedData['dataType'] === InviteWay.ByMerchantBrand
  },
  // disabled: true,
})
