import { nodeUtil } from '@easy-page/antd-ui'
import { CanApplyRoleEnum, isCreate } from '@/common'
import { canEditAct } from './common'

export const unionCouponCanModify = nodeUtil.extends<boolean>(canEditAct, {
  postprocess: () => {
    return ({ value }) => {
      return {
        'applyControl.canModify': value ? [CanApplyRoleEnum.Merchant] : [],
      }
    }
  },
  preprocess: () => {
    return ({ defaultValues }) => {
      if (isCreate()) {
        return true
      }
      const canModify = defaultValues?.applyControl?.canModify
      return (canModify || [])?.length > 0 ? true : false
    }
  },
})
