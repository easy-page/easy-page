import {
  CheckNumberInvalidOptions,
  checkNumberInvalid,
  isZero,
  removeLeadingZeros,
  toNumber,
} from '@/common/libs'
import {
  BaseFormItemProps,
  CustomProps,
  Empty,
  nodeUtil,
} from '@easy-page/antd-ui'
import { Input } from 'antd'
import React, { useCallback } from 'react'

export type RangeConfig = {
  min: number
  max: number
}

export type RangeState = {
  min: string
  max: string
}

export type RangeFieldOptions = {
  id: string
  label: string
  range: RangeConfig
  prefix?: React.ReactNode
  formItemConfig?: BaseFormItemProps
  /** 若为 true，则不允许输入为 0 */
  denyZero?: boolean
  validateConfig: Partial<CheckNumberInvalidOptions> & {
    errorMsg: string
  }
  placeholder?: {
    min: string
    max: string
  }
  getFieldRange?: (
    options: Omit<
      CustomProps<RangeState, any, Record<string, any>, Empty>,
      'component'
    >
  ) => {
    min: number
    max: number
  }
  disabledMax?: boolean
  suffix?: string | React.ReactNode
  isRequired?: boolean
}

export const numberRangeField = ({
  id,
  label,
  range,
  denyZero,
  formItemConfig = {},
  validateConfig,
  disabledMax,
  suffix,
  placeholder,
  prefix,
  getFieldRange,
  isRequired = false,
}: RangeFieldOptions) => {
  return nodeUtil.createCustomField<RangeState>(
    id,
    label,
    (props) => {
      console.log('【设置】更新子活动 context:  刷新', id)
      const { value, onChange, disabled } = props
      const handleChange = useCallback(
        ({ curVal, key }: { curVal: string; key: string }) => {
          const val = curVal.trim()
          if (!val) {
            onChange({
              ...value,
              [key]: val?.trim(),
            })
            return
          }
          const res = checkNumberInvalid(val, {
            checkNumber: true,
            checkInRange: getFieldRange
              ? getFieldRange(props)
              : {
                  min: range.min,
                  max: range.max,
                },
            checkInteger: validateConfig?.checkInteger,
          })
          if (res.success) {
            onChange({ ...value, [key]: removeLeadingZeros(val) })
          }
        },
        [value]
      )

      const defaultPlacehoder = validateConfig?.checkInRange
        ? validateConfig?.errorMsg
        : '请输入'
      const minPlaceholder = placeholder?.min || defaultPlacehoder
      const maxPlaceholder = placeholder?.max || defaultPlacehoder
      return (
        <div className="flex flex-row items-center">
          {prefix}
          <Input
            placeholder={minPlaceholder}
            value={value.min || ''}
            className="max-w-[350px]"
            disabled={disabled}
            onChange={(e) => {
              handleChange({ key: 'min', curVal: e.target.value })
            }}
          />
          <div className="px-1">~</div>
          <Input
            placeholder={maxPlaceholder}
            value={value.max || ''}
            className="max-w-[350px]"
            disabled={disabled || disabledMax}
            onChange={(e) => {
              handleChange({ key: 'max', curVal: e.target.value })
            }}
          />
          <span className="ml-2">{suffix}</span>
        </div>
      )
    },
    {
      value: { min: '', max: '' },
      required: isRequired,
      validate: ({ value }) => {
        if (!value || (!value.max && !value.min)) {
          return {
            success: false,
            errorMsg: '最小值不可为空/最大值不可为空',
          }
        }

        if (denyZero && (isZero(value.min) || isZero(value.max))) {
          return {
            success: false,
            errorMsg: '不可为0',
          }
        }

        const { errorMsg, ...restConfig } = validateConfig
        const checkValid = (val: string) => {
          return checkNumberInvalid(val, {
            checkNumber: true,
            checkInRange: {
              min: range.min,
              max: range.max,
            },
            ...restConfig,
          })
        }
        const minCheckRes = checkValid(value.min)
        const maxCheckRes = checkValid(value.max)
        if (
          (value.max && !maxCheckRes.success) ||
          (value.min && !minCheckRes.success)
        ) {
          return {
            success: false,
            errorMsg: errorMsg,
          }
        }

        if (
          (value.max && value.max.endsWith('.')) ||
          (value.min && value.min.endsWith('.'))
        ) {
          return {
            success: false,
            errorMsg: '小数点后不能为空',
          }
        }

        if (!value.min || !value.max) {
          return {
            success: false,
            errorMsg: `${value.min ? '最大值' : '最小值'}不可为空`,
          }
        }

        const min = toNumber(value.min)
        const max = toNumber(value.max)
        if (min > max) {
          return {
            success: false,
            errorMsg: '必填，最大值需大于等于最小值',
          }
        }

        return { success: true }
      },
    },
    {
      formItem: {
        ...formItemConfig,
      },
    }
  )
}
