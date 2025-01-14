import { CanApplyRoleEnum, isCopy, isCreate } from '@/common'
import { canEditAct } from '@/pages/actsCrud/ActsCrudInfo/fields'
import { nodeUtil } from '@easy-page/antd-ui'
import { get } from 'lodash'

export const csCanEditAct = nodeUtil.extends(canEditAct, {
  value: false,
  preprocess: () => {
    return ({ defaultValues }) => {
      return (get(defaultValues || {}, 'applyControl.canModify') || [])
        ?.length > 0
        ? true
        : false
    }
  },
  postprocess: () => {
    return ({ value }) => {
      return {
        'applyControl.canModify': value ? [CanApplyRoleEnum.Merchant] : [],
      }
    }
  },
  fieldUIConfig(oldFieldUIConfig) {
    oldFieldUIConfig.formItem.disabled =
      isCreate() || isCopy() ? false : undefined
    return oldFieldUIConfig
  },
})
