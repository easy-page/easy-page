const COMMON_SORTED_COLUMNS_IDS = [
  'lineNumber',
  'childActName',
  'productUpc',
  'productNameKeyword',
  'productNameSensitiveWord',
  'productWeight',
  'productCategory',
  'productOriginPrice',
  'combineProductName',
  'combineProductImgUrl',
  'combineProductSubItemAmount',
  'priceMax',
  'orderLimitRange',
  'dayStockMin',
]
const PLAN_SORTED_COLUMNS_IDS = [
  ...COMMON_SORTED_COLUMNS_IDS,
  'directSubsidy.poiMtCharge1',
  'agentSubsidy.poiMtCharge1',
]
const ACT_SORTED_COLUMNS_IDS = [
  ...COMMON_SORTED_COLUMNS_IDS,
  'supplyPriceRange',
  'enteredSkuCountMax',
  'targetUserType',
  'directSubsidy.poiMtCharge',
  'directSubsidy.poiMtCharge1',
  'directSubsidy.poiMtCharge2Pn',
  'directSubsidy.poiMtCharge2',
  'directSubsidy.poiMtCharge3Pn',
  'directSubsidy.poiMtCharge3',
  'directSubsidy.poiMtCharge4Pn',
  'directSubsidy.poiMtCharge4',
  'directSubsidy.poiMtCharge5Pn',
  'directSubsidy.poiMtCharge5',
  'agentSubsidy.poiMtCharge',
  'agentSubsidy.poiAgentCharge',
  'agentSubsidy.poiMtCharge1',
  'agentSubsidy.poiMtCharge2Pn',
  'agentSubsidy.poiMtCharge2',
  'agentSubsidy.poiMtCharge3Pn',
  'agentSubsidy.poiMtCharge3',
  'agentSubsidy.poiMtCharge4Pn',
  'agentSubsidy.poiMtCharge4',
  'agentSubsidy.poiMtCharge5Pn',
  'agentSubsidy.poiMtCharge5',
]
export const sortError = (
  error: { id: string; msgs: string[] }[],
  isAct: boolean
) => {
  const sortedColums = isAct ? ACT_SORTED_COLUMNS_IDS : PLAN_SORTED_COLUMNS_IDS
  console.log('sortError:', error)
  const temp = error
    .map((e) => ({
      ...e,
      idx: sortedColums.indexOf(e.id),
    }))
    .sort((x, b) => x.idx - b.idx)
  return temp.map((e) => ({ id: e.id, msgs: e.msgs }))
}
