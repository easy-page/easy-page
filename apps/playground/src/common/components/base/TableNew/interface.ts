import * as React from 'react'
import { LoadingProps } from '@roo/roo/Loading'
import type { TableProps as RcTableProps } from 'rc-table/lib/Table'
import type {
  FixedType,
  ColumnType as RcColumnType,
  RenderedCell as RcRenderedCell,
  ExpandableConfig,
  GetRowKey,
  RenderedCell,
} from 'rc-table/lib/interface'
import type { PaginationProps } from '@roo/roo/Pagination'
import type { CheckBoxProps } from '@roo/roo/CheckBox'
import type { TooltipProps } from '@roo/roo/Tooltip'

type TablePaginationPosition =
  | 'topLeft'
  | 'topCenter'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomCenter'
  | 'bottomRight'

type Component<P> =
  | React.ComponentType<P>
  | React.ForwardRefExoticComponent<P>
  | React.FC<P>
  | keyof React.ReactHTML

export { GetRowKey, ExpandableConfig }

export type CustomizeComponent = Component<any>

export const tuple = <T extends string[]>(...args: T) => args

const TableActions = tuple('paginate', 'sort', 'filter')
export type TableAction = (typeof TableActions)[number]

export interface TableComponents<T> {
  body?: {
    row?: CustomizeComponent
    cell?: CustomizeComponent
  }
}
export interface TablePaginationConfig extends PaginationProps {
  /**
   * 指定分页显示的位置， 取值为topLeft | topCenter | topRight |bottomLeft | bottomCenter | bottomRight
   * @default [bottomRight]
   */
  position?: TablePaginationPosition[]
}

export type RowSelectionType = 'checkbox' | 'radio'

export type Key = React.Key

export type RowSelectMethod = 'all' | 'none' | 'invert' | 'single' | 'multiple'

export type SelectionItemSelectFn = (currentRowKeys: Key[]) => void

export type ExpandType = null | 'row' | 'nest'

export interface TableLocale {
  filterCheckNotall?: React.ReactNode
  filterTitle?: string
  filterConfirm?: string
  filterReset?: string
  filterEmptyText?: React.ReactNode
  filterCheckall?: React.ReactNode
  filterSearchPlaceholder?: string
  emptyText?: React.ReactNode | (() => React.ReactNode)
  selectAll?: React.ReactNode
  selectNone?: React.ReactNode
  selectInvert?: React.ReactNode
  selectionAll?: React.ReactNode
  sortTitle?: string
  expand?: string
  collapse?: string
  triggerDesc?: string
  triggerAsc?: string
  cancelSort?: string
}

export type SelectionSelectFn<T> = (
  record: T,
  selected: boolean,
  selectedRows: T[],
  nativeEvent: Event
) => void

export type GetPopupContainer = (triggerNode: HTMLElement) => HTMLElement

export type SortOrder = 'descend' | 'ascend' | null

export type FilterValue = (Key | boolean)[]
export type FilterKey = Key[] | null
export type FilterSearchType<RecordType = Record<string, any>> =
  | boolean
  | ((input: string, record: RecordType) => boolean)
export interface FilterConfirmProps {
  closeDropdown: boolean
}

export type CompareFn<T> = (a: T, b: T, sortOrder?: SortOrder) => number

export const SELECTION_COLUMN = {} as const
export const SELECTION_ALL = 'SELECT_ALL' as const
export const SELECTION_INVERT = 'SELECT_INVERT' as const
export const SELECTION_NONE = 'SELECT_NONE' as const

export interface SelectionItem {
  key: string
  text: React.ReactNode
  onSelect?: SelectionItemSelectFn
}
export interface TableCurrentDataSource<RecordType> {
  currentDataSource: RecordType[]
  action: TableAction
}

export type INTERNAL_SELECTION_ITEM =
  | SelectionItem
  | typeof SELECTION_ALL
  | typeof SELECTION_INVERT
  | typeof SELECTION_NONE
export interface ColumnTitleProps<RecordType> {
  /** @deprecated Please use `sorterColumns` instead. */
  sortOrder?: SortOrder
  /** @deprecated Please use `sorterColumns` instead. */
  sortColumn?: ColumnType<RecordType>
  sortColumns?: { column: ColumnType<RecordType>; order: SortOrder }[]

