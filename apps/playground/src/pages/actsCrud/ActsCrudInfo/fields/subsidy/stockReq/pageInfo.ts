import { PageUtil } from '@easy-page/antd-ui'
import { baseLevel } from './fields/baseLevel'
import { expandLevel } from './fields/expandLevel'

export const pu = new PageUtil({ pageId: 'stock-form' })

pu.addFields([baseLevel, expandLevel])

export const stockFormInfo = pu.getPageInfo()
