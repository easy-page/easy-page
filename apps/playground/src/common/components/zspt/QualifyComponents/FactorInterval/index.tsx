// 左侧数字输入，右侧数字输入（例如：商品原价）
import { ComponentBaseProps, OperationFactorItem } from '@/common/apis'
import { InputNumber, InputNumberProps, Tooltip } from 'antd'
import React from 'react'
import { FeExtend } from '../interface'
import { getRedText } from '../RedText'

export type FactorIntervalState = {
  leftValue?: number
  rightValue?: number
  feExtend: FeExtend
}

export type FactorIntervalBaseProps = {
  oldProps: {
    leftValue: Pick<
      ComponentBaseProps,
      'label' | 'placeholder' | 'unit' | 'previewSuffix'
    >
    rightValue: Pick<
      ComponentBaseProps,
      'label' | 'placeholder' | 'unit' | 'previewSuffix'
    >
  }
  leftInput?: Omit<
    InputNumberProps,
    'value' | 'onChange' | 'placeholder' | 'unit'
  >
  rightInput?: Omit<
    InputNumberProps,
    'value' | 'onChange' | 'placeholder' | 'unit'
  >
  value: FactorIntervalState
  onChange: (value: FactorIntervalState) => void
  disabled?: boolean
  factor: OperationFactorItem
}

export const BaseFactorInterval: React.FC<FactorIntervalBaseProps> = ({
  value,
  onChange,
  oldProps,
  leftInput = {},
  disabled,
  factor,
  rightInput = {},
}) => {
  const { leftValue, rightValue } = oldProps || {}
  console.log('rightValuerightValuerightValue:', rightValue)
  const performOnChange = (newValue: FactorIntervalState) => {
    onChange?.({
      ...newValue,
      feExtend: {
        ...(newValue.feExtend || {}),
        factorCategoryCode: factor.categoryCode,
        previewInfo: `${factor.factorName}：${getRedText(
          `${newValue.leftValue}`
        )} - ${getRedText(`${newValue.rightValue}`)} ${rightValue.unit ?? ''}`,
      },
    })
  }
  return (
    <div className="flex flex-row w-full">
      <div className="flex flex-row mr-2  items-center w-1/2">
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