  filters?: Record<string, FilterValue>
}

export type ColumnTitle<RecordType> =
  | React.ReactNode
  | ((props: ColumnTitleProps<RecordType>) => React.ReactNode)

export interface ColumnFilterItem {
  text: React.ReactNode
  value: string | number | boolean
  children?: ColumnFilterItem[]
}

export interface FilterDropdownProps {
  prefixCls: string
  setSelectedKeys: (selectedKeys: React.Key[]) => void
  selectedKeys: React.Key[]
  confirm: (param?: FilterConfirmProps) => void
  clearFilters?: () => void
  filters?: ColumnFilterItem[]
  visible: boolean
}

export interface ColumnType<RecordType>
  extends Omit<RcColumnType<RecordType>, 'title'> {
  title?: ColumnTitle<RecordType>
  // Sorter
  sorter?:
    | boolean
    | CompareFn<RecordType>
    | {
        compare?: CompareFn<RecordType>
        /** Config multiple sorter order priority */
        multiple?: number
      }
  sortOrder?: SortOrder
  defaultSortOrder?: SortOrder
  sortDirections?: SortOrder[]
  showSorterTooltip?: boolean | TooltipProps
  // Filter
  filtered?: boolean
  filters?: ColumnFilterItem[]
  filterDropdown?:
    | React.ReactNode
    | ((props: FilterDropdownProps) => React.ReactNode)
  filterMultiple?: boolean
  filteredValue?: FilterValue | null
  defaultFilteredValue?: FilterValue | null
  filterIcon?: React.ReactNode | ((filtered: boolean) => React.ReactNode)
  filterMode?: 'menu' | 'tree'
  filterSearch?: FilterSearchType<ColumnFilterItem>
  onFilter?: (value: string | number | boolean, record: RecordType) => boolean
  filterDropdownOpen?: boolean
  onFilterDropdownOpenChange?: (open: boolean) => void
  filterResetToDefaultFilteredValue?: boolean
  filterSelectAll?: boolean
  // Responsive
  responsive?: []
}

export type TransformColumns<RecordType> = (
  columns: ColumnsType<RecordType>
) => ColumnsType<RecordType>

export interface ColumnGroupType<RecordType>
  extends Omit<ColumnType<RecordType>, 'dataIndex'> {
  children: ColumnsType<RecordType>
}

export type ColumnsType<RecordType = unknown> = (
  | ColumnGroupType<RecordType>
  | ColumnType<RecordType>
)[]
export interface SorterResult<RecordType> {
  column?: ColumnType<RecordType>
  order?: SortOrder
  field?: Key | readonly Key[]
  columnKey?: Key
}

export interface TableRowSelection<T> {
  /**
   * 自定义列表选择框标题
   * @default -
   */
  columnTitle?: string | React.ReactNode
  /**
   * 自定义列表选择列宽度
   * @default -
   */
  columnWidth?: string | number
  /**
   * 	默认选中项的 key
   * @default []
   */
  defaultSelectedRowKeys?: Key[]
  /**
   * 是否选择列固定在左边
   * @default -
   */
  fixed?: FixedType
  /**
   * 用于配置可选框属性，比如控制指定行是否可选，注意回掉参数中无下标（index）,推荐使用 record 中唯一key进行判断
   * @default -
   */
  getCheckboxProps?: (
    record: T
  ) => Partial<Omit<CheckBoxProps, 'checked' | 'defaultChecked'>>
  /**
   * 隐藏全选勾选框与自定义选择 Node
   * @default false
   */
  hideSelectAll?: boolean
  /**
   * 指定选中项的 key 数组，需要和 onChange 进行配合
   * @default []
   */
  selectedRowKeys?: Key[]
  /**
   * 行可选时，选择框类型支持：checkbox 多选，radio单选。
   * @default checkbox
   */
  type?: RowSelectionType

