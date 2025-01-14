import { CanApplyRoleEnum } from '@/common'
import { createApplyRoleOption } from '../base'
import { InviteWay } from '../../interface'

export const brandOwnerRoleOption = createApplyRoleOption({
  id: CanApplyRoleEnum.BrandOwner,
  label: '品牌负责人（KABD）',
  show({ effectedData }) {
    return effectedData['dataType'] === InviteWay.ByMerchantBrand
  },
  disabled: false,
})
