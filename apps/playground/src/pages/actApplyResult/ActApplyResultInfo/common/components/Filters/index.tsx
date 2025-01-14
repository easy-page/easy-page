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
import {
  ActApplyResultFilterFormState,
  ActApplyResultFilterFormProps,
} from './interface'
import { actDetailModel } from '@/common/models'
import { cityListModel } from '@/common/models'
import { useMemo } from 'react'
import { ALL, ActApplyResultParams, DEFAULT_FILTER_SIZE } from '@/common'
import { NodeInfoWithChildren } from '@easy-page/antd-ui'
import { SearchRuleId } from '../../constants'
import { getStatusOptions } from './utils/getStatusOptions'
import { ListModel } from '@/common/models/base/list'
import { StatusOption } from '@/common/apis/getActApplyResStatusOptions'

const DefaultFilters = {
  [SearchRuleId.CityIds]: {
    choosed: [ALL],
  },
  [SearchRuleId.SubsidyLevel]: {
    choosed: ['-1'],
  },
  [SearchRuleId.Status]: {
    choosed: [],
  },
  [SearchRuleId.ApplyTime]: undefined,
  [SearchRuleId.PoiBrandIds]: null,
  [SearchRuleId.BrandName]: '',
  [SearchRuleId.PoiIds]: '',
  [SearchRuleId.PoiName]: '',
  [SearchRuleId.SkuIds]: '',
  [SearchRuleId.SkuName]: '',
  [SearchRuleId.Upc]: '',
}

/**
 * - 方案列表的过滤条件
 * - 每个列表的过滤条件不一样，难以通过 dom 判断个数，因此最佳方案是自己计算一下
 * - 下面是将：curFilterCount 挂在到当前节点上
 *  */
function actApplyResFilterContainer<T>({
  bizLine,
  activityId,
  listModel,
  loadListData,
  filterCount,
}: {
  bizLine: BizLineEnum
  activityId: number
  listModel: ListModel<T, any>
  loadListData: ({ bizLine, activityId }: any) => void
  filterCount?: number
}) {
  return filterContainer({
    id: 'apply-act-res-filter-container',
    defaultValues: DefaultFilters,
    disableDefaultReset: true,
    onClickReset: (formUtil) => {
      const oriForm = formUtil?.getOriginFormData()
      poiApplyListModel.resetFilters({})

      formUtil?.setFieldsValue({
        ...DefaultFilters,
        cityIds: {
          ...(oriForm?.cityIds || {}),
          choosed: [-1],
        } as any,
        subActIds: {
          ...(oriForm?.subActIds || {}),
          choosed: ['-1'],
        } as any,
        scene: {
          ...(oriForm?.scene || {}),
          choosed: '-1',
        },
        status: {
          ...(oriForm?.status || {}),
          choosed: ['-1'],
        } as any,
      })
    },

    onClickSearch(filters) {
      console.log('filtersfilters:', filters)
      // 当点击搜索的时候，将搜索条件存入：model
      listModel.replaceFilters(filters)
      // 使用方案列表 model 进行搜索
      loadListData({ bizLine, activityId })
    },
    // 每行默认展示 4 个条件
    lineFilterCount: 4,
    defaultFilterCount: filterCount || DEFAULT_FILTER_SIZE,
  })
}

export const ActAppltResultFilter = observer(function <T>({
  activityId,
  filters: filtersOptions,
  listModel,
  statusOptions,
  loadListData,
  filterCount,
}: {
  activityId: number
  filters: NodeInfoWithChildren<any, any, any>[]
  listModel: ListModel<T, any>

  statusOptions?: StatusOption[]
  loadListData: (params: Record<string, any>) => void
  filterCount?: number
}) {
  const filters = listModel.getFilters()
  const { data: actDetail } = actDetailModel.getData()
  const { data: cities } = cityListModel.getList()
  const { params } = useParamsInfo<ActApplyResultParams>()
  const { data } = mccModel.getData()
  const statusOptionsMemo = useMemo(() => getStatusOptions(data), [data])
  const nodes = useMemo(() => {
    return [
      actApplyResFilterContainer<T>({
        bizLine: params.bizLine as any as BizLineEnum,
        activityId,
        listModel,
        loadListData,
        filterCount,
      }).appendChildren(filtersOptions),
    ]
  }, [activityId, filtersOptions])
  return (
    <CommonListFilter<
      ActApplyResultFilterFormState,
      ActApplyResultFilterFormProps
    >
      filterId="act-apply-result-filter"
      defaultValues={{
        ...filters,
      }}
      onChange={({ formUtil }) => {
        const values: any = formUtil?.getFormData?.() || {}
        listModel.setFilters({
          ...values,
        })
      }}
      context={{
        statusOptions: statusOptions || statusOptionsMemo,
        subActivity: actDetail.subActivity,
        cities: cities,
      }}
      nodes={nodes}
    />
  )
})
