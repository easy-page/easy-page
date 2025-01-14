import {
  CategoryCode,
  CategoryCodeDesc,
  OperationFactorItem,
} from '@/common/apis'
import { CategoryInfo } from '../interface'

const CategoryTips: Record<CategoryCode, string> = {
  [CategoryCode.Poi]:
    '（多个子活动中商家资质需保持一致，如您修改，将对多个子活动同时生效）',
  [CategoryCode.Sku]: '',
}

export const getCategoryInfo = (choosedFactors: OperationFactorItem[]) => {
  const categoryInfos: CategoryInfo[] = []
  choosedFactors.forEach((each) => {
    if (!categoryInfos.find((e) => e.code === each.categoryCode)) {
      categoryInfos.push({
        code: each.categoryCode,
        title: `${CategoryCodeDesc[each.categoryCode]}维度`,
        tooltips: CategoryTips[each.categoryCode],
      })
    }
  })

  return categoryInfos
}
