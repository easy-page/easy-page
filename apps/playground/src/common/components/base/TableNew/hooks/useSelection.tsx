import { INTERNAL_COL_DEFINE } from 'rc-table'
import type { FixedType } from 'rc-table/lib/interface'
import useMergedState from 'rc-util/lib/hooks/useMergedState'
import * as React from 'react'
import { useCallback, useMemo, useState } from 'react'
import type { CheckBoxProps } from '@roo/roo/CheckBox'
import Checkbox from '@roo/roo/CheckBox'
import Radio from '@roo/roo/Radio'
import warning from 'warning'
import type {
  ColumnsType,
  ColumnType,
  ExpandType,
  GetPopupContainer,
  GetRowKey,
  Key,
  RowSelectMethod,
  SelectionItem,
  TableRowSelection,
  TransformColumns,
} from '../interface'

export const SELECTION_COLUMN = {} as const
export const SELECTION_ALL = 'SELECT_ALL' as const
export const SELECTION_INVERT = 'SELECT_INVERT' as const
export const SELECTION_NONE = 'SELECT_NONE' as const
export type INTERNAL_SELECTION_ITEM =
  | SelectionItem
  | typeof SELECTION_ALL
  | typeof SELECTION_INVERT
  | typeof SELECTION_NONE

const EMPTY_LIST: React.Key[] = []

interface UseSelectionConfig<RecordType> {
  prefixCls: string
  pageData: RecordType[]
  data: RecordType[]
  getRowKey: GetRowKey<RecordType>
  getRecordByKey: (key: Key) => RecordType
  expandType: ExpandType
  childrenColumnName: string
  locale: any
  getPopupContainer?: GetPopupContainer
}

function arrDel(list: Key[], value: Key) {
  if (!list) return []
  const clone = list.slice()
  const index = clone.indexOf(value)
  if (index >= 0) {
    clone.splice(index, 1)
  }
  return clone
}

function arrAdd(list: Key[], value: Key) {
  const clone = (list || []).slice()
  if (clone.indexOf(value) === -1) {
    clone.push(value)
  }
  return clone
}

function flattenData<RecordType>(
  data: RecordType[] | undefined,
  childrenColumnName: string
): RecordType[] {
  let list: RecordType[] = []
  ;(data || []).forEach((record) => {
    list.push(record)

    if (record && typeof record === 'object' && childrenColumnName in record) {
      list = [
        ...list,
        ...flattenData<RecordType>(
          (record as any)[childrenColumnName],
          childrenColumnName
        ),
      ]
    }
  })

  return list
}

