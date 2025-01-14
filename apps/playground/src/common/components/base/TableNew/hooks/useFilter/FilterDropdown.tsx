import classNames from 'classnames'
import isEqual from 'lodash/isEqual'
import * as React from 'react'
import Icon from '@roo/roo/Icon'
import Button from '@roo/roo/Button'
import DropMenu from '@roo/roo/DropMenu'
import { OverrideProvider } from './OverrideContext'

import type {
  ColumnFilterItem,
  ColumnType,
  FilterSearchType,
  GetPopupContainer,
  Key,
  TableLocale,
} from '../../interface'
// import FilterSearch from './FilterSearch';
import FilterDropdownMenuWrapper from './FilterWrapper'
import useSyncState from './useSyncState'
import Tree from '../../Tree'
import { FilterTreeDataNode, FilterRestProps, FilterState } from './interface'
import { flattenKeys } from './flattenKeys'

Icon.extend({
  scriptUrl: [
    '//s3plus.meituan.net/v1/mss_28a77f134e5b4abf876b4ff035f4107f/iconfont/project/1012/0.0.1/roo_prod.js',
  ],
})

// function hasSubMenu(filters: ColumnFilterItem[]) {
//   return filters.some(({ children }) => children);
// }

// function searchValueMatched(searchValue: string, text: React.ReactNode) {
//   if (typeof text === 'string' || typeof text === 'number') {
//     return text?.toString().toLowerCase().includes(searchValue.trim().toLowerCase());
//   }
//   return false;
// }

// function renderFilterItems({
//   filters,
//   prefixCls,
//   filteredKeys,
//   filterMultiple,
//   searchValue,
//   filterSearch,
// }: {
//   filters: ColumnFilterItem[];
//   prefixCls: string;
//   filteredKeys: Key[];
//   filterMultiple: boolean;
//   searchValue: string;
//   filterSearch: FilterSearchType<ColumnFilterItem>;
// }): Required<MenuProps>['items'] {
//   return filters.map((filter, index) => {
//     const key = String(filter.value);
//
//     if (filter.children) {
//       return {
//         key: key || index,
//         label: filter.text,
//         popupClassName: `${prefixCls}-dropdown-submenu`,
//         children: renderFilterItems({
//           filters: filter.children,
//           prefixCls,
//           filteredKeys,
//           filterMultiple,
//           searchValue,
//           filterSearch,
//         }),
//       };
//     }
//
//     const Component = filterMultiple ? Checkbox : Radio;
//
//     const item = {
//       key: filter.value !== undefined ? key : index,
//       label: (
//         <>
//           <Component checked={filteredKeys.includes(key)} />
//           <span>{filter.text}</span>
//         </>
//       ),
//     };
//     if (searchValue.trim()) {
//       if (typeof filterSearch === 'function') {
//         return filterSearch(searchValue, filter) ? item : null;
//       }
//       return searchValueMatched(searchValue, filter.text) ? item : null;
//     }
//     return item;
//   });
// }

export type TreeColumnFilterItem = ColumnFilterItem & FilterTreeDataNode

export interface FilterDropdownProps<RecordType> {
  tablePrefixCls: string
  prefixCls: string
  dropdownPrefixCls: string
  column: ColumnType<RecordType>
  filterState?: FilterState<RecordType>
  filterMultiple: boolean
  filterMode?: 'menu' | 'tree'
  filterSearch?: FilterSearchType<ColumnFilterItem | TreeColumnFilterItem>
  columnKey: Key
  children: React.ReactNode
  triggerFilter: (filterState: FilterState<RecordType>) => void
  locale: TableLocale
  getPopupContainer?: GetPopupContainer
  filterResetToDefaultFilteredValue?: boolean
  filterSelectAll: boolean
}

