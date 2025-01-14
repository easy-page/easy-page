/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import classNames from 'classnames'
import KeyCode from 'rc-util/lib/KeyCode'
import * as React from 'react'
import Tooltip from '@roo/roo/Tooltip'
import type { TooltipProps } from '@roo/roo/Tooltip'
import type {
  Column,
  ColumnGroupType,
  ColumnsType,
  ColumnTitleProps,
  ColumnType,
  CompareFn,
  Key,
  SorterResult,
  SortOrder,
  TransformColumns,
} from '../interface'
import { getColumnKey, getColumnPos, renderColumnTitle } from '../util'

const ASCEND = 'ascend'
const DESCEND = 'descend'

function getMultiplePriority<RecordType>(
  column: ColumnType<RecordType>
): number | false {
  if (
    typeof column.sorter === 'object' &&
    typeof column.sorter.multiple === 'number'
  ) {
    return column.sorter.multiple
  }
  return false
}

function getSortFunction<RecordType>(
  sorter: ColumnType<RecordType>['sorter']
): CompareFn<RecordType> | false {
  if (typeof sorter === 'function') {
    return sorter
  }
  if (sorter && typeof sorter === 'object' && sorter.compare) {
    return sorter.compare
  }
  return false
}

function nextSortDirection(
  sortDirections: SortOrder[],
  current: SortOrder | null
) {
  if (!current) {
    return sortDirections[0]
  }

  return sortDirections[sortDirections.indexOf(current) + 1]
}

export interface SortState<RecordType> {
  column: ColumnType<RecordType>
  key: Key
  sortOrder: SortOrder | null
  multiplePriority: number | false
}

function collectSortStates<RecordType>(
  columns: Column<RecordType>[],
  init: boolean,
  pos?: string
): SortState<RecordType>[] {
  let sortStates: SortState<RecordType>[] = []

  function pushState(
    column: ColumnsType<RecordType>[number],
    columnPos: string
  ) {
    sortStates.push({
      column,
      key: getColumnKey(column, columnPos),
      multiplePriority: getMultiplePriority(column),
      sortOrder: column.sortOrder!,
    })
  }

  // eslint-disable-next-line no-extra-semi
  ;(columns || []).forEach((column, index) => {
    const columnPos = getColumnPos(index, pos)

    if ((column as ColumnGroupType<RecordType>).children) {
      if ('sortOrder' in column) {
        // Controlled
        pushState(column as ColumnsType<RecordType>[number], columnPos)
      }
      sortStates = [
        ...sortStates,
        ...collectSortStates(
          (column as ColumnGroupType<RecordType>)
            .children as Column<RecordType>[],
          init,
          columnPos
        ),
      ]
    } else if (column.sorter) {
      if ('sortOrder' in column) {
        // Controlled
        pushState(column as ColumnsType<RecordType>[number], columnPos)
      } else if (init && column.defaultSortOrder) {
        // Default sorter
        sortStates.push({
          column: column as ColumnsType<RecordType>[number],
          key: getColumnKey(
            column as ColumnsType<RecordType>[number],
            columnPos
          ),
          multiplePriority: getMultiplePriority(
            column as ColumnsType<RecordType>[number]
          ),
          sortOrder: column.defaultSortOrder!,
        })
      }
    }
  })

  return sortStates
}

