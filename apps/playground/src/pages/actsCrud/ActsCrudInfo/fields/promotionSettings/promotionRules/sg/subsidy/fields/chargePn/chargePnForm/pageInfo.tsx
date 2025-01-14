import { PageUtil } from '@easy-page/antd-ui'
import {
  assumeByAmount,
  createChargeSidePnContainer,
  pnSelect,
} from '../fields'
import { assumeByPercent } from '../fields'
import { deleteIcon } from '../fields/delete'

const pu = new PageUtil({ pageId: 'select-pn-form' })

pu.addFields([
  createChargeSidePnContainer({
    id: 'pn',
    label: '承担组织',
    tooltip:
      '注意：同一提报活动中，最多可配置 5 个不同 pn 承担组织，超过后不可继续配置。',
  }).appendChildren([pnSelect, assumeByPercent, assumeByAmount, deleteIcon]),
])

export const chargeSidePnPageInfo = pu.getPageInfo()
