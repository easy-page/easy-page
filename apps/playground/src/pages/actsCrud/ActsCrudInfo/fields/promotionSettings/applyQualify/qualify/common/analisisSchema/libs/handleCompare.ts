import { toNumber } from '@/common'
import { CompareOperator } from '@/common/apis'

type CompareHandler = (options: { curVal: any; targetVal: any }) => boolean

export const compareHandlers: Record<CompareOperator, CompareHandler> = {
  [CompareOperator.Lt]: function (options: {
    curVal: any
    targetVal: any
  }): boolean {
    try {
      const { curVal, targetVal } = options
      return toNumber(curVal) < toNumber(targetVal)
    } catch (error) {
      return true
    }
  },
  [CompareOperator.Lte]: function (options: {
    curVal: any
    targetVal: any
  }): boolean {
    try {
      const { curVal, targetVal } = options
      return toNumber(curVal) <= toNumber(targetVal)
    } catch (error) {
      return true
    }
  },
  [CompareOperator.E]: function (options: {
    curVal: any
    targetVal: any
  }): boolean {
    try {
      const { curVal, targetVal } = options
      return curVal == targetVal
    } catch (error) {
      return false
    }
  },
  [CompareOperator.gt]: function (options: {
    curVal: any
    targetVal: any
  }): boolean {
    try {
      const { curVal, targetVal } = options
      return toNumber(curVal) > toNumber(targetVal)
    } catch (error) {
      return true
    }
  },
  [CompareOperator.gte]: function (options: {
    curVal: any
    targetVal: any
  }): boolean {
    try {
      const { curVal, targetVal } = options
      return toNumber(curVal) >= toNumber(targetVal)
    } catch (error) {
      return true
    }
  },
}
