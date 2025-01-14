/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import * as React from 'react'
import warning from 'warning'
import type {
  ColumnFilterItem,
  ColumnsType,
  ColumnTitleProps,
  ColumnType,
  FilterKey,
  FilterValue,
  GetPopupContainer,
  Key,
  TransformColumns,
} from '../../interface'
import { getColumnKey, getColumnPos, renderColumnTitle } from '../../util'
import FilterDropdown from './FilterDropdown'
import { flattenKeys } from './flattenKeys'

// 生成filterState
function collectFilterStates<RecordType>(
  columns: ColumnsType<RecordType>,
  init: boolean,
  pos?: string
): FilterState<RecordType>[] {
  let filterStates: FilterState<RecordType>[] = []

  ;(columns || []).forEach((column, index) => {
    const columnPos = getColumnPos(index, pos)

    if (column.filters || 'filterDropdown' in column || 'onFilter' in column) {
      if ('filteredValue' in column) {
        // Controlled
        let filteredValues = column.filteredValue
        if (!('filterDropdown' in column)) {
          filteredValues = filteredValues?.map(String) ?? filteredValues
        }
        filterStates.push({
          column,
          key: getColumnKey(column, columnPos),
          filteredKeys: filteredValues as FilterKey,
          forceFiltered: column.filtered,
        })
      } else {
        // Uncontrolled
        filterStates.push({
          column,
          key: getColumnKey(column, columnPos),
          filteredKeys: (init && column.defaultFilteredValue
            ? column.defaultFilteredValue!
            : undefined) as FilterKey,
          forceFiltered: column.filtered,
        })
      }
    }

    // 所有筛选数据拍平
    if ('children' in column) {
      filterStates = [
        ...filterStates,
        ...collectFilterStates(column.children, init, columnPos),
      ]
    }
  })

  return filterStates
}

// 渲染表头数据
function injectFilter<RecordType>(
  prefixCls: string,
  dropdownPrefixCls: string,
  columns: ColumnsType<RecordType>,
  filterStates: FilterState<RecordType>[],
  triggerFilter: (filterState: FilterState<RecordType>) => void,
  getPopupContainer: GetPopupContainer | undefined,
  locale: any,
  pos?: string
): ColumnsType<RecordType> {
  return columns.map((column, index) => {
    const columnPos = getColumnPos(index, pos)
    const {
      filterMultiple = true,
      filterMode,
      filterSearch,
      filterSelectAll = true,
    } = column as ColumnType<RecordType>

    let newColumn: ColumnsType<RecordType>[number] = column

    if (newColumn.filters || newColumn.filterDropdown) {
      const columnKey = getColumnKey(newColumn, columnPos)
      const filterState = filterStates.find(({ key }) => columnKey === key)

      newColumn = {
        ...newColumn,
        title: (renderProps: ColumnTitleProps<RecordType>) => (
          <FilterDropdown
            tablePrefixCls={prefixCls}
            prefixCls={`${prefixCls}-filter`}
            dropdownPrefixCls={dropdownPrefixCls}
            column={newColumn}
            columnKey={columnKey}
            filterState={filterState}
            filterMultiple={filterMultiple}
            filterMode={filterMode}
            filterSearch={filterSearch}
            filterSelectAll={filterSelectAll}
            triggerFilter={triggerFilter}
            locale={locale}
            getPopupContainer={getPopupContainer}
          >
            {renderColumnTitle(column.title, renderProps)}
          </FilterDropdown>
        ),
      }
    }

    if ('children' in newColumn) {
      newColumn = {
        ...newColumn,
        children: injectFilter(
          prefixCls,
          dropdownPrefixCls,
          newColumn.children,
          filterStates,
          triggerFilter,
          getPopupContainer,
          locale,
          columnPos
        ),
      }
    }

    return newColumn
  })
}

