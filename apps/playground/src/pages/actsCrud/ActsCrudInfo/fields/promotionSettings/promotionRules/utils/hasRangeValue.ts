import { RangeState } from '@/common/fields'

export const hasRangeValue = (value: RangeState) => {
  return Boolean(value?.max) && Boolean(value?.min)
}

/** 空的range 范围 */
export const isEmptyRange = (value: RangeState) => {
  return (!value?.max && !value?.min) || !value
}
