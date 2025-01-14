import { nodeUtil } from '@easy-page/antd-ui'
import { canCancelAct } from './common'
import { CanApplyRoleEnum } from '@/common'

export const shenquanCancancelAct = nodeUtil.extends<boolean>(canCancelAct, {
  postprocess: () => {
    return ({ value }) => {
      return {
        'applyControl.canCancel': value ? [CanApplyRoleEnum.Merchant] : [],
      }
    }
  },
  preprocess() {
    return () => true
  },
  fieldUIConfig(oldFieldUIConfig) {
    oldFieldUIConfig.formItem.disabled = true
    return oldFieldUIConfig
  },
})