// 格式化为filteredKeysMap
function generateFilterInfo<RecordType>(
  filterStates: FilterState<RecordType>[]
) {
  const currentFilters: Record<string, FilterValue | null> = {}

  filterStates.forEach(({ key, filteredKeys, column }) => {
    const { filters, filterDropdown } = column
    if (filterDropdown) {
      currentFilters[key] = filteredKeys || null
    } else if (Array.isArray(filteredKeys)) {
      const keys = flattenKeys(filters)
      currentFilters[key] = keys.filter((originKey) =>
        filteredKeys.includes(String(originKey))
      )
    } else {
      currentFilters[key] = null
    }
  })

  return currentFilters
}

export function getFilterData<RecordType>(
  data: RecordType[], // 排序后数据
  filterStates: FilterState<RecordType>[]
) {
  return filterStates.reduce((currentData, filterState) => {
    const {
      column: { onFilter, filters },
      filteredKeys,
    } = filterState
    // 通过onFilter函数确定筛选规则，filteredKeys是选中的筛选项
    if (onFilter && filteredKeys && filteredKeys.length) {
      return currentData.filter((record) =>
        filteredKeys.some((key) => {
          const keys = flattenKeys(filters)
          const keyIndex = keys.findIndex((k) => String(k) === String(key))
          const realKey = keyIndex !== -1 ? keys[keyIndex] : key
          return onFilter(realKey, record)
        })
      )
    }
    return currentData
  }, data)
}

interface FilterConfig<RecordType> {
  prefixCls: string
  dropdownPrefixCls: string
  mergedColumns: ColumnsType<RecordType>
  locale: any
  onFilterChange: (
    filters: Record<string, FilterValue | null>,
    filterStates: FilterState<RecordType>[]
  ) => void
  getPopupContainer?: GetPopupContainer
}

function useFilter<RecordType>({
  prefixCls,
  dropdownPrefixCls,
  mergedColumns,
  onFilterChange,
  getPopupContainer,
  locale: tableLocale,
}: FilterConfig<RecordType>): [
  TransformColumns<RecordType>,
  FilterState<RecordType>[],
  Record<string, FilterValue | null>
] {
  // 生成filterStates
  const [filterStates, setFilterStates] = React.useState<
    FilterState<RecordType>[]
  >(() => collectFilterStates(mergedColumns, true))

  // 返回不带 defaultFilteredValue 配置
  const mergedFilterStates = React.useMemo(() => {
    const collectedStates = collectFilterStates(mergedColumns, false)
    let filteredKeysIsAllNotControlled = true
    let filteredKeysIsAllControlled = true
    collectedStates.forEach(({ filteredKeys }) => {
      if (filteredKeys !== undefined) {
        filteredKeysIsAllNotControlled = false
      } else {
        filteredKeysIsAllControlled = false
      }
    })

    // Return if not controlled
    if (filteredKeysIsAllNotControlled) {
      return filterStates
    }

    warning(
      filteredKeysIsAllControlled,
      'Table',
      'Columns should all contain `filteredValue` or not contain `filteredValue`.'
    )

    return collectedStates
  }, [mergedColumns, filterStates])

  // 生成filteredKeysMap
  const filters = React.useMemo(
    () => generateFilterInfo(mergedFilterStates),
    [mergedFilterStates]
  )

  // 替换新的生成filterStates
  const triggerFilter = (filterState: FilterState<RecordType>) => {
    const newFilterStates = mergedFilterStates.filter(
      ({ key }) => key !== filterState.key
    )
    newFilterStates.push(filterState)
    setFilterStates(newFilterStates)
    onFilterChange(generateFilterInfo(newFilterStates), newFilterStates)
  }

  // title 渲染
  const transformColumns = (innerColumns: ColumnsType<RecordType>) =>
    injectFilter(
      prefixCls,
      dropdownPrefixCls,
      innerColumns,
      mergedFilterStates,
      triggerFilter,
      getPopupContainer,
      tableLocale
    )

  return [transformColumns, mergedFilterStates, filters]
}

export default useFilter
