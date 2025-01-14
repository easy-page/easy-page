import * as React from 'react'
import classNames from 'classnames'
import Loading, { LoadingProps } from '@roo/roo/Loading'
import Pagination from '@roo/roo/Pagination'
import omit from 'lodash/omit'
import { isFunction } from '@utiljs/is'
import Table from 'rc-table'
import type { TableProps as RcTableProps } from 'rc-table/lib/Table'
import locale from './utils/locale'
import { ConfigContext } from './utils/context'
import scrollTo from './utils/scrollTo'
import {
  TableProps,
  ExpandType,
  ExpandableConfig,
  GetRowKey,
  SorterResult,
  FilterValue,
  TableAction,
  ColumnsType,
  ColumnTitleProps,
  Column,
  SetData,
} from './interface'
import { handleSortColumns } from './util'
import useSelection from './hooks/useSelection'
import useLazyKVMap from './hooks/useLazyKVMap'

import useFilter, { getFilterData } from './hooks/useFilter'
import type { SortState } from './hooks/useSorter'
import useSorter, { getSortData } from './hooks/useSorter'
import useTitleColumns from './hooks/useTitleColumns'
import renderExpandIcon from './ExpandIcon'
import ColumnsSet from './ColumnsSet'
import { FilterState } from './hooks/useFilter/interface'

const INTERNAL_HOOKS = 'rc-table-internal-hook'

interface RecordType {
  key: string
}
interface ChangeEventInfo<RecordType> {
  pagination: {
    current?: number
    pageSize?: number
    total?: number
  }
  filters: Record<string, FilterValue | null>
  sorter: SorterResult<RecordType> | SorterResult<RecordType>[]
  filterStates: FilterState<RecordType>[]
  sorterStates: SortState<RecordType>[]
  resetPagination: Function
}

type TextAlignPosition =
  | 'start'
  | 'end'
  | 'left'
  | 'right'
  | 'center'
  | 'justify'
  | 'match-parent'

