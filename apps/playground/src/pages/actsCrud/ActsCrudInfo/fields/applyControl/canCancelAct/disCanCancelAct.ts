import { nodeUtil } from '@easy-page/antd-ui'
import { CanApplyRoleEnum } from '@/common'
import { canCancelAct } from './common'

export const disCanCancelAct = nodeUtil.extends(canCancelAct, {
  postprocess() {
    return ({ value }) => {
      return {
        'applyControl.canCancel': value ? [CanApplyRoleEnum.Merchant] : [],
      }
    }
  },
})