  /**
   * 当数据被删除时仍然保留选项的 key
   * @default -
   */
  preserveSelectedRowKeys?: boolean
  /**
   * 是否需要选中行样式
   * @default true
   * @version 1.12.18
   */
  isDisplaySelectedRowStyle?: boolean | undefined
  /**
   * 渲染勾选框，对于勾选框进一步改造，如使用ToolTip场景
   * @default -
   */
  renderCell?: (
    checked: boolean,
    record: T,
    index: number,
    originNode: React.ReactNode
  ) => React.ReactNode | RcRenderedCell<T>
  /**
   * 选中项发生变化时的回调
   * @default -
   */
  onChange?: (
    selectedRowKeys: Key[],
    selectedRows: T[],
    info: { type: RowSelectMethod }
  ) => void
  /**
   * 用户手动选择/取消选择某行的回调
   * @default -
   */
  onSelect?: SelectionSelectFn<T>
  checkStrictly?: boolean
}

export interface Expandable<T> {
  /**
   * 指定树形结构的列名
   * @default children
   */
  childrenColumnName?: string
  /**
   * 自定义展开列表头
   * @default -
   */
  columnTitle?: React.ReactNode
  /**
   * 	自定义展开列宽度
   * @default -
   */
  columnWidth?: string | number
  /**
   * 	初始时，是否展开所有行
   * @default false
   */
  defaultExpandAllRows?: boolean
  /**
   * 	默认展开的行
   * @default -
   */
  defaultExpandedRowKeys?: string[]
  /**
   * 	展开行的 className
   * @default -
   */
  expandedRowClassName?: (record: T, index: number, indent: number) => string
  /**
   * 展开行的受控属性
   * @default -
   */
  expandedRowKeys?: string[]
  /**
   * 自定义展开行
   * @default -
   */
  expandedRowRender?: (
    record: T,
    index: number,
    indent: number,
    expanded: boolean
  ) => React.ReactNode
  /**
   * 自定义展开图标
   * @default -
   */
  expandIcon?: (
    expanded: boolean,
    onExpand: React.FC,
    record: T
  ) => React.ReactNode
  /**
   * 通过点击行展开子行
   * @default false
   */
  expandRowByClick?: boolean
  /**
   * 控制展开图标是否固定，可选 true left right
   * @default false
   */
  fixed?: boolean | string
  /**
   * 展示树形数据时，每层缩进的宽度，以 px 为单位
   * @default 15
   */
  indentSize?: number
  /**
   * 设置是否允许行展开
   * @default -
   */
  rowExpandable?: (record: T) => boolean
  /**
   * 设置是否展示行展开列
   * @default true
   */
  showExpandColumn?: boolean
  /**
   * 点击展开图标触发
   * @default -
   */
  onExpand?: (expanded: boolean, record: T) => void
  /**
   * 展开的行变化时触发
   * @default -
   */
  onExpandedRowsChange?: (expandedRows: Array<T>) => void
}
export interface TableProps<T> {
  getPopupContainer?: (...args: any[]) => any
  /**
   * 是否使用边框样式
   * @default false
   */
  bordered?: boolean
  /**
   * 是否使用条纹样式
   * @default false
   * @version 1.12.13
   */
  stripe?: boolean
  /**
   * Table 自定义类名
   * @default -
   */
  className?: string
  /**
   * 列配置项
   * @default -
   */
  columns: Array<Column<T>>
  /**
   * Table 覆盖默认的 table 元素
   * @default -
   */
  components?: TableComponents<T>
  /**
   * 表格数据源
   * @default []
   */
  data: T[]
  /**
   * 配置展开属性, 配置项见下方 expandable
   * @default -
   */
  expandable?: ExpandableConfig<T> | Expandable<T>
  /**
   * 无数据时展示内容
   * @default 暂无数据
   */
  emptyComponent?: string | React.ReactNode | (() => React.ReactNode)
  /**
   * 表格尾部
   * @default -
   */
  footer?: (currentPageData: any) => string | React.ReactNode
  /**
   * 是否需要hover效果
   * @default false
   */
  hover?: boolean
  /**
   * 是否需要loading效果, 支持Loading组件Props传入
   * @default false
   */
  loading?: boolean | LoadingProps

