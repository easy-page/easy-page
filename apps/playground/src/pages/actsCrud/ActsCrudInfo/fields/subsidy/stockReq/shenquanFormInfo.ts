import { PageUtil } from '@easy-page/antd-ui'
import { shenquanBaseLevel } from './fields/baseLevel'
import { shenquanExpandLevel } from './fields/expandLevel'

export const pu = new PageUtil({ pageId: 'stock-form' })

pu.addFields([shenquanBaseLevel, shenquanExpandLevel])

export const shenquanStockFormInfo = pu.getPageInfo()
