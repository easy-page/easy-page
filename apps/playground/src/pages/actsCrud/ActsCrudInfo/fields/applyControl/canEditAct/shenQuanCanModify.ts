import { nodeUtil } from '@easy-page/antd-ui'
import { canEditAct } from './common'
import { CanApplyRoleEnum } from '@/common'

export const shenquanCanEditAct = nodeUtil.extends<boolean>(canEditAct, {
  postprocess: () => {
    return ({ value }) => {
      return {
        'applyControl.canModify': value ? [CanApplyRoleEnum.Merchant] : [],
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