  /**
   * Table 自定义类名
   * @default -
   */
  rowClassName?: (record: T, index: number) => string
  /**
   * Table 内联样式
   * @default -
   */
  style?: React.CSSProperties
  /**
   * 是否显示表头
   * @default true
   */
  showHeader?: boolean
  /**
   * 表格标题
   * @default -
   */
  title?: (currentPageData: any) => string | React.ReactNode
  /**
   * 分页器，参考配置项或 pagination 文档，设为 false 时不展示和进行分页
   * @default -
   */
  pagination?: TablePaginationConfig
  /**
   * 表格行是否可选择, 配置项见下方 TableRowSelection
   * @default -
   */
  rowSelection?: TableRowSelection<T>
  /**
   * 用于获取每行数据唯一key, 表格行 key 的取值
   * @default key
   */
  rowKey?: ((record: T, index: number) => string) | string
  /**
   * 设置粘性头部和滚动条
   * @default -
   */
  sticky?:
    | boolean
    | {
        offsetHeader?: number
        offsetScroll?: number
        getContainer?: () => HTMLElement
      }
  /**
   * 表格是否可滚动，也可以指定滚动区域的宽、高
   * @default -
   */
  scroll?: RcTableProps<T>['scroll'] & { scrollToFirstRowOnChange?: boolean }
  /**
   * 表头是否显示排序的 tooltip 提示。当参数类型为对象时，将被设置为 Tooltip 组件的属性
   * @default false
   */
  showSorterTooltip?: boolean | TooltipProps
  /**
   * 排序变化时触发
   * @default -
   */
  onChange?: (
    sorter: SorterResult<T> | SorterResult<T>[],
    extra: TableCurrentDataSource<T>,
    filters: Record<string, FilterValue | null>
  ) => void
  /**
   * 设置头部行属性
   * @default -
   */
  onHeaderRow?: (record: T, index: number) => object
  /**
   * 设置行属性
   * @default -
   */
  onRow?: (record: T, index: number) => any
  /**
   * 表格列设置属性，默认值为false，设置为true时开启setConfig默认配置开启表格列拖拽排序/显示隐藏，可自定义配置覆盖默认配置
   * @version 1.12.31
   * @default false
   */
  setConfig?: boolean | SetConfig<T>
}

export interface Column<T> {
  /**
   * 列对其方式
   * @default left
   */
  align?: 'left' | 'right' | 'center'
  /**
   * 子数据项
   * @default -
   */
  children?: Column<any>[]
  /**
   * 列合并,设置为 0 时，不渲染
   * @default -
   */
  colSpan?: number
  /**
   * 列样式类名
   * @default -
   */
  className?: string
  /**
   * 列数据在数据项中对应的路径，支持通过数组查询嵌套路径
   * @default -
   */
  dataIndex: string | string[]
  /**
   *  默认排序顺序
   * @default -
   */
  defaultSortOrder?: SortOrder
  /**
   * 超过宽度将自动省略。设置为 true 或 { showTitle?: boolean } 时，表格布局将变成 tableLayout="fixed"。设置ellipsis的column需要宽度。
   * @default false
   */
  ellipsis?: boolean | { showTitle?: boolean }
  /**
   * 是否可编辑
   * @default false
   */
  editable?: boolean
  /**
   * React 需要的 key，如果已经设置了唯一的 dataIndex，可以忽略这个属性
   * @default -
   */
  key?: string
  /**
   * 列固定，可选 true (等效于 left) 或者 left / right
   * @default false
   */
  fixed?: boolean | string
  /**
   * 列宽度
   * @default -
   */
  width?: number | string
  /**
   * 列头显示文字
   * @default -
   */
  title:
    | React.ReactNode
    | (({ sortOrder, sortColumn, filters }: any) => React.ReactNode)
  /**
   * 表头显示排序的 tooltip 提示, 覆盖 table 中 showSorterTooltip
   * @default false
   */
  showSorterTooltip?: boolean | TooltipProps
  /**
   * 支持的排序方式
   * @default [ascend, descend]
   */
  sortDirections?: SortOrder[]
  /**
   * 排序函数，本地排序使用一个函数，需要服务端排序可设为 true
   * @default [ascend, descend]
   */
  sorter?:
    | boolean
    | CompareFn<T>
    | { compare?: CompareFn<T>; multiple?: number }
  /**
   * 排序的受控属性，外界可用此控制列的排序
   * @default -
   */
  sortOrder?: 'ascend' | 'descend' | 'null'
  /**
   * 自定义表格渲染，text：渲染内容，record：每行记录，index：行的索引
   * @default -
   */
  render?: (
    text: any,
    record: T,
    index: number
  ) => React.ReactNode | RenderedCell<any>
  /**
   * 设置单元格属性
   * @default -
   */
  onCell?: (record: T, rowIndex: number) => Object
  /**
   * 设置头部单元格属性
   * @default -
   */
  onHeaderCell?: (record: T) => Object
  /**
   * 控制该列不可进行列操作， 默认为false
   * @version 1.12.31
   * @default false
   */
  setDisabled?: boolean

