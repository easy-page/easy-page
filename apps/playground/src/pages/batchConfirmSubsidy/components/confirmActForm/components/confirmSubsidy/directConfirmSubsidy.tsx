import { ChargeSideEnum, PoiTypeEnum, PoiTypeText } from '@/common'
import {
  commonSubsidyContainer,
  commonSubsidyInputContainer,
} from './components/commonSubsidyContainer'
import { pnSelect } from '@/pages/actsCrud/ActsCrudInfo/fields/promotionSettings/promotionRules/sg/subsidy/fields/chargePn/fields'
import { nodeUtil } from '@easy-page/antd-ui'
import { meituanSubsidyInput } from './components/meituanSubsidyInput'
import { merchantSubsidyInput } from './components/merchantSubsidyInput'
import { choosePn } from './components/choosePn/choosePn'

export const directConfirmSubsidy = commonSubsidyContainer({
  title: `${PoiTypeText[PoiTypeEnum.Direct]}`,
  id: 'directConfirmSubsidy',
}).appendChildren([
  commonSubsidyInputContainer({ id: 'directConfirmSubsidy-pn' }).appendChildren(
    [
      meituanSubsidyInput({
        title: '美团（闪购）承担比例',
        id: `${PoiTypeEnum.Direct}_${ChargeSideEnum.MeiTuanShanGou}`,
        chargeSideCode: ChargeSideEnum.MeiTuanShanGou,
        poiType: PoiTypeEnum.Direct,
      }),
      choosePn({
        id: `${PoiTypeEnum.Direct}_pn`,
        poiType: PoiTypeEnum.Direct,
        chargeSideCode: ChargeSideEnum.MeiTuanShanGou,
      }),
    ]
  ),
  merchantSubsidyInput({
    title: '商家承担比例',
    id: `${PoiTypeEnum.Direct}_${ChargeSideEnum.Merchant}`,
    chargeSideCode: ChargeSideEnum.Merchant,
    poiType: PoiTypeEnum.Direct,
  }),
])
