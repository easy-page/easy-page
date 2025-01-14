import { loadFieldListToModel } from '@/admin/common'
import { CommonListFilter, filterContainer } from '@/common/fields'
import { observer } from 'mobx-react'
import { useMemo } from 'react'
import { AdminOpType } from '@/common'
import { loadLogListToModel, logListModel } from '@/admin/common/models/logs'
import { opType, recordIds } from './fields'
import { operator } from './fields/operator'
import { ConfigListInfo } from '@/common/apis/getConfigList'

const LogFilterContainer = () =>
  filterContainer({
    id: 'log-filter',
    defaultValues: {
      opType: undefined,
      operator: '',
      recordIds: [],
    },
    onClickReset() {
      logListModel.replaceFilters({})
    },
    onClickSearch(filters) {
      console.log('filtersfilters:', filters)
      logListModel.replaceFilters({
        ...filters,
      })
      loadLogListToModel()
    },
    lineFilterCount: 3,
    defaultFilterCount: 3,
  })

export type LogFilterProps = {
  configs: ConfigListInfo[]
}
export const LogFilter = observer(({ configs }: LogFilterProps) => {
  const filters = logListModel.getFilters()

  const nodes = useMemo(() => {
    const commonFields = [recordIds({ configs }), opType, operator]
    return [LogFilterContainer().appendChildren(commonFields)]
  }, [])

  return (
    <CommonListFilter
      filterId="log-filter"
      defaultValues={filters}
      onChange={({ formUtil }) => {
        const values = formUtil?.getFormData?.()
        logListModel.setFilters({
          ...filters,
          ...values,
        })
      }}
      nodes={nodes}
    />
  )
})
