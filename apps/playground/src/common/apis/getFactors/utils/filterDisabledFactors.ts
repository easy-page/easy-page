import { getOperationTypeValue } from '@/common/routes'
import { Qualify } from '../../saveAct/interfaces'
import {
  FactorListFirstCategory,
  OperationFactorItem,
  FactorStatus,
} from '../interface'
import { getChoosedFactorCodes } from './getChoosedFactorCodes'
import { GuideCreateInvalidFactors } from '@/common/constants'

export const filterDisabledFactors = ({
  oriFirstCategoryList,
  choosedFactor,
  openGuide,
}: {
  oriFirstCategoryList?: FactorListFirstCategory<OperationFactorItem>[]
  choosedFactor?: Qualify
  openGuide?: boolean
}): {
  searchOptions: OperationFactorItem[]
  firstCategoryList: FactorListFirstCategory<OperationFactorItem>[]
} => {
  let firstCategoryList: FactorListFirstCategory<OperationFactorItem>[] = [
    ...(oriFirstCategoryList || []),
  ]

  const { isCreate, isCopy } = getOperationTypeValue()
  const searchOptions: OperationFactorItem[] = []
  // 二级分类：过滤、排序，因子：过滤、排序、填充 schema
  firstCategoryList.forEach((firstCategory) => {
    // 先对二级分类排序和过滤
    firstCategory.labelList = firstCategory.labelList
      .sort((labelA, labelB) => labelA.priority - labelB.priority)
      .map((label) => {
        // 因子排序和过滤
        const newFactorList = (label.list || [])
          .sort((factorA, factorB) => factorA.priority - factorB.priority)
          .filter((factor) => {
            if (factor.status === FactorStatus.Disable) {
              // 处理已下线的因子
              if (isCreate || isCopy) {
                // 新建或复制时过滤已下线的因子
                return false
              }
              // 查看或编辑时如果已选择该因子，则显示，否则不显示
              const choosedFactorKeys = choosedFactor
                ? getChoosedFactorCodes(choosedFactor)
                : []

              return choosedFactorKeys.includes(factor.factorCode)
            }

            return true
          })
          .map((e) => {
            console.log(
              '11111aaa openGuide:',
              openGuide,
              e.factorCode,
              GuideCreateInvalidFactors
            )
            if (openGuide && GuideCreateInvalidFactors.includes(e.factorCode)) {
              /** 当引导建品打开，则禁用相关因子 */
              e.status = FactorStatus.Disable
            }
            return e
          })
        return {
          ...label,
          list: newFactorList,
        }
      })
      .filter((label) => label.list.length > 0) // 因子过滤后可能某个二级分类为空，也过滤下二级分类

    console.log('firstCategory.labelList:', firstCategory.labelList)
    // 收集全量的因子信息
    firstCategory.labelList.forEach((item) => {
      searchOptions.push(
        ...(item.list || []).map((e) => ({
          ...e,
          categoryCode: item.code,
          categoryTitle: item.name,
        }))
      )
    })
  })

  // 二级分类过滤后可能某个一级分类为空，也过滤下一级分类
  firstCategoryList = firstCategoryList.filter(
    (firstCategory) => firstCategory.labelList.length > 0
  )
  return {
    firstCategoryList,
    searchOptions,
  }
}