function injectSorter<RecordType>(
  prefixCls: string,
  columns: ColumnsType<RecordType>,
  sorterStates: SortState<RecordType>[],
  triggerSorter: (sorterSates: SortState<RecordType>) => void,
  defaultSortDirections: SortOrder[],
  tableLocale?: any,
  tableShowSorterTooltip?: boolean | TooltipProps,
  pos?: string
): ColumnsType<RecordType> {
  return (columns || []).map((column, index) => {
    const columnPos = getColumnPos(index, pos)
    let newColumn: ColumnsType<RecordType>[number] = column

    if (newColumn.sorter) {
      const sortDirections: SortOrder[] =
        newColumn.sortDirections || defaultSortDirections
      const showSorterTooltip =
        newColumn.showSorterTooltip === undefined
          ? tableShowSorterTooltip
          : newColumn.showSorterTooltip
      const columnKey = getColumnKey(newColumn, columnPos)
      const sorterState = sorterStates.find(({ key }) => key === columnKey)
      const sorterOrder = sorterState ? sorterState.sortOrder : null
      const nextSortOrder = nextSortDirection(sortDirections, sorterOrder)
      const upNode: React.ReactNode = sortDirections.includes(ASCEND) && (
        <i
          className={`roo-icon roo-icon-arrow-up ${
            sorterOrder === ASCEND ? 'on' : 'off'
          }`}
        />
      )
      const downNode: React.ReactNode = sortDirections.includes(DESCEND) && (
        <i
          className={`roo-icon roo-icon-arrow-down ${
            sorterOrder === DESCEND ? 'on' : 'off'
          }`}
        />
      )
      const { cancelSort, triggerAsc, triggerDesc } = tableLocale || {}
      let sortTip: string | undefined = cancelSort
      if (nextSortOrder === DESCEND) {
        sortTip = triggerDesc
      } else if (nextSortOrder === ASCEND) {
        sortTip = triggerAsc
      }
      const tooltipProps: Partial<TooltipProps> =
        typeof showSorterTooltip === 'object'
          ? showSorterTooltip
          : { content: sortTip }
      newColumn = {
        ...newColumn,
        className: classNames(newColumn.className, {
          [`${prefixCls}-column-sort`]: sorterOrder,
        }),
        title: (renderProps: ColumnTitleProps<RecordType>) => {
          const renderSortTitle = (
            <div className={`${prefixCls}-column-sorters`}>
              <span className={`${prefixCls}-column-title`}>
                {renderColumnTitle(column.title, renderProps)}
              </span>
              <span
                className={classNames(`${prefixCls}-column-sorter`, {
                  [`${prefixCls}-column-sorter-full`]: !!(upNode && downNode),
                })}
              >
                <span className={`${prefixCls}-column-sorter-inner`}>
                  {upNode}
                  {downNode}
                </span>
              </span>
            </div>
          )
          return showSorterTooltip ? (
            <Tooltip {...tooltipProps}>{renderSortTitle}</Tooltip>
          ) : (
            renderSortTitle
          )
        },
        onHeaderCell: (col) => {
          const cell: React.HTMLAttributes<HTMLElement> =
            (column.onHeaderCell && column.onHeaderCell(col)) || {}
          const originOnClick = cell.onClick
          const originOKeyDown = cell.onKeyDown
          cell.onClick = (event: React.MouseEvent<HTMLElement>) => {
            triggerSorter({
              column,
              key: columnKey,
              sortOrder: nextSortOrder,
              multiplePriority: getMultiplePriority(column),
            })
            originOnClick?.(event)
          }
          cell.onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
            if (event.keyCode === KeyCode.ENTER) {
              triggerSorter({
                column,
                key: columnKey,
                sortOrder: nextSortOrder,
                multiplePriority: getMultiplePriority(column),
              })
              originOKeyDown?.(event)
            }
          }

          // Inform the screen-reader so it can tell the visually impaired user which column is sorted
          if (sorterOrder) {
            cell['aria-sort'] =
              sorterOrder === 'ascend' ? 'ascending' : 'descending'
          } else {
            cell['aria-label'] = `${renderColumnTitle(
              column.title,
              {}
            )} sortable`
          }
          cell.className = classNames(
            cell.className,
            `${prefixCls}-column-has-sorters`
          )
          cell.tabIndex = 0
          if (column.ellipsis) {
            cell.title = (renderColumnTitle(column.title, {}) ?? '').toString()
          }
          return cell
        },
      }
    }

    if ('children' in newColumn) {
      newColumn = {
        ...newColumn,
        children: injectSorter(
          prefixCls,
          newColumn.children,
          sorterStates,
          triggerSorter,
          defaultSortDirections,
          tableLocale,
          tableShowSorterTooltip,
          columnPos
        ),
      }
    }

    return newColumn
  })
}

function stateToInfo<RecordType>(sorterStates: SortState<RecordType>) {
  const { column, sortOrder } = sorterStates
  return {
    column,
    order: sortOrder,
    field: column.dataIndex,
    columnKey: column.key,
  }
}

function generateSorterInfo<RecordType>(
  sorterStates: SortState<RecordType>[]
): SorterResult<RecordType> | SorterResult<RecordType>[] {
  const list = sorterStates
    .filter(({ sortOrder }) => sortOrder)
    .map(stateToInfo)

  // =========== Legacy compatible support ===========
  // https://github.com/ant-design/ant-design/pull/19226
  if (list.length === 0 && sorterStates.length) {
    return {
      ...stateToInfo(sorterStates[sorterStates.length - 1]),
      column: undefined,
    }
  }

  if (list.length <= 1) {
    return list[0] || {}
  }

  return list
}

