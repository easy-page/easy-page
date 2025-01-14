import type { ColumnTitle, ColumnTitleProps, ColumnType, Key, SetConfig, SetData, Column } from './interface';
import { cloneDeep } from 'lodash'

export function getColumnKey<RecordType>(column: ColumnType<RecordType>, defaultKey: string): Key {
  if ('key' in column && column.key !== undefined && column.key !== null) {
    return column.key;
  }
  if (column.dataIndex) {
    return (Array.isArray(column.dataIndex) ? column.dataIndex.join('.') : column.dataIndex) as Key;
  }

  return defaultKey;
}

export function getColumnPos(index: number, pos?: string) {
  return pos ? `${pos}-${index}` : `${index}`;
}

export function renderColumnTitle<RecordType>(
  title: ColumnTitle<RecordType>,
  props: ColumnTitleProps<RecordType>,
) {
  if (typeof title === 'function') {
    return title(props);
  }

  return title;
}

export function getConfigByprops<RecordType>(setConfig: undefined | boolean | SetConfig<RecordType>) {
  const config: boolean | SetConfig<RecordType> = setConfig
    ? typeof setConfig === 'boolean'
      ? {
        fixed: 'left',
        dragable: true
      }
      : setConfig
    : false
  return config
}

export const handleSortColumns = (value: SetData[]) => {
  const left = value.filter(s => s.fixed === 'left' || (typeof s.fixed === 'boolean' && s.fixed))
  const main = value.filter(s => !s.fixed)
  const right = value.filter(s => s.fixed === 'right')
  return [...left, ...main, ...right]
}

export const changeSort = ({
  data,
  fromIndex,
  toIndex
}: {
  data: SetData[]
  fromIndex: number
  toIndex: number
}) => {
  const newData = cloneDeep(data)
  const indexToItem = newData[toIndex]
  const item = newData.splice(fromIndex, 1)[0]
  item.fixed = indexToItem.fixed
  newData.splice(toIndex, 0, item)
  return handleSortColumns(newData)
}

export function getDeaultValue<RecordType>(columns: Array<Column<RecordType>>) {
  const data = columns.map(item => {
    return {
      dataIndex: item?.dataIndex as string,
      show: true,
      fixed: item.fixed || false
    }
  })
  return handleSortColumns(data)
}

export function compareWithColumns<RecordType>(columns: Array<Column<RecordType>>, value: SetData[]) {
  const data = value.filter(item => !!columns.find(i => i.dataIndex === item.dataIndex)) // 删除不存在columns的数据
  const list: SetData[] = []
  columns.forEach((item) => {
    const itemData = data.find(i => i.dataIndex === item.dataIndex)
    if (!itemData) { // 新增列默认显示
      list.push({
        dataIndex: item.dataIndex as string,
        show: true,
        fixed: item.fixed || false
      })
    } else {
      list.push({
        ...itemData
      })
    }
  })
  return handleSortColumns(list)

}
