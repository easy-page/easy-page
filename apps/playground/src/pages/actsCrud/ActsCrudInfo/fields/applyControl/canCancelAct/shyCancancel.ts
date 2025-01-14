import { nodeUtil } from '@easy-page/antd-ui'
import { canCancelAct } from './common'
import { CommonActCrudFormState } from '../../interface'

export const shyCancancelAct = nodeUtil.extends<boolean>(canCancelAct, {
  postprocess: () => {
    return ({ value, pageState }) => {
      const formData = pageState as CommonActCrudFormState
      const canApply = formData.canApplyRole
      return {
        'applyControl.canCancel': value ? canApply : [],
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