export function getSortData<RecordType>(
  data: readonly RecordType[],
  sortStates: SortState<RecordType>[],
  childrenColumnName: string
): RecordType[] {
  const innerSorterStates = sortStates
    .slice()
    .sort(
      (a, b) => (b.multiplePriority as number) - (a.multiplePriority as number)
    )

  const cloneData = data.slice()

  const runningSorters = innerSorterStates.filter(
    ({ column: { sorter }, sortOrder }) => getSortFunction(sorter) && sortOrder
  )

  // Skip if no sorter needed
  if (!runningSorters.length) {
    return cloneData
  }

  return cloneData
    .sort((record1, record2) => {
      for (let i = 0; i < runningSorters.length; i += 1) {
        const sorterState = runningSorters[i]
        const {
          column: { sorter },
          sortOrder,
        } = sorterState

        const compareFn = getSortFunction(sorter)

        if (compareFn && sortOrder) {
          const compareResult = compareFn(record1, record2, sortOrder)

          if (compareResult !== 0) {
            return sortOrder === ASCEND ? compareResult : -compareResult
          }
        }
      }

      return 0
    })
    .map<RecordType>((record) => {
      const subRecords = (record as any)[childrenColumnName]
      if (subRecords) {
        return {
          ...record,
          [childrenColumnName]: getSortData(
            subRecords,
            sortStates,
            childrenColumnName
          ),
        }
      }
      return record
    })
}

interface SorterConfig<RecordType> {
  prefixCls: string
  mergedColumns: Column<RecordType>[]
  onSorterChange: (
    sorterResult: SorterResult<RecordType> | SorterResult<RecordType>[],
    sortStates: SortState<RecordType>[]
  ) => void
  sortDirections: SortOrder[]
  tableLocale?: any
  showSorterTooltip?: boolean | TooltipProps
}

export default function useFilterSorter<RecordType>({
  prefixCls,
  mergedColumns,
  onSorterChange,
  sortDirections,
  tableLocale,
  showSorterTooltip,
}: SorterConfig<RecordType>): [
  TransformColumns<RecordType>,
  SortState<RecordType>[],
  ColumnTitleProps<RecordType>,
  () => SorterResult<RecordType> | SorterResult<RecordType>[]
] {
  const [sortStates, setSortStates] = React.useState<SortState<RecordType>[]>(
    collectSortStates(mergedColumns, true)
  )

  const mergedSorterStates = React.useMemo(() => {
    let validate = true
    const collectedStates = collectSortStates(mergedColumns, false)

    // Return if not controlled
    if (!collectedStates.length) {
      return sortStates
    }

    const validateStates: SortState<RecordType>[] = []

    function patchStates(state: SortState<RecordType>) {
      if (validate) {
        validateStates.push(state)
      } else {
        validateStates.push({
          ...state,
          sortOrder: null,
        })
      }
    }

    let multipleMode: boolean | null = null
    collectedStates.forEach((state) => {
      if (multipleMode === null) {
        patchStates(state)

        if (state.sortOrder) {
          if (state.multiplePriority === false) {
            validate = false
          } else {
            multipleMode = true
          }
        }
      } else if (multipleMode && state.multiplePriority !== false) {
        patchStates(state)
      } else {
        validate = false
        patchStates(state)
      }
    })

    return validateStates
  }, [mergedColumns, sortStates])

  // Get render columns title required props
  const columnTitleSorterProps = React.useMemo<any>(() => {
    const sortColumns = mergedSorterStates.map(({ column, sortOrder }) => ({
      column,
      order: sortOrder,
    }))

    return {
      sortColumns,
      // Legacy
      sortColumn: sortColumns[0] && sortColumns[0].column,
      sortOrder: sortColumns[0] && sortColumns[0].order,
    }
  }, [mergedSorterStates])

  function triggerSorter(sortState: SortState<RecordType>) {
    let newSorterStates

    if (
      sortState.multiplePriority === false ||
      !mergedSorterStates.length ||
      mergedSorterStates[0].multiplePriority === false
    ) {
      newSorterStates = [sortState]
    } else {
      newSorterStates = [
        ...mergedSorterStates.filter(({ key }) => key !== sortState.key),
        sortState,
      ]
    }

    setSortStates(newSorterStates)
    onSorterChange(generateSorterInfo(newSorterStates), newSorterStates)
  }

  const transformColumns = (innerColumns: ColumnsType<RecordType>) =>
    injectSorter(
      prefixCls,
      innerColumns,
      mergedSorterStates,
      triggerSorter,
      sortDirections,
      tableLocale,
      showSorterTooltip
    )

  const getSorters = () => generateSorterInfo(mergedSorterStates)

  return [
    transformColumns,
    mergedSorterStates,
    columnTitleSorterProps,
    getSorters,
  ]
}
