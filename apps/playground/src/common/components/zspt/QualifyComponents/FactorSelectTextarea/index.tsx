// 左侧下拉，右侧文本域（例如：商品名称关键字）
import React, { useMemo } from 'react'
import { Select, SelectProps } from 'antd'
import classNames from 'classnames'
import { TextAreaProps } from 'antd/es/input'
import { CommonTextarea } from '../CommonTextarea'
import {
  ComponentBaseProps,
  OperationFactorItem,
  Validator,
  ValidatorType,
} from '@/common/apis'
import { FeExtend } from '../interface'
import { getCommaSeparatedPreviewInfo } from '../FactorTextarea/getCommaSeparatedPreviewInfo'

export type FactorSelectTextareaProps = {
  oldProps: {
    type: Pick<ComponentBaseProps, 'options' | 'multiple' | 'disabled'>
    value: Pick<
      ComponentBaseProps,
      'commaSeparated' | 'saveTextSpace' | 'placeholder' | 'tipName' | 'dataKey'
    >
  }
  factor: OperationFactorItem
  select: Omit<SelectProps, 'mode' | 'options' | 'value' | 'onChange'>
  textArea: Omit<TextAreaProps, 'placeholder' | 'value' | 'onChange'>
  value: FactorSelectTextareaState
  onChange: (value: FactorSelectTextareaState) => void
  maxCount?: number // 可输入最大个数, 不是字符长度，而是多个逗号隔开的个数，如：a,b,c
  disabled?: boolean
}

export type FactorSelectTextareaState = {
  type?: string
  value?: string
  feExtend: FeExtend
}

export type FactorSelectTextareaValidator = {
  value: Validator[]
  type: Validator[]
}

const getMaxCount = (factor: OperationFactorItem) => {
  const valueValidator =
    (factor.validators as FactorSelectTextareaValidator).value || []
  const maxValidator = valueValidator.find(
    (x) => x.type === ValidatorType.MaxiQuantity
  )
  return maxValidator.maxiQuantity || undefined
}

export const FactorSelectTextarea: React.FC<FactorSelectTextareaProps> = ({
  value,
  select,
  textArea = {},
  onChange,
  maxCount: newMax,
  factor,
  oldProps,
  disabled,
}) => {
  const { className, ...restSelect } = select || {}
  const {
    options = [],
    multiple,
    disabled: configDisabled,
  } = oldProps.type || {}
  const { commaSeparated, saveTextSpace, placeholder, tipName, dataKey } =
    oldProps.value || {}

  const maxCount = useMemo(
    () => getMaxCount(factor) || newMax,
    [factor, newMax]
  )
  console.log('factorfactor:', factor, value)

  const performOnChange = (newValue: Partial<FactorSelectTextareaState>) => {
    const typeDesc = options
      ?.filter((item) => item.value === newValue.type)
      .map((item) => item.label)
      .join(',')

    onChange?.({
      ...newValue,
      feExtend: {
        ...(newValue.feExtend || {}),
        factorCategoryCode: factor.categoryCode,
        previewInfo: `${typeDesc} ${
          factor.factorName
        }：${getCommaSeparatedPreviewInfo({
          text: newValue.value,
          commaSeparated: commaSeparated,
        })}`,
      },
    })
  }

  return (
    <div className="flex flex-row">
      <Select
        options={options}
        disabled={restSelect.disabled || disabled || configDisabled}
        mode={multiple ? 'multiple' : undefined}
        value={value?.type}
        className={classNames('mr-2 w-[150px]', className)}
        onChange={(val: string) => {
          performOnChange({
            ...value,
            type: val,
          })
        }}
        {...restSelect}
      ></Select>
      <CommonTextarea
        commaSeparated={commaSeparated || false}
        factor={factor}
        dataKey={dataKey}
        saveTextSpace={saveTextSpace || false}
        maxCount={maxCount || 1}
        placeholder={placeholder}
        value={value?.value}
        onChange={(val) => {
          performOnChange({
            ...value,
            value: val,
          })
        }}
        tipName={tipName}
        allowClear={true}
        {...textArea}
        disabled={textArea?.disabled || disabled}
      />
    </div>
  )
}