function FilterDropdown<RecordType>(
  this: any,
  props: FilterDropdownProps<RecordType>
) {
  const {
    tablePrefixCls,
    prefixCls,
    column,
    dropdownPrefixCls,
    columnKey,
    filterMultiple,
    filterMode = 'tree',
    filterSearch = false,
    filterSelectAll,
    filterState,
    triggerFilter,
    locale,
    children,
    // getPopupContainer,
  } = props

  const {
    filterDropdownOpen,
    onFilterDropdownOpenChange,
    filterResetToDefaultFilteredValue,
    defaultFilteredValue,
  } = column
  const [visible, setVisible] = React.useState(false)

  const filtered = !!(
    filterState &&
    (filterState.filteredKeys?.length || filterState.forceFiltered)
  )
  const triggerVisible = (newVisible: boolean) => {
    setVisible(newVisible)
    onFilterDropdownOpenChange?.(newVisible)
  }

  let mergedVisible: boolean
  if (typeof filterDropdownOpen === 'boolean') {
    mergedVisible = filterDropdownOpen
  } else {
    mergedVisible = visible
  }
  // ===================== Select Keys =====================
  const propFilteredKeys = filterState?.filteredKeys
  const [getFilteredKeysSync, setFilteredKeysSync] = useSyncState(
    propFilteredKeys || []
  )

  const onSelectKeys = ({ selectedKeys }: { selectedKeys: Key[] }) => {
    setFilteredKeysSync(selectedKeys)
  }

  const onCheck = (node: any, nodes: any) => {
    if (!filterMultiple) {
      onSelectKeys({ selectedKeys: node && node.id ? [node.id] : [] })
    } else {
      onSelectKeys({ selectedKeys: nodes.map((item: any) => item.id) as Key[] })
    }
  }

  React.useEffect(() => {
    if (!visible) {
      return
    }
    onSelectKeys({ selectedKeys: propFilteredKeys || [] })
  }, [propFilteredKeys])

  // ====================== Open Keys ======================
  // const [openKeys, setOpenKeys] = React.useState<string[]>([]);
  // const onOpenChange = (keys: string[]) => {
  //   setOpenKeys(keys);
  // };

  // search in tree mode column filter
  // const [searchValue, setSearchValue] = React.useState('');
  // const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value } = e.target;
  //   setSearchValue(value);
  // };
  // clear search value after close filter dropdown
  // React.useEffect(() => {
  //   if (!visible) {
  //     setSearchValue('');
  //   }
  // }, [visible]);

  // ======================= Submit ========================
  const internalTriggerFilter = (keys: Key[] | undefined | null) => {
    const mergedKeys = keys && keys.length ? keys : null
    if (mergedKeys === null && (!filterState || !filterState.filteredKeys)) {
      return null
    }

    if (isEqual(mergedKeys, filterState?.filteredKeys)) {
      return null
    }

    triggerFilter({
      column: column as any,
      key: columnKey,
      filteredKeys: mergedKeys,
    })

    return
  }

  const onConfirm = () => {
    triggerVisible(false)
    internalTriggerFilter(getFilteredKeysSync())
  }

  const onReset = (
    { confirm, closeDropdown }: FilterRestProps = {
      confirm: false,
      closeDropdown: false,
    }
  ) => {
    if (confirm) {
      internalTriggerFilter([])
    }
    if (closeDropdown) {
      triggerVisible(false)
    }

    // setSearchValue('');

    if (filterResetToDefaultFilteredValue) {
      setFilteredKeysSync(
        (defaultFilteredValue || []).map((key) => String(key))
      )
    } else {
      setFilteredKeysSync([])
    }
  }

  const doFilter = ({ closeDropdown } = { closeDropdown: true }) => {
    if (closeDropdown) {
      triggerVisible(false)
    }
    internalTriggerFilter(getFilteredKeysSync())
  }

  const onVisibleChange = (newVisible: boolean) => {
    if (newVisible && propFilteredKeys !== undefined) {
      // Sync filteredKeys on appear in controlled mode (propFilteredKeys !== undefiend)
      setFilteredKeysSync(propFilteredKeys || [])
    }

    triggerVisible(newVisible)

    // Default will filter when closed
    if (!newVisible && !column.filterDropdown) {
      onConfirm()
    }
  }

  // ======================== Style ========================
  // const dropdownMenuClass = classNames({
  //   [`${dropdownPrefixCls}-menu-without-submenu`]: !hasSubMenu(column.filters || []),
  // });

  const onCheckAll = (selectedKeys: string[]) => {
    if (selectedKeys.length !== flattenKeys(column.filters).length) {
      const allFilterKeys = flattenKeys(column?.filters).map((key) =>
        String(key)
      )
      setFilteredKeysSync(allFilterKeys)
    } else {
      setFilteredKeysSync([])
    }
  }

  const getTreeData = ({ filters }: { filters?: ColumnFilterItem[] }) =>
    (filters || []).map((filter, index) => {
      const id = String(filter.value)
      const item: FilterTreeDataNode = {
        label: filter.text,
        id: filter.value !== undefined ? id : index,
      }
      if (filter.children) {
        item.children = getTreeData({ filters: filter.children })
      }
      return item
    })
  // const getFilterData = (node: FilterTreeDataNode): TreeColumnFilterItem => ({
  //   ...node,
  //   text: node.label,
  //   value: node.id,
  //   children: node.children?.map((item: any) => getFilterData(item)) || [],
  // });

  let dropdownContent: React.ReactNode

  if (typeof column.filterDropdown === 'function') {
    dropdownContent = column.filterDropdown({
      prefixCls: `${dropdownPrefixCls}-custom`,
      setSelectedKeys: (selectedKeys: Key[]) => onSelectKeys({ selectedKeys }),
      selectedKeys: getFilteredKeysSync(),
      confirm: doFilter,
      clearFilters: onReset,
      filters: column.filters,
      visible: mergedVisible,
    })
  } else if (column.filterDropdown) {
    dropdownContent = column.filterDropdown
  } else {
    const selectedKeys = (getFilteredKeysSync() || []) as any
    const getFilterComponent = () => {
      if ((column.filters || []).length === 0) {
        return (
          <div
            style={{
              margin: 0,
              padding: '16px 0',
              textAlign: 'center',
            }}
          >
            <img
              style={{
                height: 24,
              }}
              src="//s3plus.sankuai.com/v1/mss_c4375b35f5cb4e678b5b55a48c40cf9d/roo/public/empty-default.png"
            />
            <div className="roo-plus-empty-text">{locale.filterEmptyText}</div>
          </div>
        )
      }

      if (filterMode === 'tree') {
        return (
          <>
            {/*<FilterSearch<TreeColumnFilterItem>*/}
            {/*  filterSearch={filterSearch}*/}
            {/*  value={searchValue}*/}
            {/*  onChange={onSearch}*/}
            {/*  tablePrefixCls={tablePrefixCls}*/}
            {/*  locale={locale}*/}
            {/*/>*/}
            <div className={`${tablePrefixCls}-filter-dropdown-tree`}>
              {/*{filterMultiple ? (*/}
              {/*  <Checkbox*/}
              {/*    checked={selectedKeys.length === flattenKeys(column.filters).length}*/}
              {/*    indeterminate={*/}
              {/*      selectedKeys.length > 0 &&*/}
              {/*      selectedKeys.length < flattenKeys(column.filters).length*/}
              {/*    }*/}
              {/*    className={`${tablePrefixCls}-filter-dropdown-checkall`}*/}
              {/*    onChange={onCheckAll}*/}
              {/*  >*/}
              {/*    {locale.filterCheckall}*/}
              {/*  </Checkbox>*/}
              {/*) : null}*/}
              <Tree
                showCheckbox={filterMultiple}
                // selectable={false}
                // blockNode
                // multiple={filterMultiple} // roo 不支持checkbox多选
                // checkStrictly={!filterMultiple}
                className={`${dropdownPrefixCls}-menu`}
                // checkedKeys={selectedKeys}
                selectedKey={!filterMultiple ? selectedKeys[0] : undefined}
                selectedKeys={filterMultiple ? selectedKeys : undefined}
                // showIcon={false}
                // autoExpandParent
                defaultExpandAll
                onCheckChange={filterMultiple ? onCheck : undefined}
                onNodeClick={filterMultiple ? undefined : onCheck}
                data={getTreeData({ filters: column.filters })}
                search={!!filterSearch}
                searchInput={{
                  prefix: <Icon name="search" />,
                  placeholder: locale.filterSearchPlaceholder,
                  size: 'mini',
                }}
                // filterTreeNode={
                //   searchValue.trim()
                //     ? node => {
                //         if (typeof filterSearch === 'function') {
                //           return filterSearch(searchValue, getFilterData(node));
                //         }
                //         return searchValueMatched(searchValue, node.label);
                //       }
                //     : undefined
                // }
              />
            </div>
          </>
        )
      }
      return null
      // return (
      //   <>
      //     <FilterSearch
      //       filterSearch={filterSearch}
      //       value={searchValue}
      //       onChange={onSearch}
      //       tablePrefixCls={tablePrefixCls}
      //       locale={locale}
      //     />
      //     <Menu
      //       selectable
      //       multiple={filterMultiple}
      //       prefixCls={`${dropdownPrefixCls}-menu`}
      //       className={dropdownMenuClass}
      //       onSelect={onSelectKeys}
      //       onDeselect={onSelectKeys}
      //       selectedKeys={selectedKeys}
      //       getPopupContainer={getPopupContainer}
      //       openKeys={openKeys}
      //       onOpenChange={onOpenChange}
      //       items={renderFilterItems({
      //         filters: column.filters || [],
      //         filterSearch,
      //         prefixCls,
      //         filteredKeys: getFilteredKeysSync(),
      //         filterMultiple,
      //         searchValue,
      //       })}
      //     />
      //   </>
      // );
    }

    const getResetDisabled = () => {
      if (filterResetToDefaultFilteredValue) {
        return isEqual(
          (defaultFilteredValue || []).map((key) => String(key)),
          selectedKeys
        )
      }

      return selectedKeys.length === 0
    }

    dropdownContent = (
      <>
        {getFilterComponent()}
        <div className={`${prefixCls}-dropdown-btns`}>
          {filterMultiple && filterSelectAll && (
            <Button
              type="hollow"
              size="mini"
              onClick={onCheckAll.bind(this, selectedKeys)}
            >
              {selectedKeys.length !== flattenKeys(column.filters).length
                ? locale.filterCheckall
                : locale.filterCheckNotall}
            </Button>
          )}
          <Button
            type="hollow"
            size="mini"
            disabled={getResetDisabled()}
            onClick={() => onReset()}
          >
            {locale.filterReset}
          </Button>
          <Button type="normal" size="mini" onClick={onConfirm}>
            {locale.filterConfirm}
          </Button>
        </div>
      </>
    )
  }

  // We should not block customize Menu with additional props
  if (column.filterDropdown) {
    dropdownContent = (
      <OverrideProvider selectable={undefined}>
        {dropdownContent}
      </OverrideProvider>
    )
  }

  const menu = (
    <FilterDropdownMenuWrapper className={`${prefixCls}-dropdown`}>
      {dropdownContent}
    </FilterDropdownMenuWrapper>
  )

  // 图标渲染
  let filterIcon: React.ReactNode
  if (typeof column.filterIcon === 'function') {
    filterIcon = column.filterIcon(filtered)
  } else if (column.filterIcon) {
    filterIcon = column.filterIcon
  } else {
    let name = 'icon-roo-filter'
    if (filtered) {
      name = 'icon-roo-filter-select'
    }
    filterIcon = <Icon name={name} />
  }

  return (
    <div
      className={`${prefixCls}-column`}
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      <span className={`${tablePrefixCls}-column-title`}>{children}</span>
      <DropMenu
        menuComponent={menu}
        trigger="click"
        // visible
        visible={mergedVisible}
        onClickOutside={() => {
          onVisibleChange(false)
        }}
        // popupContainer={getPopupContainer}
        placement="bottomLeft"
      >
        <span
          role="button"
          tabIndex={-1}
          className={classNames(`${prefixCls}-trigger`, {
            active: filtered,
          })}
          onClick={() => {
            onVisibleChange(!mergedVisible)
          }}
        >
          {filterIcon}
        </span>
      </DropMenu>
    </div>
  )
}

export default FilterDropdown
