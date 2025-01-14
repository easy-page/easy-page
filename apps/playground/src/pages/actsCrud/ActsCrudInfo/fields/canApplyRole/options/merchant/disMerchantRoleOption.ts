/**
 * - 折扣活动商家选项配置
 */
import { CanApplyRoleEnum } from '@/common'
import { createApplyRoleOption } from '../../base'

export const disMerchantRoleOption = createApplyRoleOption({
  id: CanApplyRoleEnum.Merchant,
  label: '商家',
  disabled: true,
  show() {
    return true
  },
})
