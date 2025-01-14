import { nodeUtil } from '@easy-page/antd-ui'
import { canEditAct } from './common'
import { CanApplyRoleEnum } from '@/common'

export const disCanEditAct = nodeUtil.extends(canEditAct, {
  postprocess() {
    return ({ value }) => {
      return {
        'applyControl.canModify': value ? [CanApplyRoleEnum.Merchant] : [],
      }
    }
  },
})
