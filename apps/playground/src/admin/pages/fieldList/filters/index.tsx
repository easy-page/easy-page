import { fieldListModel, loadFieldListToModel } from '@/admin/common'
import { CommonListFilter, filterContainer } from '@/common/fields'
import { observer } from 'mobx-react'
import { useMemo } from 'react'
import { belong, fieldId, fieldName } from './fields'
import { ALL, FieldBelongFirstLevel, FieldBelongText } from '@/common'

const fieldFilterContainer = () =>
  filterContainer({
    id: 'field-filter',
    defaultValues: {
      fieldIds: [],
      fieldName: '',
      belong: {
        choosed: ALL as any,
        options: Object.keys(FieldBelongText)
          .map((e) => ({
            value: e,
            label: FieldBelongText[e],
          }))
          .concat([
            { label: '全部', value: ALL as any as FieldBelongFirstLevel },
          ]),
      },
    },
    onClickReset() {
      fieldListModel.replaceFilters({})
    },
    onClickSearch(filters) {
      fieldListModel.replaceFilters({
        ...filters,
      })
      loadFieldListToModel()
    },
    lineFilterCount: 3,
    defaultFilterCount: 3,
  })

const commonFields = [fieldId, fieldName, belong]

export const FieldFilter = observer(() => {
  const filters = fieldListModel.getFilters()
  const nodes = useMemo(() => {
    return [fieldFilterContainer().appendChildren(commonFields)]
  }, [])

  return (
    <CommonListFilter
      filterId="config-filter"
      defaultValues={filters}
      onChange={({ formUtil }) => {
        const values = formUtil?.getFormData?.()
        fieldListModel.setFilters({
          ...filters,
          ...values,
        })
      }}
      nodes={nodes}
    />
  )
})
