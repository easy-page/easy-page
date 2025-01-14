import {
  SubsidyInfoOfFront,
  ISubActivity,
  PoiTypeEnum,
  ChargeSideInfo,
  ChargeSideEnum,
  ChargeTypeEnum,
} from '@/common'
import { BatchConfirmSubsidyChargeDetailVo } from '@/common/apis/batchConfirmSubsidy'

export const appendChargeDetailVosToList = (
  data: BatchConfirmSubsidyChargeDetailVo,
  processedData: {
    chargeDetailVos: BatchConfirmSubsidyChargeDetailVo[]
  }
) => {
  let chargeDetailVos = processedData.chargeDetailVos

  const isExistsSubsidy = (chargeDetailVos || []).find(
    (item) =>
      item.poiType === data.poiType && item.chargeSide === data.chargeSide
  )

  if (!isExistsSubsidy) {
    if (!chargeDetailVos) {
      chargeDetailVos = [data]
    } else {
      chargeDetailVos.push(data)
    }
  } else {
    chargeDetailVos = (chargeDetailVos || []).map((item) => {
      if (
        item.poiType === data.poiType &&
        item.chargeSide === data.chargeSide
      ) {
        return {
          ...item,
          ...data,
        }
      } else {
        return item
      }
    })
  }

  return { chargeDetailVos }
}
