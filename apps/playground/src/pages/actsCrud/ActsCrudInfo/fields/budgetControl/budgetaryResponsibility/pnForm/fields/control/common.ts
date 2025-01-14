import {
  PnControl,
  PnControlText,
} from '@/pages/actsCrud/ActsCrudInfo/fields/interface'
import { nodeUtil } from '@easy-page/antd-ui'
import { basePnControl } from './base'

export const pnControl = basePnControl().appendChildren([
  nodeUtil.createNode(PnControl.Strong, {
    name: PnControlText[PnControl.Strong],
  }),
  nodeUtil.createNode(PnControl.Week, {
    name: PnControlText[PnControl.Week],
  }),
])
