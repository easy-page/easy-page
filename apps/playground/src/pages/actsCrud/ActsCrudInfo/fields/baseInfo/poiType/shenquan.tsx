import { nodeUtil } from '@easy-page/antd-ui'

import { shyPoiType } from '@/pages/actsCrud/ActsCrudInfo/fields'

export const shenquanPoiType = nodeUtil.extends(shyPoiType, {
  fieldUIConfig(oldFieldUIConfig) {
    const newConfig = oldFieldUIConfig || {}
    newConfig.radioGroup = newConfig.radioGroup || {}
    delete newConfig.radioGroup.handleChange
    return newConfig
  },
})
