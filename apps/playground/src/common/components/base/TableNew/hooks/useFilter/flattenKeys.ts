import { ColumnFilterItem, FilterValue } from '../../interface'

// 把所有value拍平
export function flattenKeys(filters?: ColumnFilterItem[]) {
  let keys: FilterValue = []
  ;(filters || []).forEach(({ value, children }) => {
    keys.push(value)
    if (children) {
      keys = [...keys, ...flattenKeys(children)]
    }
  })
  return keys
}
