import {
  ActTypeEnum,
  ChargeSideEnum,
  ChargeTypeEnum,
  PoiTypeEnum,
} from '@/common/constants'
import {
  ChargeSideInfo,
  ISubsidy,
  SaveActParams,
  SubsidyInfoOfFront,
} from '../interfaces'
import Big from 'big.js'
const handleMtSubsidy = (
  poiType: PoiTypeEnum,
  chargeDetailVo: SubsidyInfoOfFront
): ISubsidy[] => {
  const subsidies: ISubsidy[] = []
  const poiTypeList =
    poiType === PoiTypeEnum.All
      ? [PoiTypeEnum.Agent, PoiTypeEnum.Direct]
      : [poiType]
  const mtCharge = chargeDetailVo?.meituan
  if (!mtCharge) {
    return []
  }

  poiTypeList.forEach((poi) => {
    const pns = mtCharge.pns || []
    pns.forEach((pn) => {
      subsidies.push({
        chargeSide: mtCharge.chargeSideCode,
        chargeAmt: new Big(mtCharge.chargeAmt || 0)
          .times(pn.chargeAmt || 0)
          .div(100)
          .toNumber(),
        maxAmount: mtCharge.maxAmount || 0,
        pn: pn.pn || '',
        poiType: poi,
        chargeType: chargeDetailVo?.chargeType,
      })
    })
    if (pns.length === 0) {
      subsidies.push({
        chargeSide: mtCharge.chargeSideCode,
        chargeAmt: mtCharge.chargeAmt,
        maxAmount: mtCharge.maxAmount || 0,
        pn: '',
        poiType: poi,
        chargeType: chargeDetailVo?.chargeType,
      })
    }
  })
  return subsidies
}

const handleOtherSubidy = ({
  poiType,
  chargeSideInfo,
  chargeType,
}: {
  poiType: PoiTypeEnum
  chargeType: ChargeTypeEnum
  chargeSideInfo?: ChargeSideInfo
}) => {
  const subsidies: ISubsidy[] = []
  if (!chargeSideInfo) {
    return subsidies
  }
  const poiTypeList =
    poiType === PoiTypeEnum.All
      ? [PoiTypeEnum.Agent, PoiTypeEnum.Direct]
      : [poiType]
  poiTypeList.forEach((poi) => {
    const maxAmount = chargeSideInfo.maxAmount
    subsidies.push({
      chargeSide: chargeSideInfo.chargeSideCode,
      chargeAmt: new Big(chargeSideInfo.chargeAmt || 0).toNumber(),
      ...(maxAmount !== undefined ? { maxAmount } : {}),
      poiType: poi,
      chargeType: chargeType,
      pn: '',
    })
  })
  return subsidies
}

/** 因为后端数据结构有点过于复杂，不适用前端交互，因此在提交前在这里处理 */
export const handleSubsidy = (data: SaveActParams): SaveActParams => {
  data.subActivity = data?.subActivity || []
  data.subActivity.forEach((each) => {
    if (!each.contentList || each.contentList?.length <= 0) {
      return
    }
    const chargeDetailVos: SubsidyInfoOfFront[] =
      each.contentList[0].subsidy.chargeDetailVos || []

    if (!chargeDetailVos || chargeDetailVos?.length <= 0) {
      return
    }

    const poiType = data.activity?.poiType
    const chargeDetailVo = chargeDetailVos[0]
    console.log('chargeDetailVochargeDetailVo:', chargeDetailVo)
    const submitChargeDetailVos: ISubsidy[] = [
      ...handleMtSubsidy(poiType, chargeDetailVo),
      ...handleOtherSubidy({
        poiType,
        chargeSideInfo: chargeDetailVo.agent,
        chargeType: chargeDetailVo.chargeType,
      }),
      ...handleOtherSubidy({
        poiType,
        chargeSideInfo: chargeDetailVo.merchant,
        chargeType: chargeDetailVo.chargeType,
      }),
    ]
    // each.contentList[0].subsidy.id = chargeDetailVo?.
    each.contentList[0].subsidy.chargeDetailVos = submitChargeDetailVos as any
  })
  return data
}
