import { TextAreaProps } from 'antd/es/input'
import { CommonTextarea } from '../CommonTextarea'
import {
  ComponentBaseProps,
  OperationFactorItem,
  Validator,
  ValidatorType,
} from '@/common/apis'
import { FeExtend } from '../interface'
import { getCommaSeparatedPreviewInfo } from './getCommaSeparatedPreviewInfo'
import { useMemo } from 'react'
export type FactorTextareaState = {
  value: string
  feExtend: FeExtend
}
export type FactorTextareaBaseProps = {
  oldProps: {
    value: Pick<
      ComponentBaseProps,
      'commaSeparated' | 'saveTextSpace' | 'placeholder' | 'tipName' | 'dataKey'
    >
  }
  factor: OperationFactorItem
  textArea: Omit<TextAreaProps, 'placeholder' | 'value' | 'onChange'>
  value: FactorTextareaState
  onChange: (val: FactorTextareaState) => void
  maxCount?: number // 可输入最大个数, 不是字符长度，而是多个逗号隔开的个数，如：a,b,c
  disabled?: boolean
}

export type FactorTextareaValidator = {
  value: Validator[]
}

const getMaxCount = (factor: OperationFactorItem) => {
  const valueValidator =
    (factor.validators as FactorTextareaValidator).value || []
  const maxValidator = valueValidator.find(
    (x) => x.type === ValidatorType.MaxiQuantity
  )
  return maxValidator.maxiQuantity || undefined
}

export const FactorTextarea: React.FC<FactorTextareaBaseProps> = ({
  textArea,
  value,
  onChange,
  factor,
  oldProps,
  maxCount: newMax,
  disabled,
}) => {
  const { placeholder, commaSeparated, saveTextSpace, tipName, dataKey } =
    oldProps.value || {}

  const maxCount = useMemo(
    () => getMaxCount(factor) || newMax,
    [factor, newMax]
  )

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
    <CommonTextarea
      commaSeparated={commaSeparated || false}
      saveTextSpace={saveTextSpace || false}
      maxCount={maxCount}
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
  )
}
