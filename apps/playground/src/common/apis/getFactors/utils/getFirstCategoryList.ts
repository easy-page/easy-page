import {
  FactorListResp,
  OperationFactorItem,
  FactorListFirstCategory,
} from '../interface'

export const getFirstCategoryList = ({
  poi,
  sku,
}: FactorListResp<OperationFactorItem>) => {
  const firstCategoryList: FactorListFirstCategory<OperationFactorItem>[] = []
  if (sku && sku.labelList && sku.labelList.length > 0) {
    firstCategoryList.push(sku)
  }
  if (poi && poi.labelList && poi.labelList.length > 0) {
    firstCategoryList.push(poi)
  }

  return firstCategoryList
}
