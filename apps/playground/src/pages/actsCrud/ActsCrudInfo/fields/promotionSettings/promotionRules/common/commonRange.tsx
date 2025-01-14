import React from 'react'
import { BaseFormItemProps, nodeUtil } from '@easy-page/antd-ui'
import { PromotionKey, ISubActivity } from '@/common'
import {
  RangeConfig,
  RangeFieldOptions,
  RangeState,
  numberRangeField,
} from '@/common/fields'
import {
  appendToKeyList,
  getKeyListInfo,
  hasRangeValue,
  isEmptyRange,
} from '../utils'
import {
  CommonActCrudFormProps,
  CommonSubActPageState,
} from '../../../interface'

export type RelationValidateOptions = {
  keys: [PromotionKey, PromotionKey]
  msg?: string
}

/** 用于折扣范围和价格范围，会有特定的联动验证 */
export const commonRange = ({
  range,
  id,
  label,
  prefix,
  suffix,
  placeholder,
  effectedKeys,
  fieldKey,
  formItemConfig,
  extra,
  relationValidate,
  validateConfig,
  ...rest
}: Partial<RangeFieldOptions> & {
  fieldKey: PromotionKey
  extra?: string | React.ReactNode
  effectedKeys?: Array<keyof CommonSubActPageState>
  /** 联动校验，通常用于两个范围字段必填写其中一个 **/
  relationValidate?: RelationValidateOptions
}) =>
  nodeUtil.extends<RangeState, CommonSubActPageState, CommonActCrudFormProps>(
    numberRangeField({
      id,
      label,
      prefix,
      range: range,
      placeholder: placeholder,
      formItemConfig: {
        className: 'col-span-1',
        extra,
        ...formItemConfig,
      },
      suffix: suffix,
      validateConfig: {
        errorMsg: `${range.min}~${range.max}${suffix || ''}之间`,
        decimalNumber: 1,
        checkNumber: true,
        ...(validateConfig || {}),
      },
      ...rest,
    }),
    {
      effectedKeys: effectedKeys,
      validate(oldValidate) {
        return async (context) => {
          const { pageState } = context

          const res = await oldValidate?.(context)
          // if(!res.success) {
          //   return res;
          // }
          if (relationValidate && relationValidate.keys?.length === 2) {
            const { keys, msg } = relationValidate
            const field1Key = keys[0]

            const field1Val = pageState[field1Key] as RangeState

            const field2Key = keys[1]
            const field2Val = pageState[field2Key] as RangeState

            /** 二者必须有其一 */
            if (!hasRangeValue(field1Val) && !hasRangeValue(field2Val)) {
              return {
                success: false,
                errorMsg: msg,
              }
            }

            if (
              (id === field1Key &&
                isEmptyRange(field1Val) &&
                hasRangeValue(field2Val)) ||
              (id === field2Key &&
                isEmptyRange(field2Val) &&
                hasRangeValue(field1Val))
            ) {
              // 如果当前是空，上一行已经填写，则不用校验其他，否则需要校验
              return { success: true }
            }
          }

          return res
        }
      },
      postprocess() {
        return ({ value, processedFormData }) => {
          return appendToKeyList({
            value,
            processedFormData,
            fieldKey: fieldKey,
          })
        }
      },
      preprocess() {
        return ({ defaultValues }) => {
          return (
            getKeyListInfo({
              defaultValues: defaultValues as ISubActivity,
              key: fieldKey,
            }) || {
              max: '',
              min: '',
            }
          )
        }
      },
    }
  )
