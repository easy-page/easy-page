import { nodeUtil } from '@easy-page/antd-ui'
import { CanApplyRoleEnum, isCreate } from '@/common'
import { canCancelAct } from './common'

export const unionCouponCanCancelAct = nodeUtil.extends<boolean>(canCancelAct, {
  postprocess: () => {
    return ({ value }) => {
      return {
        'applyControl.canCancel': value ? [CanApplyRoleEnum.Merchant] : [],
      }
    }
  },
  preprocess: () => {
    return ({ defaultValues }) => {
      if (isCreate()) {
        return true
      }
      const canCancel = defaultValues?.applyControl?.canCancel
      return (canCancel || [])?.length > 0 ? true : false
    }
  },
})
