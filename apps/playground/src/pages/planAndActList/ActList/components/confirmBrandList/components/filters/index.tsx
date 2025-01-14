import { observer } from 'mobx-react'
import { useParamsInfo } from '@/common/hooks'
import { BizLineEnum } from '@/common/constants'
import { CommonListFilter, filterContainer } from '@/common/fields'
import {
  loadPoiApplyListToModel,
  mccModel,
  poiApplyListModel,
} from '@/common/models'
import { statusOptionsModel } from '@/common/models'
import { actDetailModel } from '@/common/models'
import { cityListModel } from '@/common/models'
import { useEffect, useMemo } from 'react'
import { ALL, ActApplyResultParams, DEFAULT_FILTER_SIZE } from '@/common'
import { NodeInfoWithChildren } from '@easy-page/antd-ui'
import { ListModel } from '@/common/models/base/list'
import { StatusOption } from '@/common/apis/getActApplyResStatusOptions'
import {
  brandStatListModel,
  loadBrandStatListToModel,
} from '@/common/models/brandStatList'
import { SearchRuleId } from './constant'
import { loadBrandSelectListToModel } from '@/common/models/brandSelectList'
import { brandName } from './brandName'
import { brandIds } from './brandId'

const DefaultFilters = {
  [SearchRuleId.BrandIds]: '',
  [SearchRuleId.BrandIds4Select]: {
    choosed: undefined,
  },
}

/**
 * - 方案列表的过滤条件
 * - 每个列表的过滤条件不一样，难以通过 dom 判断个数，因此最佳方案是自己计算一下
 * - 下面是将：curFilterCount 挂在到当前节点上
 *  */
function actApplyResFilterContainer() {
  return filterContainer({
    id: 'confirm-brandlist-filter-contaienr',
    defaultValues: DefaultFilters,
    disableDefaultReset: true,
    onClickReset: (formUtil) => {
      // const oriForm = formUtil?.getOriginFormData()
      brandStatListModel.resetFilters({})

      formUtil?.setFieldsValue({
        ...DefaultFilters,
      })
    },

    onClickSearch(filters) {
      // 当点击搜索的时候，将搜索条件存入：model
      brandStatListModel.replaceFilters(filters)
      // 使用方案列表 model 进行搜索
      loadBrandStatListToModel()
    },
    // 每行默认展示 4 个条件
    lineFilterCount: 4,
    defaultFilterCount: DEFAULT_FILTER_SIZE,
  })
}

export const ConfirmBrandListFilter = observer(function () {
  const filters = brandStatListModel.getFilters()

  const nodes = useMemo(() => {
    return [actApplyResFilterContainer().appendChildren([brandIds, brandName])]
  }, [])

  return (
    <CommonListFilter<
      {
        brandIds?: string
        brandId?: number
      },
      {}
    >
      filterId="confirm-brandlist-filter"
      defaultValues={{
        ...filters,
      }}
      onChange={({ formUtil }) => {
        const values: any = formUtil?.getFormData?.() || {}
        brandStatListModel.setFilters({
          ...values,
        })
      }}
      context={{}}
      nodes={nodes}
    />
  )
})
