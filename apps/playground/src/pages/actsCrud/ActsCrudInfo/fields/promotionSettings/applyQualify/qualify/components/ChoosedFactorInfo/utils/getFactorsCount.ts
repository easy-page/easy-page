import { OperationFactorItem, FactorStatus, CategoryCode } from '@/common/apis'
import { DataCollector } from '@/common/apis/saveAct/interfaces'

export const getFactorsCount = (
  searchOptions: OperationFactorItem[],
  factors?: DataCollector
) => {
  const factorsMap = factors || {}
  const factorKeys = Object.keys(factorsMap)
  const skuFactorKeys: string[] = []
  const poiFactorKeys: string[] = []

  ;(searchOptions || []).forEach((each) => {
    if (factorKeys.includes(each.factorCode)) {
      // if (factorKeys.includes(each.factorCode) && each.status === FactorStatus.Enable) {
      if (each.categoryCode === CategoryCode.Poi) {
        poiFactorKeys.push(each.factorCode)
      } else {
        skuFactorKeys.push(each.factorCode)
      }
    }
  })

  return {
    poiFactorCount: poiFactorKeys.length,
    skuFactorCount: skuFactorKeys.length,
  }
}
