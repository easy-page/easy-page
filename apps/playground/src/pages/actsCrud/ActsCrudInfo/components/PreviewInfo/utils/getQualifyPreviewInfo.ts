import {
  DataCollector,
  FactorInfo,
  FactorListFirstCategory,
  OperationFactorItem,
  toJson,
} from '@/common'
import { flatten } from 'lodash'

const getFactorCodes = (data: FactorListFirstCategory<OperationFactorItem>) => {
  return flatten(
    (data?.labelList || []).map((e) => (e.list || []).map((x) => x.factorCode))
  )
}

export const getQualifyPreviewInfo = (
  qualify: DataCollector,
  factors: FactorInfo
) => {
  const poiFactors = factors?.fullInfo?.poi
  const skuFactors = factors?.fullInfo?.sku
  const poiFactorCodes = getFactorCodes(poiFactors)
  const skuFactorCodes = getFactorCodes(skuFactors)

  const poiPreviewInfos = []
  const skuPreviewInfos = []
  Object.keys(qualify || {}).forEach((each) => {
    const infos = toJson(qualify[each], { defaultValue: {} })
    const preview = toJson(infos.feExtend, { defaultValue: {} })
    if (poiFactorCodes.includes(each)) {
      if (preview.previewInfo) {
        poiPreviewInfos.push(preview.previewInfo)
      }
    }
    if (skuFactorCodes.includes(each)) {
      if (preview.previewInfo) {
        skuPreviewInfos.push(preview.previewInfo)
      }
    }
  })
  return {
    poi: poiPreviewInfos,
    sku: skuPreviewInfos,
  }
}
