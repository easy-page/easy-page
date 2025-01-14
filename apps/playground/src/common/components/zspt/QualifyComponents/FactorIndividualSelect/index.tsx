import {
  ComponentBaseProps,
  CompontOption,
  OperationFactorItem,
} from '@/common/apis'
import { Select, SelectProps } from 'antd'
import classNames from 'classnames'
import { FeExtend } from '../interface'

export type FactorIndividualSelectState = {
  value: string // 如果是多选，则是逗号隔开的字符串
  feExtend: FeExtend
}

export type FactorIndividualSelectProps = {
  oldProps: {
    value: Pick<
      ComponentBaseProps,
      'options' | 'multiple' | 'placeholder' | 'unit'
    >
  }
  select: Omit<SelectProps, 'mode' | 'options' | 'value' | 'onChange'>
  value: FactorIndividualSelectState
  factor: OperationFactorItem
  disabled?: boolean
  onChange: (value: FactorIndividualSelectState) => void
}

const getPreviewStr = (
  val: string | string[],
  options: CompontOption[],
  config?: {
    previewSuffix?: string
  }
) => {
  if (!val) {
    return `<font>-</font>`
  }
  if (typeof val === 'string' || typeof val === 'number') {
    const option = options.find((e) => e.value === val)
    return `<font>${option?.label || '-'}</font>`
  }
  const curOptions = options.filter((e) => val.includes(e.value))
  return `<font>${curOptions.map((e) => e.label).join('、')}</font>`
}

const postprocessVal = (val: string | string[]) => {
  if (typeof val === 'string' || typeof val === 'number') {
    return val
  }
  return val.join(',')
}

const preprocessVal = (val: string | number | string[] | number[]) => {
  if (typeof val === 'string' && val && val.includes(',')) {
    return val.split(',')
  }
  return val
}

/**
 * - 下拉框的 value，注意要：[...value], 不然下拉选择在鼠标悬浮时候会消失
 * - 应该和 mobx 相关
 * @param param0
 * @returns
 */
export const FactorIndividualSelect: React.FC<FactorIndividualSelectProps> = ({
  value,
  onChange,
  select,
  factor,
  disabled,
  oldProps,
}) => {
  const { className, ...restSelect } = select || {}
  const { options, multiple, placeholder, unit } = oldProps.value || {}
  const val = preprocessVal(value?.value)
  //
  return (
    <Select
      options={[...options]}
      mode={multiple ? 'multiple' : undefined}
      value={multiple ? [...(val as any)] : val}
      className={classNames('w-full', className)}
      onChange={(val: string | string[]) => {
        onChange({
          ...value,
          value: postprocessVal(val),
          feExtend: {
            ...(value.feExtend || {}),
            factorCategoryCode: factor.categoryCode,
            previewInfo: `${factor.factorName}：${getPreviewStr(val, options, {
              previewSuffix: unit,
            })}`,
          },
        })
      }}
      {...restSelect}
      placeholder={placeholder}
      disabled={disabled}
    ></Select>
  )
}