export default function useSelection<RecordType>(
  rowSelection: TableRowSelection<RecordType> | undefined,
  config: UseSelectionConfig<RecordType>
): [TransformColumns<RecordType>, Set<Key>] {
  const {
    preserveSelectedRowKeys,
    selectedRowKeys,
    defaultSelectedRowKeys,
    getCheckboxProps,
    onChange: onSelectionChange,
    onSelect,
    columnWidth: selectionColWidth,
    type: selectionType,
    fixed,
    renderCell: customizeRenderCell,
    hideSelectAll, // 隐藏全选勾选框与自定义选择项
    checkStrictly = true,
  } = rowSelection || {}

  const {
    prefixCls,
    data,
    pageData,
    getRecordByKey,
    getRowKey,
    expandType,
    childrenColumnName,
  } = config
  // 选中项的rowKey初始化
  const [mergedSelectedKeys, setMergedSelectedKeys] = useMergedState(
    selectedRowKeys || defaultSelectedRowKeys || EMPTY_LIST,
    { value: selectedRowKeys }
  )
  // 实现 preserveSelectedRowKeys API,缓存选中的项的key及对应的record
  const preserveRecordsRef = React.useRef(new Map<Key, RecordType>())
  // 更新缓存中选中项数据
  const updatePreserveRecordsCache = useCallback(
    (keys: Key[]) => {
      if (preserveSelectedRowKeys) {
        const newCache = new Map<Key, RecordType>()
        // Keep key if mark as preserveSelectedRowKeys
        keys.forEach((key) => {
          let record = getRecordByKey(key)
          if (!record && preserveRecordsRef.current.has(key)) {
            record = preserveRecordsRef.current.get(key)!
          }
          newCache.set(key, record)
        })
        // Refresh to new cache
        preserveRecordsRef.current = newCache
      }
    },
    [getRecordByKey, preserveSelectedRowKeys]
  )

  React.useEffect(() => {
    updatePreserveRecordsCache(mergedSelectedKeys)
  }, [mergedSelectedKeys])

  // checkable 状态下节点选择完全受控（父子数据选中状态不再关联）
  const { keyEntities } = useMemo(
    () => (checkStrictly ? { keyEntities: null } : {}),
    // convertDataToEntities(data as unknown as DataNode[], {
    //     externalGetKey: getRowKey as any,
    //     childrenPropName: childrenColumnName,
    //   }),
    [data, getRowKey, checkStrictly, childrenColumnName]
  )

  // data数据拉平处理（包含children的情况）
  const flattedData = useMemo(
    () => flattenData(pageData, childrenColumnName),
    [pageData, childrenColumnName]
  )
  // 获取 checkbox 所有的props
  const checkboxPropsMap = useMemo(() => {
    const map = new Map<Key, Partial<CheckBoxProps>>()
    flattedData.forEach((record, index) => {
      const key = getRowKey(record, index)
      // 选择框的默认属性设置。实现 getCheckboxProps API (对于当前行checkBox属性记录)
      const checkboxProps =
        (getCheckboxProps ? getCheckboxProps(record) : null) || {}
      map.set(key, checkboxProps)
    })
    return map
  }, [flattedData, getRowKey, getCheckboxProps])

  // 判断当前key的 checkbox 是否禁用
  const isCheckboxDisabled: any = useCallback(
    (r: RecordType) => !!checkboxPropsMap.get(getRowKey(r))?.disabled,
    [checkboxPropsMap, getRowKey]
  )
  // TODO 待理解
  const [derivedSelectedKeys, derivedHalfSelectedKeys] = useMemo(() => {
    return [mergedSelectedKeys || [], []]
  }, [mergedSelectedKeys, checkStrictly, keyEntities, isCheckboxDisabled])

  // 完全选中项的key set集合，区分单选及多选
  const derivedSelectedKeySet: Set<Key> = useMemo(() => {
    const keys =
      selectionType === 'radio'
        ? derivedSelectedKeys.slice(0, 1)
        : derivedSelectedKeys
    return new Set(keys)
  }, [derivedSelectedKeys, selectionType])

  // 半选项的key set集合，区分单选及多选
  const derivedHalfSelectedKeySet = useMemo(
    () =>
      selectionType === 'radio' ? new Set() : new Set(derivedHalfSelectedKeys),
    [derivedHalfSelectedKeys, selectionType]
  )

  // Save last selected key to enable range selection
  const [lastSelectedKey, setLastSelectedKey] = useState<Key | null>(null)

  // Reset if rowSelection reset
  React.useEffect(() => {
    if (!rowSelection) {
      setMergedSelectedKeys(EMPTY_LIST)
    }
  }, [!!rowSelection])

  const setSelectedKeys = useCallback(
    (keys: Key[], method: RowSelectMethod) => {
      let availableKeys: Key[]
      let records: RecordType[]
      updatePreserveRecordsCache(keys)
      if (preserveSelectedRowKeys) {
        availableKeys = keys
        records = keys.map((key) => preserveRecordsRef.current.get(key)!)
      } else {
        // Filter key which not exist in the `dataSource`
        availableKeys = []
        records = []
        keys.forEach((key) => {
          const record = getRecordByKey(key)
          if (record !== undefined) {
            availableKeys.push(key)
            records.push(record)
          }
        })
      }
      setMergedSelectedKeys(availableKeys)
      onSelectionChange?.(availableKeys, records, { type: method })
    },
    [
      setMergedSelectedKeys,
      getRecordByKey,
      onSelectionChange,
      preserveSelectedRowKeys,
    ]
  )

  // ====================== Selections ======================
  // Trigger single `onSelect` event
  const triggerSingleSelection = useCallback(
    (key: Key, selected: boolean, keys: Key[], event: Event) => {
      if (onSelect) {
        const rows = keys.map((k) => getRecordByKey(k))
        onSelect(getRecordByKey(key), selected, rows, event)
      }

      setSelectedKeys(keys, 'single')
    },
    [onSelect, getRecordByKey, setSelectedKeys]
  )

  // 自定义 selections 操作，暂不支持
  const mergedSelections = useMemo<SelectionItem[] | null>(() => {
    return []
  }, [])

  // ======================= Columns ========================
  const transformColumns = useCallback(
    (columns: ColumnsType<RecordType>): ColumnsType<RecordType> => {
      if (!rowSelection) {
        warning(
          !columns.includes(SELECTION_COLUMN),
          'Table',
          '`rowSelection` is not config but `SELECTION_COLUMN` exists in the `columns`.'
        )
        return columns.filter((col) => col !== SELECTION_COLUMN)
      }

      let cloneColumns = [...columns]
      const keySet = new Set(derivedSelectedKeySet)

      // Record key only need check with enabled
      const recordKeys = flattedData
        .map(getRowKey)
        .filter((key) => !checkboxPropsMap.get(key)!.disabled)
      const checkedCurrentAll = recordKeys.every((key) => keySet.has(key))
      const checkedCurrentSome = recordKeys.some((key) => keySet.has(key))

      const onSelectAllChange = () => {
        const changeKeys: Key[] = []

        if (checkedCurrentAll) {
          recordKeys.forEach((key) => {
            keySet.delete(key)
            changeKeys.push(key)
          })
        } else {
          recordKeys.forEach((key) => {
            if (!keySet.has(key)) {
              keySet.add(key)
              changeKeys.push(key)
            }
          })
        }
        const keys = Array.from(keySet)
        setSelectedKeys(keys, 'all')
        setLastSelectedKey(null)
      }

      // ===================== Render =====================
      // Title Cell
      let title: React.ReactNode
      if (selectionType !== 'radio') {
        const allDisabledData = flattedData
          .map((record, index) => {
            const key = getRowKey(record, index)
            const checkboxProps = checkboxPropsMap.get(key) || {}
            return { checked: keySet.has(key), ...checkboxProps }
          })
          .filter(({ disabled }) => disabled)

        const allDisabled =
          !!allDisabledData.length &&
          allDisabledData.length === flattedData.length

        const allDisabledAndChecked =
          allDisabled && allDisabledData.every(({ checked }) => checked)
        const allDisabledSomeChecked =
          allDisabled && allDisabledData.some(({ checked }) => checked)

        title = !hideSelectAll && (
          <div className={`${prefixCls}-selection`}>
            <Checkbox
              checked={
                !allDisabled
                  ? !!flattedData.length && checkedCurrentAll
                  : allDisabledAndChecked
              }
              indeterminate={
                !allDisabled
                  ? !checkedCurrentAll && checkedCurrentSome
                  : !allDisabledAndChecked && allDisabledSomeChecked
              }
              onChange={onSelectAllChange}
              disabled={flattedData.length === 0 || allDisabled}
            />
          </div>
        )
      }

      // Body Cell
      let renderCell: (
        _: RecordType,
        record: RecordType,
        index: number
      ) => { node: React.ReactNode; checked: boolean }
      if (selectionType === 'radio') {
        renderCell = (_, record, index) => {
          const key = getRowKey(record, index)
          const checked = keySet.has(key)

          return {
            node: (
              <Radio
                {...checkboxPropsMap.get(key)}
                checked={checked}
                // onClick={e => e.stopPropagation()}
                onChange={(event) => {
                  if (!keySet.has(key)) {
                    triggerSingleSelection(key, true, [key], event.nativeEvent)
                  }
                }}
              />
            ),
            checked,
          }
        }
      } else {
        renderCell = (_, record, index) => {
          const key = getRowKey(record, index)
          const checked = keySet.has(key)
          const indeterminate = derivedHalfSelectedKeySet.has(key)
          const checkboxProps = checkboxPropsMap.get(key)
          let mergedIndeterminate: boolean
          if (expandType === 'nest') {
            mergedIndeterminate = indeterminate
            warning(
              typeof checkboxProps?.indeterminate !== 'boolean',
              'Table',
              'set `indeterminate` using `rowSelection.getCheckboxProps` is not allowed with tree structured dataSource.'
            )
          } else {
            mergedIndeterminate = checkboxProps?.indeterminate ?? indeterminate
          }
          // Record checked
          return {
            node: (
              <Checkbox
                {...checkboxProps}
                indeterminate={mergedIndeterminate}
                checked={checked}
                onChange={({ nativeEvent }) => {
                  const { shiftKey } = nativeEvent as any
                  let startIndex = -1
                  let endIndex = -1
                  // Get range of this
                  if (shiftKey && checkStrictly) {
                    const pointKeys = new Set([lastSelectedKey, key])
                    recordKeys.some((recordKey, recordIndex) => {
                      if (pointKeys.has(recordKey)) {
                        if (startIndex === -1) {
                          startIndex = recordIndex
                        } else {
                          endIndex = recordIndex
                          return true
                        }
                      }
                      return false
                    })
                  }

                  if (
                    endIndex !== -1 &&
                    startIndex !== endIndex &&
                    checkStrictly
                  ) {
                    // Batch update selections
                    const rangeKeys = recordKeys.slice(startIndex, endIndex + 1)
                    const changedKeys: Key[] = []
                    if (checked) {
                      rangeKeys.forEach((recordKey) => {
                        if (keySet.has(recordKey)) {
                          changedKeys.push(recordKey)
                          keySet.delete(recordKey)
                        }
                      })
                    } else {
                      rangeKeys.forEach((recordKey) => {
                        if (!keySet.has(recordKey)) {
                          changedKeys.push(recordKey)
                          keySet.add(recordKey)
                        }
                      })
                    }
                    const keys = Array.from(keySet)
                    setSelectedKeys(keys, 'multiple')
                  } else {
                    // Single record selected
                    const originCheckedKeys = derivedSelectedKeys
                    if (checkStrictly) {
                      const checkedKeys = checked
                        ? arrDel(originCheckedKeys, key)
                        : arrAdd(originCheckedKeys, key)
                      triggerSingleSelection(
                        key,
                        !checked,
                        checkedKeys,
                        nativeEvent
                      )
                    }
                  }

                  if (checked) {
                    setLastSelectedKey(null)
                  } else {
                    setLastSelectedKey(key)
                  }
                }}
              />
            ),
            checked,
          }
        }
      }

      const renderSelectionCell = (
        _: any,
        record: RecordType,
        index: number
      ) => {
        const { node, checked } = renderCell(_, record, index)

        if (customizeRenderCell) {
          return customizeRenderCell(checked, record, index, node)
        }

        return node
      }

      // Insert selection column if not exist
      if (!cloneColumns.includes(SELECTION_COLUMN)) {
        // Always after expand icon
        if (
          cloneColumns.findIndex(
            (col: any) =>
              col[INTERNAL_COL_DEFINE]?.columnType === 'EXPAND_COLUMN'
          ) === 0
        ) {
          const [expandColumn, ...restColumns] = cloneColumns
          cloneColumns = [expandColumn, SELECTION_COLUMN, ...restColumns]
        } else {
          // Normal insert at first column
          cloneColumns = [SELECTION_COLUMN, ...cloneColumns]
        }
      }

      // Deduplicate selection column
      const selectionColumnIndex = cloneColumns.indexOf(SELECTION_COLUMN)

      warning(
        cloneColumns.filter((col) => col === SELECTION_COLUMN).length <= 1,
        'Table',
        'Multiple `SELECTION_COLUMN` exist in `columns`.'
      )

      cloneColumns = cloneColumns.filter(
        (column, index) =>
          column !== SELECTION_COLUMN || index === selectionColumnIndex
      )

      // Fixed column logic
      const prevCol: ColumnType<RecordType> & Record<string, any> =
        cloneColumns[selectionColumnIndex - 1]
      const nextCol: ColumnType<RecordType> & Record<string, any> =
        cloneColumns[selectionColumnIndex + 1]

      let mergedFixed: FixedType | undefined = fixed

      if (mergedFixed === undefined) {
        if (nextCol?.fixed !== undefined) {
          mergedFixed = nextCol.fixed
        } else if (prevCol?.fixed !== undefined) {
          mergedFixed = prevCol.fixed
        }
      }

      if (
        mergedFixed &&
        prevCol &&
        prevCol[INTERNAL_COL_DEFINE]?.columnType === 'EXPAND_COLUMN' &&
        prevCol.fixed === undefined
      ) {
        prevCol.fixed = mergedFixed
      }

      // Replace with real selection column
      const selectionColumn = {
        fixed: mergedFixed,
        width: selectionColWidth,
        className: `${prefixCls}-selection-column`,
        title: rowSelection.columnTitle || title,
        render: renderSelectionCell,
        [INTERNAL_COL_DEFINE]: {
          className: `${prefixCls}-selection-col`,
        },
      }

      return cloneColumns.map((col) =>
        col === SELECTION_COLUMN ? selectionColumn : col
      )
    },
    [
      getRowKey,
      flattedData,
      rowSelection,
      derivedSelectedKeys,
      derivedSelectedKeySet,
      derivedHalfSelectedKeySet,
      selectionColWidth,
      expandType,
      lastSelectedKey,
      checkboxPropsMap,
      triggerSingleSelection,
      isCheckboxDisabled,
    ]
  )

  return [transformColumns, derivedSelectedKeySet]
}