  /**
   * 表头的筛选菜单数据
   * @version 1.12.32
   * @default -
   */
  filters?: ColumnFilterItem[]
  /**
   * 筛选是否多选
   * @version 1.12.32
   * @default true
   */
  filterMultiple?: boolean
  /**
   * 本地模式下，数据筛选规则，返回 true 展示
   * @version 1.12.32
   * @default -
   */
  onFilter?: (value: any, record: T) => boolean
  /**
   * 自定义 filter 图标
   * @version 1.12.32
   * @default -
   */
  filterIcon?: React.ReactNode | ((filtered: boolean) => React.ReactNode)
  /**
   * 开启筛选项搜索
   * @version 1.12.32
   * @default false
   */
  filterSearch?: boolean
  /**
   * 自定义筛选菜单展示、隐藏变化时调用
   * @version 1.12.32
   * @default -
   */
  onFilterDropdownOpenChange?: (open: boolean) => void
  /**
   * 自定义筛选菜单是否展示
   * @version 1.12.32
   * @default -
   */
  filterDropdownOpen?: boolean
  /**
   * 自定义筛选菜单面板，只负责渲染图层
   * @version 1.12.32
   * @default -
   */
  filterDropdown?:
    | React.ReactNode
    | ((props: FilterDropdownProps) => React.ReactNode)
  /**
   * 筛选的受控属性，设置已筛选的 value 数组
   * @version 1.12.32
   * @default -
   */
  filteredValue?: string[]
  /**
   * 数据是否经过过滤，筛选图标会高亮
   * @version 1.12.32
   * @default false
   */
  filtered?: boolean
  /**
   * 点击重置按钮的时候，是否恢复默认筛选值
   * @version 1.12.32
   * @default false
   */
  filterResetToDefaultFilteredValue?: boolean
  /**
   * 默认筛选值
   * @version 1.12.32
   * @default -
   */
  defaultFilteredValue?: string[]
  /**
   * 是否展示全选按钮，在 filterMultiple 为 true 时有效
   * @version 1.12.32
   * @default true
   */
  filterSelectAll?: boolean
}

export interface SetData {
  dataIndex: string
  show: boolean
  fixed?: string | boolean
}

export interface SetConfig<T> {
  /**
   * 类名
   * @version 1.12.31
   * @default
   */
  className?: string
  /**
   * 表格列的受控的属性，可以操作显示隐藏与拖拽顺序
   * @version 1.12.31
   * @default
   */
  value?: SetData[]
  /**
   * 开启动态固定列功能，设置true时可开启固定左侧固定右侧功能，设置'left'、'right'仅开启对应方向的固定列功能
   * @version 1.12.31
   * @default
   */
  fixed: string | boolean
  /**
   * 开启动列拖拽功能
   * @version 1.12.31
   * @default
   */
  dragable: boolean
  /**
   * 自定义icon列设置icon
   * @version 1.12.31
   * @default
   */
  iconRender?: () => React.ReactNode | React.ReactNode[]
  /**
   * 隐藏左侧固定栏
   * @version 1.12.31
   * @default
   */
  hiddenLeft?: boolean
  /**
   * 隐藏右侧固定栏
   * @version 1.12.31
   * @default
   */
  hiddenRight?: boolean
  /**
   * 列设置改变时回调
   * @version 1.12.31
   * @default
   */
  onChange?: (value: SetData[], columns: Array<Column<T>>) => void
}
