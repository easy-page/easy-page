import { checkQualify } from '@/common/apis/checkQualify'
import { message } from 'antd'
import { isNumber, toNumber } from 'lodash'
import { compareHandlers } from '../libs/handleCompare'
import { ValidateHandler } from './interface'
import { Validator, ValidatorType } from '@/common/apis'
import { isDecimalNumber } from '@/common'

/**
 * - 判断字段是否存在值
 */
export const fieldHasValue = ({
  deps,
  pageState,
}: {
  pageState: Record<string, any>
  deps: string[]
}) => {
  return deps.every((x) => {
    const fieldVal = pageState[x]
    if (!fieldVal) {
      return false
    }
    const keys = Object.keys(fieldVal).filter((e) => e !== 'feExtend')
    return keys.length > 0
  })
}

export const validateHandler: Record<ValidatorType, ValidateHandler> = {
  [ValidatorType.Required]: (fieldVal: any, rule: Validator) => {
    const strEmpty =
      fieldVal === undefined ||
      fieldVal === null ||
      (typeof fieldVal === 'string' && !fieldVal)

    const arrEmpty = Array.isArray(fieldVal) && fieldVal.length === 0
    console.log('fffffffff:123213123', fieldVal, rule)
    if (strEmpty || arrEmpty) {
      return { success: false, errorMsg: rule.message }
    }
  },
  [ValidatorType.Regular]: (fieldVal: any, rule: Validator) => {
    const regex = new RegExp(rule.pattern)
    if (!regex.test(fieldVal)) {
      return { success: false, errorMsg: rule.message }
    }
  },
  [ValidatorType.Enum]: (fieldVal: any, rule: Validator) => {
    if (!(rule.enum || []).includes(fieldVal)) {
      return { success: false, errorMsg: rule.message }
    }
  },
  [ValidatorType.Min]: (fieldVal: any, rule: Validator) => {
    if (
      rule.min !== undefined &&
      typeof fieldVal === 'string' &&
      fieldVal.length < rule.min
    ) {
      return { success: false, errorMsg: rule.message }
    }
  },
  [ValidatorType.Max]: (fieldVal: any, rule: Validator) => {
    if (
      rule.max !== undefined &&
      typeof fieldVal === 'string' &&
      fieldVal.length > rule.max
    ) {
      return { success: false, errorMsg: rule.message }
    }
  },
  [ValidatorType.Minimum]: (fieldVal: any, rule: Validator) => {
    try {
      if (!isNumber(fieldVal)) {
        return { success: false, errorMsg: rule.message }
      }
      const numberVal = toNumber(fieldVal)
      if (rule.minimum !== undefined && numberVal < rule.minimum) {
        return { success: false, errorMsg: rule.message }
      }
    } catch (error) {
      console.log('m,min')
      console.error(error)
    }
  },
  [ValidatorType.Maximum]: (fieldVal: any, rule: Validator) => {
    try {
      if (!isNumber(fieldVal)) {
        return { success: false, errorMsg: rule.message }
      }
      const numberVal = toNumber(fieldVal)
      if (rule.maximum !== undefined && numberVal > rule.maximum) {
        return { success: false, errorMsg: rule.message }
      }
    } catch (error) {
      console.log('m,mmmmax')
      console.error(error)
    }
  },
  [ValidatorType.DecimalLength]: (fieldVal: any, rule: Validator) => {
    if (
      (fieldVal !== undefined || fieldVal !== null || fieldVal !== '') &&
      ['string', 'number'].includes(typeof fieldVal) &&
      !isDecimalNumber(`${fieldVal}`, rule.maximum)
    ) {
      return { success: false, errorMsg: rule.message }
    }
  },
  [ValidatorType.MiniQuantity]: (fieldVal: any, rule: Validator) => {
    if (rule.miniQuantity !== undefined && typeof fieldVal === 'string') {
      const count = fieldVal.split(',')
      if (count.length < rule.miniQuantity) {
        return { success: false, errorMsg: rule.message }
      }
    }
  },
  [ValidatorType.MaxiQuantity]: (fieldVal: any, rule: Validator) => {
    if (rule.maxiQuantity !== undefined && typeof fieldVal === 'string') {
      const count = fieldVal.split(',')
      if (count.length > rule.maxiQuantity) {
        return { success: false, errorMsg: rule.message }
      }
    }
  },
  [ValidatorType.Compare]: (fieldVal: any, rule: Validator, { value }) => {
    if (rule.target && rule.operator) {
      const targetVal = value[rule.target]
      const operatorHandler = compareHandlers[rule.operator]
      if (!operatorHandler) {
        console.error(`为定义操作：${rule.operator}`)
        return
      }

      if (fieldVal === undefined || targetVal === undefined) {
        // 任何一个无值不比较
        return { success: true, errorMsg: '' }
      }
      if (!operatorHandler({ curVal: fieldVal, targetVal })) {
        return { success: false, errorMsg: rule.message }
      }
    }
  },
  [ValidatorType.Remote]: async (
    fieldVal: any,
    rule: Validator,
    { factor }
  ) => {
    if (rule.isNeedInnerCheck) {
      const res = await checkQualify({
        dataCollector: {
          [factor.factorCode]: JSON.stringify(fieldVal),
        },
      })
      if (res.success && !res.data?.success) {
        return { success: false, errorMsg: res.data?.errorMsg || '' }
      }
      message.error(res.msg)
    }
    return Promise.resolve(undefined)
  },
  [ValidatorType.Association]: (
    fieldVal: any,
    rule: Validator,
    { pageState, factor, mccConfigs }
  ) => {
    // throw new Error('Function not implemented.');
    // 校验依赖关系
    const deps =
      mccConfigs?.factorAssociationRulesMap?.[factor.factorCode]
        ?.co_occurrence || []

    if (deps.length === 0) {
      return { success: true, errorMsg: '' }
    }
    console.log('rulerule:', mccConfigs, factor, pageState, rule, fieldVal)
    if (!fieldHasValue({ pageState, deps })) {
      return { success: false, errorMsg: rule.message }
    }

    return { success: true, errorMsg: '' }
  },
  [ValidatorType.IsInteger]: function (fieldVal: any, rule: Validator) {
    if (fieldVal && String(fieldVal).includes('.')) {
      return { success: false, errorMsg: rule.message }
    }
  },
}
