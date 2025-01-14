import { nodeUtil } from '@easy-page/antd-ui'
import { CommonActCrudFormState } from '../../interface'
import { canEditAct } from './common'

export const shyCanEditAct = nodeUtil.extends<boolean>(canEditAct, {
  postprocess: () => {
    return ({ value, pageState }) => {
      const formData = pageState as CommonActCrudFormState
      const canApply = formData.canApplyRole
      return {
        'applyControl.canModify': value ? canApply : [],
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
