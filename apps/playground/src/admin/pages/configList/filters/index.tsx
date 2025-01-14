import { configListModel, loadConfigListToModel } from '@/admin/common'
import { CommonListFilter, filterContainer } from '@/common/fields'
import { configId, configName } from './fields'
import { observer } from 'mobx-react'
import { useMemo } from 'react'

const configFilterContainer = () =>
  filterContainer({
    id: 'config-filter',
    defaultValues: {
      id: '',
      name: '',
    },
    onClickReset() {
      configListModel.replaceFilters({})
    },
    onClickSearch(filters) {
      configListModel.replaceFilters({
        ...filters,
      })
      loadConfigListToModel()
    },
    lineFilterCount: 3,
    defaultFilterCount: 3,
  })

const commonFields = [configId, configName]

export const ConfigFilter = observer(() => {
  const { id, name } = configListModel.getFilters()
  const nodes = useMemo(() => {
    return [configFilterContainer().appendChildren(commonFields)]
  }, [])

  return (
    <CommonListFilter
      filterId="config-filter"
      defaultValues={{
        id,
        name,
      }}
      onChange={({ formUtil }) => {
        const values = formUtil?.getFormData?.()
        configListModel.setFilters({
          id,
          name,
          ...values,
        })
      }}
      nodes={nodes}
    />
  )
})
