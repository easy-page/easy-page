import { applyActRestrict } from '@/pages/actsCrud/ActsCrudInfo/fields'
import { nodeUtil } from '@easy-page/antd-ui'

export const csApplyActRestrict = nodeUtil.extends(applyActRestrict, {
  fieldUIConfig(oldFieldUIConfig) {
    return {
      ...oldFieldUIConfig,
      formItem: {
        disabled: true,
      },
    }
  },
})
