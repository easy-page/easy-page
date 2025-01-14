import { ChargeSideEnum, PoiTypeEnum, PoiTypeText } from '@/common'
import {
  commonSubsidyContainer,
  commonSubsidyInputContainer,
} from './components/commonSubsidyContainer'
import { meituanSubsidyInput } from './components/meituanSubsidyInput'
import { merchantSubsidyInput } from './components/merchantSubsidyInput'
import { agentSubsidyInput } from './components/agentSubsidyInput'
import { choosePn } from './components/choosePn/choosePn'

export const agentConfirmSubsidy = commonSubsidyContainer({
  title: `${PoiTypeText[PoiTypeEnum.Agent]}`,
  id: 'agentConfirmSubsidy',
}).appendChildren([
  commonSubsidyInputContainer({ id: 'directConfirmSubsidy-pn' }).appendChildren(
    [
      meituanSubsidyInput({
        title: '美团（闪购）承担比例',
        id: `${PoiTypeEnum.Agent}_${ChargeSideEnum.MeiTuanShanGou}`,
        chargeSideCode: ChargeSideEnum.MeiTuanShanGou,
        poiType: PoiTypeEnum.Agent,
      }),
      choosePn({
        id: `${PoiTypeEnum.Agent}_pn`,
        chargeSideCode: ChargeSideEnum.MeiTuanShanGou,
        poiType: PoiTypeEnum.Agent,
      }),
    ]
  ),
  agentSubsidyInput({
    title: '代理商承担比例',
    id: `${PoiTypeEnum.Agent}_${ChargeSideEnum.Agent}`,
    chargeSideCode: ChargeSideEnum.Agent,
    poiType: PoiTypeEnum.Agent,
  }),
  merchantSubsidyInput({
    title: '商家承担比例',
    id: `${PoiTypeEnum.Agent}_${ChargeSideEnum.Merchant}`,
    chargeSideCode: ChargeSideEnum.Merchant,
    poiType: PoiTypeEnum.Agent,
  }),
])
