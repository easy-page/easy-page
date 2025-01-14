import { observer } from 'mobx-react'
import { CommonListFilter, filterContainer } from '@/common/fields'
import { useEffect, useMemo } from 'react'
import {
  ACTIVITY_CONFIRM_STATUS_OPTIONS,
  ALL,
  ActApplyResultParams,
  DEFAULT_FILTER_SIZE,
  getQueryNumber,
  getQueryString,
  toJson,
} from '@/common'
import { SearchRuleId } from './constant'
import { actIds } from './actId'
import { ConfirmStatusOptions } from '@/common/apis/getBatchConfirmActList'
import { actCreateTime } from './actCreateTime'
import { actName } from './actName'
import { confirmStatus } from './confirmStatus'
import { confirmTime } from './confirmTime'
import { activityConfirmStatus } from './activityConfirmStatus'
import {
  loadKaConfirmResultActListToModel,
  kaConfirmResultListModel,
} from '@/common/models/kaConfirmResultActList'
import { brandId } from './brandId'

const DefaultFilters = {
  [SearchRuleId.ActivityIds]: '',
  [SearchRuleId.ActivityTime]: [undefined, undefined],
  [SearchRuleId.ConfirmTime]: [undefined, undefined],
  [SearchRuleId.ConfirmStatus]: {
    choosed: [ALL],
    options: ConfirmStatusOptions.concat({ label: '全部', value: ALL }),
  },
  [SearchRuleId.ActivityConfirmStatus]: {
    choosed: ALL,
    options: ACTIVITY_CONFIRM_STATUS_OPTIONS,
  },
  [SearchRuleId.ActivityName]: '',
}

/**
 * - 方案列表的过滤条件
 * - 每个列表的过滤条件不一样，难以通过 dom 判断个数，因此最佳方案是自己计算一下
 * - 下面是将：curFilterCount 挂在到当前节点上
 *  */
function kaConfirmResultFilterContainer() {
  return filterContainer({
    id: 'ka-confirm-result-filter-contaienr',
    defaultValues: DefaultFilters,
    disableDefaultReset: true,
    onClickReset: (formUtil) => {
      // const oriForm = formUtil?.getOriginFormData()
      kaConfirmResultListModel.resetFilters({})

      formUtil?.setFieldsValue({
        ...DefaultFilters,
      })
    },

    onClickSearch(filters) {
      const brandId = getQueryNumber('brandId')
      // 当点击搜索的时候，将搜索条件存入：model
      kaConfirmResultListModel.replaceFilters(filters)
      // 使用方案列表 model 进行搜索
      loadKaConfirmResultActListToModel({ brandId })
    },
    lineFilterCount: 3,
    defaultFilterCount: 6,
  })
}

export const KaConfirmResultFilter = observer(function () {
  const filters = kaConfirmResultListModel.getFilters()

  const nodes = useMemo(() => {
    return [
      kaConfirmResultFilterContainer().appendChildren([
        brandId,
        confirmStatus,
        confirmTime,
        actIds,
        actName,
        actCreateTime,
        activityConfirmStatus,
      ]),
    ]
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
        kaConfirmResultListModel.setFilters({
          ...values,
        })
      }}
      context={{}}
      nodes={nodes}
    />
  )
})
