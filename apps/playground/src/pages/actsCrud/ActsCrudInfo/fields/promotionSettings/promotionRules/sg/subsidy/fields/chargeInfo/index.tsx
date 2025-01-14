import { PoiTypeEnum, PoiTypeText } from '@/common'
import { createChargeInfoContainer } from './common'
import { agentSubsidyField } from './fields/agentSubsidy'
import { merchantSubsidyField } from './fields/merchantSubsidy'
import { contentListIdForEdit, meituanSubsidyField } from './fields'
import { chargeSidePnForm } from '../chargePn'
import { subsidyIdForEdit } from './fields/subsidyId'

export const commonChargeInfo = createChargeInfoContainer({
  getSubsidyTitle: ({ poiType }) => {
    if (poiType === PoiTypeEnum.All) {
      return `${PoiTypeText[PoiTypeEnum.Direct]}、${
        PoiTypeText[PoiTypeEnum.Agent]
      }`
    }
    return `${PoiTypeText[poiType]}`
  },
}).appendChildren([
  meituanSubsidyField, // 美团补贴信息
  chargeSidePnForm(), // 美团补贴PN信息
  agentSubsidyField, // 代理商承担
  merchantSubsidyField, // 商家承担
  subsidyIdForEdit,
  contentListIdForEdit,
])

export * from './common'
