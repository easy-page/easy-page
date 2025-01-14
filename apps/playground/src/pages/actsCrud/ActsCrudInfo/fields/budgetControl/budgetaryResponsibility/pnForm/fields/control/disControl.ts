import { nodeUtil } from '@easy-page/antd-ui'
import { pnControl } from './common'
import { PnControl } from '@/pages/actsCrud/ActsCrudInfo/fields/interface'

/** 折扣菜的 pn 管控 */
export const disPnControl = nodeUtil.extends(pnControl, {
  value: PnControl.Week,
  fieldUIConfig(oldFieldUIConfig) {
    oldFieldUIConfig.formItem = oldFieldUIConfig.formItem || {}
    oldFieldUIConfig.formItem.disabled = true
    return oldFieldUIConfig
  },
})
