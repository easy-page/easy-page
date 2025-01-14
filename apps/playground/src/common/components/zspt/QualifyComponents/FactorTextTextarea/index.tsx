// 左侧只读文字，右侧文本域（例如： UPC）
import { InputProps } from 'antd'
import Input, { TextAreaProps } from 'antd/es/input'
import classNames from 'classnames'
import React, { useMemo } from 'react'
import { CommonTextarea } from '../CommonTextarea'
import {
  ComponentBaseProps,
  OperationFactorItem,
  Validator,
  ValidatorType,
} from '@/common/apis'
import { FeExtend } from '../interface'
import { getCommaSeparatedPreviewInfo } from '../FactorTextarea/getCommaSeparatedPreviewInfo'

export type FactorTextTextareaState = {
  value: string
  feExtend: FeExtend
}
export type FactorTextTextareaBaseProps = {
  oldProps: {
    value: Pick<
      ComponentBaseProps,
      'commaSeparated' | 'saveTextSpace' | 'placeholder' | 'tipName' | 'dataKey'
    > // 兼容历史 Props 结构
    text: {
      content: string
    } // 兼容历史 Props 结构
  }

  value: FactorTextTextareaState
  factor: OperationFactorItem
  onChange: (value: FactorTextTextareaState) => void
  input?: Omit<InputProps, 'onChange' | 'value'> // 新增组件 Props
  textArea?: Omit<TextAreaProps, 'placeholder' | 'value' | 'onChange'> // 新增组件 Props
  maxCount?: number // 可输入最大个数, 不是字符长度，而是多个逗号隔开的个数，如：a,b,c
  disabled?: boolean
}

export type FactorTextTextareaValidator = {
  value: Validator[]
}

const getMaxCount = (factor: OperationFactorItem) => {
  const valueValidator =
    (factor.validators as FactorTextTextareaValidator).value || []
  const maxValidator = valueValidator.find(
    (x) => x.type === ValidatorType.MaxiQuantity
  )
  return maxValidator.maxiQuantity || undefined
}

export const BaseFactorTextTextarea: React.FC<FactorTextTextareaBaseProps> = ({
  oldProps,
  onChange,
  maxCount: newMax,
  value,
  disabled,
  factor,
  input = {},
  textArea,
}) => {
  const { content } = oldProps.text
  const { className, ...inputProps } = input
  const { commaSeparated, saveTextSpace, placeholder, tipName, dataKey } =
    oldProps.value
  const maxCount = useMemo(
    () => getMaxCount(factor) || newMax,
    [factor, newMax]
  )
  // 通知变更
  const handleValueChange = (newValue: string) => {
    onChange({
      ...value,
      value: newValue,
      feExtend: {
        ...(value.feExtend || {}),
        factorCategoryCode: factor.categoryCode,
        previewInfo: `${factor.factorName}：${getCommaSeparatedPreviewInfo({
          text: newValue,
          commaSeparated: commaSeparated,
        })}`,
      },
    })
  }
  return (
    <div className="flex flex-row">
      <Input
        disabled
        defaultValue={content}
        className={classNames(className, 'mr-2  h-[35px] w-1/3')}
        {...inputProps}
      />
      <CommonTextarea
        commaSeparated={commaSeparated || false}
        saveTextSpace={saveTextSpace || false}
        maxCount={maxCount || 1}
        factor={factor}
        dataKey={dataKey}
        placeholder={placeholder}
        value={value.value}
        onChange={(val) => {
          handleValueChange(val)
        }}
        tipName={tipName}
        allowClear={true}
        {...textArea}
        disabled={textArea?.disabled || disabled}
      />
    </div>
  )
}
