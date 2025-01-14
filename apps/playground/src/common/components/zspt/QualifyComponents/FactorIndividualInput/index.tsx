import { ComponentBaseProps, OperationFactorItem } from '@/common/apis'
import { FeExtend } from '../interface'
import { Input, InputProps } from 'antd'
import { getRedText } from '../RedText'

export type FactorIndividualInputState = {
  value: number
  feExtend: FeExtend
}

export type FactorIndividualInputProps = {
  /** 即之前在：x-component-props 中的属性，结构保持一致 */
  oldProps: {
    value: Pick<ComponentBaseProps, 'placeholder' | 'label' | 'unit'>
  }

  /** antd 组件的属性，暂未使用 */
  // input: Omit<InputProps, 'placeholder' | 'value' | 'onChange'>

  // 下方都是所有因子通用属性配置

  /** 当前因子信息 */
  factor: OperationFactorItem

  /** 当前字段状态 */
  value: FactorIndividualInputState
  onChange: (val: FactorIndividualInputState) => void
  disabled?: boolean
}

export const FactorIndividualInput = ({
  oldProps,
  value,
  factor,
  disabled,
  onChange,
}: FactorIndividualInputProps) => {
  const { placeholder, label, unit } = oldProps.value || {}
  console.log('asdsasadsad:', unit)

  const performOnChange = (newValue: number) => {
    const finallyPreviewInfo = `${factor.factorName}：${getRedText(
      `${label}${newValue}${unit || ''}`
    )}`

    onChange({
      value: Number(newValue),
      feExtend: {
        ...(value.feExtend || {}),
        factorCategoryCode: factor.categoryCode,
        previewInfo: finallyPreviewInfo,
      },
    })
  }
  return (
    <div className="factor-individual-input flex flex-row items-center">
      <div className="factor-individual-input-label mr-2">{label}</div>
      <div data-key="value" className={`factor-individual-input-box flex-1`}>
        <Input
          value={String(value.value)}
          placeholder={placeholder}
          className="factor-individual-input-value w-full"
          disabled={disabled}
          required
          type="number"
          onChange={(e) => {
            let value = e.target.value
            if (Number(value) > 0) {
              value = value.replace(/^0+/, '')
            }
            performOnChange(Number(value))
          }}
        />
      </div>
    </div>
  )
}
