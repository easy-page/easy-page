import { ColumnType, FilterKey, Key } from '../../interface'

export type FilterTreeDataNode = any

export interface FilterRestProps {
  confirm?: boolean
  closeDropdown?: boolean
}

export interface FilterState<RecordType> {
  column: ColumnType<RecordType>
  key: Key
  filteredKeys?: FilterKey
  forceFiltered?: boolean
}
