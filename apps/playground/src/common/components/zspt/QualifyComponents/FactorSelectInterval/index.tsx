// 左侧数字输入，右侧数字输入（例如：商品原价）
import { ComponentBaseProps, OperationFactorItem } from '@/common/apis'
import {
  InputNumber,
  InputNumberProps,
  Tooltip,
  SelectProps,
  Select,
} from 'antd'
import React from 'react'
import { FeExtend } from '../interface'
import { getRedText } from '../RedText'
import classNames from 'classnames'

export type FactorSelectIntervalState = {
  selectValue?: number | string
  leftValue?: number
  rightValue?: number
  feExtend: FeExtend
}

export type FactorSelectIntervalBaseProps = {
  oldProps: {
    leftValue: Pick<ComponentBaseProps, 'label' | 'placeholder' | 'unit'>
    rightValue: Pick<ComponentBaseProps, 'label' | 'placeholder' | 'unit'>
    selectValue: Pick<ComponentBaseProps, 'options' | 'multiple' | 'disabled'>
  }
  leftInput?: Omit<
    InputNumberProps,
    'value' | 'onChange' | 'placeholder' | 'unit'
  >
  rightInput?: Omit<
    InputNumberProps,
    'value' | 'onChange' | 'placeholder' | 'unit'
  >
  select: Omit<SelectProps, 'value' | 'onChange' | 'placeholder' | 'unit'>
  value: FactorSelectIntervalState
  onChange: (value: FactorSelectIntervalState) => void
  disabled?: boolean
  factor: OperationFactorItem
}

export const BaseFactorSelectInterval: React.FC<
  FactorSelectIntervalBaseProps
> = ({
  value,
  onChange,
  oldProps,
  leftInput = {},
  select,
  disabled,
  factor,
  rightInput = {},
}) => {
  const { leftValue, rightValue, selectValue } = oldProps || {}
  const performOnChange = (newValue: FactorSelectIntervalState) => {
    const selectOption = (selectValue?.options || []).find(
      (x) => x.value === newValue?.selectValue
    )
    onChange?.({
      ...newValue,
      feExtend: {
        ...(newValue.feExtend || {}),
        factorCategoryCode: factor.categoryCode,
        previewInfo: `${factor.factorName}：${
          selectOption?.label || ''
        } ${getRedText(`${newValue.leftValue}`)} - ${getRedText(
          `${newValue.rightValue}`
        )} ${rightValue.unit ?? ''}`,
      },
    })
  }
  return (
    <div className="flex flex-row w-full">
      <div className="flex flex-row mr-2  items-center w-1/2">
        <Select
          options={selectValue?.options}
          disabled={selectValue?.disabled || disabled}
          mode={selectValue?.multiple ? 'multiple' : undefined}
          value={value?.selectValue}
          className={classNames('mr-2 w-[150px]', select?.className)}
          onChange={(val: string) => {
            performOnChange({
              ...value,
              selectValue: val,
            })
          }}
          {...selectValue}
        ></Select>
        <div className="mr-2 w-[20px]">{leftValue.label}</div>

        <Tooltip title={leftValue.placeholder}>
          <InputNumber
            value={value?.leftValue as number}
            className="w-full"
            placeholder={leftValue.placeholder}
            suffix={leftValue.unit}
            onChange={(val) => {
              performOnChange({
                ...value,
                leftValue: val as number,
              })
            }}
            {...leftInput}
            disabled={leftInput.disabled || disabled}
          />
        </Tooltip>
      </div>
      <div className="flex flex-row items-center flex-1">
        <div className="mr-2 w-[20px]">{rightValue.label}</div>
        <Tooltip title={rightValue.placeholder}>
          <InputNumber
            value={value?.rightValue}
            className="w-full"
            suffix={rightValue.unit}
            placeholder={rightValue.placeholder}
            onChange={(val) => {
              performOnChange({
                ...value,
                rightValue: val as number,
              })
            }}
            {...rightInput}
            disabled={rightInput.disabled || disabled}
          />
        </Tooltip>
      </div>
    </div>
  )
}
