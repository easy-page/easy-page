import { observer } from 'mobx-react'
import { CommonListFilter, filterContainer } from '@/common/fields'
import { useEffect, useMemo } from 'react'
import {
  ALL,
  ActApplyResultParams,
  ConfirmStatusEnum,
  DEFAULT_FILTER_SIZE,
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
import {
  batchConfirmActListModel,
  loadbatchConfirmActListToModel,
} from '@/common/models/batchConfirmActList'

const DefaultFilters = {
  [SearchRuleId.ActivityIds]: '',
  [SearchRuleId.ActivityTime]: [undefined, undefined],
  [SearchRuleId.ConfirmTime]: [undefined, undefined],
  [SearchRuleId.ConfirmStatus]: {
    choosed: [ConfirmStatusEnum.UnConfirm],
    options: ConfirmStatusOptions.concat({ label: '全部', value: ALL }),
  },
  [SearchRuleId.ActivityName]: '',
}

/**
 * - 方案列表的过滤条件
 * - 每个列表的过滤条件不一样，难以通过 dom 判断个数，因此最佳方案是自己计算一下
 * - 下面是将：curFilterCount 挂在到当前节点上
 *  */
function batchConfirmListFilterContainer() {
  return filterContainer({
    id: 'batch-confirm-act-filter-contaienr',
    defaultValues: DefaultFilters,
    disableDefaultReset: true,
    onClickReset: (formUtil) => {
      // const oriForm = formUtil?.getOriginFormData()
      batchConfirmActListModel.resetFilters({})

      formUtil?.setFieldsValue({
        ...DefaultFilters,
      })
    },

    onClickSearch(filters) {
      const brandIdsStr = getQueryString('brandIds')
      const brandIds = toJson(brandIdsStr, {
        defaultValue: [],
      })

      // 当点击搜索的时候，将搜索条件存入：model
      batchConfirmActListModel.replaceFilters(filters)

      // 使用方案列表 model 进行搜索
      loadbatchConfirmActListToModel({ brandIds })
    },
    lineFilterCount: 3,
    defaultFilterCount: DEFAULT_FILTER_SIZE,
  })
}

export const BatchConfirmActFilter = observer(function () {
  const filters = batchConfirmActListModel.getFilters()

  const confirm4Batch = getQueryString('confirm4Batch')

  const isBatchConfirm = confirm4Batch === 'true'

  const concatFilters = !isBatchConfirm
    ? [confirmStatus, confirmTime]
    : [confirmTime]

  const nodes = useMemo(() => {
    return [
      batchConfirmListFilterContainer().appendChildren([
        actIds,
        actName,
        actCreateTime,
        ...concatFilters,
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
        batchConfirmActListModel.setFilters({
          ...values,
        })
      }}
      context={{}}
      nodes={nodes}
    />
  )
})
