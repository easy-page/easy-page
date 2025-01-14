import { loadPlanListToModel, planListModel } from '@/common/models'
import { observer } from 'mobx-react'
import { filterContainer } from '../common/filterContainer'
import { createTime } from './createTime'
import { planCreator } from './creator'
import { planId } from './planId'
import { planName } from './planName'
import { publishTime } from './planPublishTime'
import { planStatus } from './planStatus'
import { planType } from './planType'
import { CommonListFilter } from '../common'
import { useParamsInfo } from '@/common/hooks'
import { PlanAndActListParams } from '@/common/routes'
import {
  BizLineEnum,
  PLAN_JOIN_STATUS_OPTIONS,
  PLAN_TYPE_OPTIONS,
  PlanJoinStatusEnum,
  PlanSubTabResources,
} from '@/common/constants'
import { useMemo } from 'react'
import { ALL, PLAN_STATUS_OPTIONS, PlanStatusEnum } from '@/common/constants'
import { joinStatus } from './joinStatus'
import { getBizLine } from '@/common/libs'

/**
 * - 方案列表的过滤条件
 * - 每个列表的过滤条件不一样，难以通过 dom 判断个数，因此最佳方案是自己计算一下
 * - 下面是将：curFilterCount 挂在到当前节点上
 *  */
const planFilterContainer = (bizLine: BizLineEnum, filterCount: number) =>
  filterContainer({
    id: 'plan-filter-container',
    defaultValues: {
      ctime: [undefined, undefined],
      sendTime: [undefined, undefined],
      planType: {
        choosed: ALL,
        options: PLAN_TYPE_OPTIONS,
      },
      planStatus: {
        choosed: ALL as PlanStatusEnum,
        options: PLAN_STATUS_OPTIONS,
      },
      joinStatus: {
        choosed: ALL as PlanJoinStatusEnum,
        options: PLAN_JOIN_STATUS_OPTIONS,
      },
      creator: [],
      planId: '',
      planName: '',
    },
    onClickReset() {
      planListModel.resetFilters({ excludeKeys: ['filterType'] })
    },
    onClickSearch(filters) {
      console.log('plan filters:', filters)
      const oriFilters = planListModel.filters

      // 当点击搜索的时候，将搜索条件存入：model
      planListModel.replaceFilters({
        filterType: oriFilters.filterType,
        joinStatus: oriFilters.joinStatus,
        ...filters,
      })

      const { pageSize, pageNo } = planListModel.pageInfo

      if (pageNo !== 1) {
        planListModel.changePage({ pageNo: 1, pageSize })
        return
      }
      // 使用方案列表 model 进行搜索
      loadPlanListToModel(bizLine)
    },
    // 每行默认展示 4 个条件
    lineFilterCount: 3,
    defaultFilterCount: filterCount,
  })

const commonFields = [
  planId,
  planName,
  // planType,
  planStatus,
  publishTime,
  createTime,
]

const sgFields = [
  planId,
  planName,
  planType,
  planStatus,
  publishTime,
  createTime,
]

const fieldsByBizLine: Record<BizLineEnum, any[]> = {
  [BizLineEnum.WaiMai]: [...commonFields],
  [BizLineEnum.ShanGou]: [...sgFields],
  [BizLineEnum.WaimaSongJiu]: [...commonFields],
}

const FiltersAndPlanFilterTypeMap: (
  bizLine: BizLineEnum
) => Record<PlanSubTabResources, any[]> = (bizLine) => ({
  [PlanSubTabResources.All]: [...fieldsByBizLine[bizLine], planCreator],
  [PlanSubTabResources.Mine]: [...fieldsByBizLine[bizLine]],
  [PlanSubTabResources.Confirm]: [
    ...fieldsByBizLine[bizLine],
    planCreator,
    joinStatus,
  ],
})

/** 默认展示几个条件 */
const DefaultFilterCountMap: Record<PlanSubTabResources, number> = {
  [PlanSubTabResources.All]: 6,
  [PlanSubTabResources.Mine]: 6,
  [PlanSubTabResources.Confirm]: 7,
}

export const PlanFilter = observer(() => {
  const { filterType, joinStatus, ...rest } = planListModel.getFilters()
  const { params } = useParamsInfo<PlanAndActListParams>()
  const nodes = useMemo(() => {
    const planFilterType = params.planFilterType || PlanSubTabResources.Mine

    const filterNodes = FiltersAndPlanFilterTypeMap(
      getBizLine() || BizLineEnum.WaiMai
    )?.[planFilterType]

    return [
      planFilterContainer(
        params.bizLine as any as BizLineEnum,
        DefaultFilterCountMap[planFilterType]
      ).appendChildren(filterNodes),
    ]
  }, [params.bizLine, params.planFilterType])

  console.log('defaultValues1111:', joinStatus)
  return (
    <CommonListFilter
      filterId="plan-filter"
      defaultValues={{
        filterType,
        joinStatus,
        ...rest,
      }}
      onChange={({ formUtil }) => {
        const values = formUtil?.getFormData?.()
        planListModel.setFilters({
          filterType,
          joinStatus,
          ...values,
        })
      }}
      nodes={nodes}
    />
  )
})