function InternalTableNew<RecordType extends object = any>(
  props: TableProps<RecordType>,
  ref: React.MutableRefObject<HTMLDivElement>
) {
  const {
    className,
    style,
    bordered,
    hover,
    columns,
    data,
    loading,
    pagination,
    emptyComponent,
    rowClassName,
    rowKey = 'key',
    scroll,
    rowSelection,
    expandable,
    onChange,
    stripe,
    getPopupContainer, // 设置表格内各类浮层的渲染节点，如筛选菜单
    showSorterTooltip = false,
    setConfig = false,
  } = props
  // 原始表格数据
  /* istanbul ignore next */
  const rawData: readonly RecordType[] = data || []
  // 展开数据合并
  const mergedExpandable: any = { ...expandable }
  // 展开数据的子节点key
  const { childrenColumnName = 'children' } =
    mergedExpandable as ExpandableConfig<RecordType>
  // 展开类型（nest/row）
  const expandType = React.useMemo<ExpandType>(() => {
    // 表格数据中存在子节点key 展示网状
    if (rawData.some((item) => (item as any)?.[childrenColumnName]))
      return 'nest'
    // 或者有展开函数 expandedRowRender 使用行展示
    if (expandable && expandable.expandedRowRender) return 'row'
    // 都没有时不进行展开
    return null
  }, [rawData])
  // table 的 dom
  const internalRefs = { body: React.useRef<HTMLDivElement>() }
  // 处理后的 columns
  //   const baseColumns = React.useMemo(() => columns, [columns]);
  const [baseColumns, setBaseColumns] = React.useState(columns)
  // 该处处理响应式，暂不使用，先注释
  // const needResponsive = React.useMemo(
  //   () => baseColumns.some((col: any) => col.responsive),
  //   [baseColumns],
  // );
  // const screens = useBreakpoint(needResponsive);
  // Columns列初始化处理
  const mergedColumns = React.useMemo(() => {
    // 该处处理响应式，暂不使用，先注释
    // const matched = new Set(Object.keys(screens).filter((m: Breakpoint) => screens[m]));
    // 过滤响应式页面？？
    return baseColumns.filter((c: any) => !c.responsive)
  }, [baseColumns])
  // 获取行 key
  const getRowKey = React.useMemo<GetRowKey<RecordType>>(() => {
    // 传入函数直接使用
    if (typeof rowKey === 'function') {
      return rowKey as GetRowKey<RecordType>
    }
    // 传入字符串，获取data的对应值返回
    return (record: RecordType) => (record as any)?.[rowKey as string]
  }, [rowKey])
  // 通过key拿到对应的record【将 data 数据根据 rowKey 转化为Map结构。 例： { record[rowKey]: record }，key为rowKey对应的value，value: rowKey对应的 record】
  const [getRecordByKey] = useLazyKVMap(rawData, childrenColumnName, getRowKey)

  // ============================ Events =============================
  const changeEventInfo: Partial<ChangeEventInfo<RecordType>> = {}
  const triggerOnChange = (
    info: Partial<ChangeEventInfo<RecordType>>,
    action: TableAction,
    /* istanbul ignore next */
    reset = false
  ) => {
    const changeInfo = { ...changeEventInfo, ...info }
    // 分页事件处理，暂不使用，注释
    // if (reset) {
    //   changeEventInfo.resetPagination!();
    //   // Reset event param
    //   if (changeInfo.pagination!.current) {
    //     changeInfo.pagination!.current = 1;
    //   }
    //   // Trigger pagination events
    //   if (pagination && pagination.onChange) {
    //     pagination.onChange(1, changeInfo.pagination!.pageSize!);
    //   }
    // }

    if (
      scroll &&
      scroll.scrollToFirstRowOnChange !== false &&
      internalRefs.body.current
    ) {
      scrollTo(0, {
        getContainer: () => internalRefs.body.current!,
      })
    }

    onChange?.(
      changeInfo.sorter!,
      {
        currentDataSource: getFilterData(
          getSortData(rawData, changeInfo.sorterStates!, childrenColumnName),
          changeInfo.filterStates!
        ),
        action,
      },
      changeInfo.filters!
    )
  }

  // 获取公共样式前缀
  const { getPrefixCls } = React.useContext(ConfigContext)
  const prefixCls = getPrefixCls('tableNew')
  const dropdownPrefixCls = getPrefixCls('tableNew-filter-dropdown')
  const wrapperClassNames = classNames(`${prefixCls}-wrapper`, className)
  const tableProps = omit(props, [
    'className',
    'style',
    'columns',
  ]) as TableProps<RecordType>

  // ============================ Sorter =============================
  const onSorterChange = (
    sorter: SorterResult<RecordType> | SorterResult<RecordType>[],
    sorterStates: SortState<RecordType>[]
  ) => {
    triggerOnChange({ sorter, sorterStates }, 'sort', false)
  }

  const [transformSorterColumns, sortStates, sorterTitleProps, getSorters] =
    useSorter<RecordType>({
      prefixCls,
      mergedColumns,
      onSorterChange,
      sortDirections: ['ascend', 'descend'],
      tableLocale: {
        cancelSort: locale.lng('Table.cancelSort'),
        triggerAsc: locale.lng('Table.triggerAsc'),
        triggerDesc: locale.lng('Table.triggerDesc'),
      },
      showSorterTooltip,
    })

  const sortedData = React.useMemo(
    () => getSortData(rawData, sortStates, childrenColumnName),
    [rawData, sortStates]
  )

  changeEventInfo.sorter = getSorters()
  changeEventInfo.sorterStates = sortStates

  // ============================ Filter ============================
  const onFilterChange = (
    filters: Record<string, FilterValue>,
    filterStates: FilterState<RecordType>[]
  ) => {
    triggerOnChange({ filters, filterStates }, 'filter', true)
  }

  const [transformFilterColumns, filterStates, filters] = useFilter<RecordType>(
    {
      prefixCls,
      locale: {
        filterSearchPlaceholder: locale.lng('Table.filterSearchPlaceholder'),
        filterReset: locale.lng('Table.filterReset'),
        filterConfirm: locale.lng('Table.filterConfirm'),
        filterCheckall: locale.lng('Table.filterCheckall'),
        filterCheckNotall: locale.lng('Table.filterCheckNotall'),
        filterEmptyText: locale.lng('Table.filterEmptyText'),
      },
      dropdownPrefixCls,
      mergedColumns: mergedColumns as any,
      onFilterChange: onFilterChange as any,
      getPopupContainer,
    }
  )

  // 排序及筛选数据合并
  const mergedData = getFilterData(sortedData, filterStates)

  changeEventInfo.filters = filters
  changeEventInfo.filterStates = filterStates

  // ============================ Column ============================
  const columnTitleProps = React.useMemo<ColumnTitleProps<RecordType>>(() => {
    const mergedFilters: Record<string, FilterValue> = {}
    Object.keys(filters).forEach((filterKey) => {
      if (filters[filterKey] !== null) {
        mergedFilters[filterKey] = filters[filterKey]!
      }
    })
    return {
      ...sorterTitleProps,
      filters: mergedFilters,
    }
  }, [sorterTitleProps, filters])

  const [transformTitleColumns] = useTitleColumns(columnTitleProps)

  // ========================== Selections ==========================
  const [transformSelectionColumns, selectedKeySet] = useSelection<RecordType>(
    rowSelection,
    {
      prefixCls,
      data: mergedData,
      pageData: mergedData,
      getRowKey,
      getRecordByKey,
      expandType,
      childrenColumnName,
      locale: {},
      getPopupContainer,
    }
  )

  // ========================== Expandable ==========================
  ;(mergedExpandable as any).__PARENT_RENDER_ICON__ =
    mergedExpandable.expandIcon

  mergedExpandable.expandIcon =
    mergedExpandable.expandIcon || renderExpandIcon()

  if (typeof mergedExpandable.indentSize !== 'number') {
    mergedExpandable.indentSize = 15
  }

  // 行样式
  const internalRowClassName = (
    record: RecordType,
    index: number,
    indent: number
  ) => {
    let mergedRowClassName: string
    if (typeof rowClassName === 'function') {
      mergedRowClassName = classNames(rowClassName(record, index))
    } else {
      mergedRowClassName = classNames(rowClassName)
    }
    // 行可选自定义是否展示选中样式，默认展示样式
    const isDisplaySelectedRowStyle =
      rowSelection && rowSelection.isDisplaySelectedRowStyle !== undefined
        ? rowSelection.isDisplaySelectedRowStyle
        : true
    return classNames(
      {
        [`${prefixCls}-row-selected`]:
          selectedKeySet.has(getRowKey(record, index)) &&
          isDisplaySelectedRowStyle,
      },
      mergedRowClassName,
      { [`${prefixCls}-row--even`]: index % 2 === 1 }
    )
  }

  // Table Loading
  let loadingProps: LoadingProps | undefined
  if (typeof loading === 'boolean') {
    loadingProps = { visible: loading }
  } else if (typeof loading === 'object') {
    loadingProps = { visible: true, ...loading }
  }

  // Table emptyComponent
  const renderEmptyComponent = () => {
    if (!emptyComponent) return locale.lng('Table.noData')
    return (
      <div style={style}>
        {isFunction(emptyComponent) ? emptyComponent() : emptyComponent}
      </div>
    )
  }
  // column改变，定义渲染行
  const transformColumns = React.useCallback(
    (innerColumns: ColumnsType<RecordType>): ColumnsType<RecordType> => {
      return transformTitleColumns(
        transformSelectionColumns(
          transformFilterColumns(transformSorterColumns(innerColumns))
        )
      )
    },
    [transformSorterColumns, transformFilterColumns, transformSelectionColumns]
  )

  const handleChangeValue = (value: SetData[]) => {
    if (!setConfig) return
    const data: Array<Column<RecordType>> = []
    value.forEach((item) => {
      const itemData = columns.find((i) => i.dataIndex === item.dataIndex)
      if (itemData && item.show) {
        data.push({
          ...itemData,
          fixed: item.fixed,
        })
      }
    })
    setBaseColumns(data)
    if (typeof setConfig !== 'boolean') {
      setConfig.onChange && setConfig?.onChange(value, data)
    }
  }

  React.useEffect(() => {
    setBaseColumns(handleSortColumns(columns as any) as any)
  }, [columns])

  // Table pagination
  let topPaginationNode: React.ReactNode
  let bottomPaginationNode: React.ReactNode
  if ((pagination as any) !== false && pagination?.total) {
    const renderPagination = (position: TextAlignPosition) => (
      <div style={{ textAlign: `${position}` }}>
        <Pagination {...pagination} />
      </div>
    )
    const defaultPosition = 'right'
    const { position } = pagination
    if (position !== null && Array.isArray(position)) {
      const topPos = position.find((p) => p.indexOf('top') !== -1)
      const bottomPos = position.find((p) => p.indexOf('bottom') !== -1)
      const isDisable = position.every((p) => `${p}` === 'none')
      if (!topPos && !bottomPos && !isDisable) {
        bottomPaginationNode = renderPagination(defaultPosition)
      }
      if (topPos) {
        topPaginationNode = renderPagination(
          topPos!.toLowerCase().replace('top', '') as TextAlignPosition
        )
      }
      if (bottomPos) {
        bottomPaginationNode = renderPagination(
          bottomPos!.toLowerCase().replace('bottom', '') as TextAlignPosition
        )
      }
    } else {
      bottomPaginationNode = renderPagination(defaultPosition)
    }
  }

  return (
    <div ref={ref} className={wrapperClassNames} style={style}>
      <Loading visible={false} {...loadingProps}>
        {topPaginationNode}
        {setConfig ? (
          <ColumnsSet
            onChange={handleChangeValue}
            popupContainer={ref?.current}
            setConfig={setConfig}
            columns={columns as any}
            prefixCls={prefixCls}
          />
        ) : null}
        <Table
          {...(tableProps as any)}
          className={classNames({
            [`${prefixCls}-bordered`]: bordered,
            [`${prefixCls}-hover`]: hover,
            [`${prefixCls}-empty`]: mergedData.length === 0,
            [`${prefixCls}-stripe`]: stripe,
          })}
          expandable={mergedExpandable}
          emptyText={renderEmptyComponent}
          rowClassName={internalRowClassName}
          prefixCls={prefixCls}
          columns={mergedColumns as RcTableProps<RecordType>['columns']}
          data={mergedData as any}
          rowKey={getRowKey}
          internalHooks={INTERNAL_HOOKS}
          internalRefs={internalRefs as any}
          transformColumns={
            transformColumns as unknown as RcTableProps<RecordType>['transformColumns']
          }
        />
        {bottomPaginationNode}
      </Loading>
    </div>
  )
}

const TableNew = React.forwardRef(InternalTableNew as any) as <
  RecordType extends object = any
>(
  props: React.PropsWithChildren<TableProps<RecordType>> & {
    ref?: React.Ref<HTMLDivElement>
  }
) => React.ReactElement

export default TableNew
