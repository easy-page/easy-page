import {
  PageUtil,
  NodeInfo,
  NodeInfoWithChildren,
  nodeUtil,
} from '@easy-page/antd-ui'
import { createField } from './createField'
import { getCategoryInfo } from './libs/getCategoryInfo'
import { GetFieldsOption } from './interface'
import { createCategoryContainer } from './fields'

export const getFactorPageInfo = ({
  allFactors,
  id,
  mccConfigs,
}: GetFieldsOption) => {
  const pu = new PageUtil({ pageId: `choosed-factors-page_${id}` })
  const nodes: (
    | NodeInfo<any, any, any>
    | NodeInfoWithChildren<any, any, any>
  )[] = []
  // 基于 categoryCode 分类
  const categoryInfos = getCategoryInfo(allFactors)

  categoryInfos.forEach((category) => {
    const childs: (
      | NodeInfo<any, any, any>
      | NodeInfoWithChildren<any, any, any>
    )[] = allFactors
      .filter((e) => e.categoryCode === category.code)
      .map((factor) =>
        createField(factor, category.code, {
          mccConfigs,
        })
      )

    nodes.push(
      createCategoryContainer(category.code, category.title, {
        toolTips: category.tooltips,
      }).appendChildren(childs)
    )
  })

  pu.addFields([...nodes])
  return pu.getPageInfo()
}

export * from './interface'
