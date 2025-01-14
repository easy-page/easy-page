import { CanApplyRoleEnum, isCopy, isCreate } from '@/common'
import { canCancelAct } from '@/pages/actsCrud/ActsCrudInfo/fields'
import { nodeUtil } from '@easy-page/antd-ui'
import { get } from 'lodash'
// import { ShenhuiyuanFormState } from "../../../interface";

export const csCancancelAct = nodeUtil.extends<boolean>(canCancelAct, {
  preprocess: () => {
    return ({ defaultValues }) => {
      return (get(defaultValues || {}, 'applyControl.canCancel') || [])
        ?.length > 0
        ? true
        : false
    }
  },
  postprocess: () => {
    return ({ value }) => {
      console.log('why no herer:', value)
      return {
        'applyControl.canCancel': value ? [CanApplyRoleEnum.Merchant] : [],
      }
    }
  },
  fieldUIConfig(oldFieldUIConfig) {
    oldFieldUIConfig.formItem.disabled =
      isCreate() || isCopy() ? false : undefined
    return oldFieldUIConfig
  },
})
