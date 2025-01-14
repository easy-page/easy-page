// 左侧下拉，右侧文本域（例如：商品名称关键字）
import React from 'react'
import './index.less'
import { Select, SelectProps } from 'antd'
import classNames from 'classnames'
import {
  CategoryCodeDesc,
  ComponentBaseProps,
  OperationFactorItem,
} from '@/common/apis'
import { FeExtend } from '../interface'
import { getRedText } from '../RedText'

export type BaseFactorBothSelectState = {
  type?: string
  value?: string
  feExtend: FeExtend
}

export type BaseFactorBothSelectProps = {
  oldProps: {
    type: Pick<
      ComponentBaseProps,
      'placeholder' | 'disabled' | 'options' | 'multiple'
    >
    value: Pick<ComponentBaseProps, 'placeholder' | 'options' | 'multiple'>
  }
  value: BaseFactorBothSelectState
  onChange: (value: BaseFactorBothSelectState) => void
  typeSelect?: Omit<
    SelectProps,
    'value' | 'onChange' | 'mode' | 'options' | 'placeholder'
  >
  valueSelect?: Omit<
    SelectProps,
    'value' | 'onChange' | 'mode' | 'options' | 'placeholder'
  >
  disabled?: boolean
  factor: OperationFactorItem
}
export const BaseFactorBothSelect: React.FC<BaseFactorBothSelectProps> = ({
  oldProps,
  onChange,
  typeSelect,
  value,
  factor,
  disabled,
  valueSelect,
}) => {
  const { type, value: valueConfig } = oldProps
  console.log('oldPropsoldProps:', oldProps)
  const { className: typeClassName, ...typeConfig } = typeSelect || {}
  const { className: valueClassName, ...valueExtraConfig } = valueSelect || {}

  const handleValueChange = (newValue: Partial<BaseFactorBothSelectState>) => {
    const decoratorConfig = factor?.viewConfig?.['x-decorator-props'] || {}
    const previewInfo = decoratorConfig?.previewInfo || ''
    const { options: valueOptions } = valueConfig
    const { options: typeOptions } = type
    let finallyPreviewInfo = ''

    newValue.value =
      typeof newValue.value === 'number'
        ? String(newValue.value)
        : newValue.value // 防止配置了number类型的value

    let valueArr = []
    if (newValue.value) {
      const tempArr = valueConfig?.multiple
        ? newValue.value.split(',')
        : [newValue.value]

      valueArr = tempArr.map((item: string) => {
        const mappingItem = valueOptions.find(
          (each) => String(each.value) === String(item)
        )
        return mappingItem.label
      })
    }
    const showValue = valueArr.join('，')
    const showType = typeOptions.find(
      (item) => item.value === newValue.type
    )?.label
    // 优先使用配置的预览结构
    if (previewInfo) {
      finallyPreviewInfo = previewInfo.replace(
        '{$value}',
        getRedText(showValue)
      )
    } else {
      finallyPreviewInfo = `${factor.factorName}：${showType}${getRedText(
        showValue
      )}${CategoryCodeDesc[factor.categoryCode]}`
    }
    onChange?.({
      ...newValue,
      feExtend: {
        ...(newValue.feExtend || {}),
        previewInfo: finallyPreviewInfo,
        factorCategoryCode: factor.categoryCode,
      },
    })
  }

  return (
    <div className="flex flex-row">
      <Select
        mode={type.multiple ? 'multiple' : undefined}
        disabled={type.disabled || disabled}
        placeholder={type.placeholder}
        options={type.options}
        value={value?.type}
        onChange={(val: string) => {
          handleValueChange({ ...value, type: val })
        }}
        {...typeConfig}
        className={classNames('mr-2 w-1/3', typeClassName)}
      />
      <Select
        mode={valueConfig?.multiple ? 'multiple' : undefined}
        placeholder={valueConfig?.placeholder}
        options={valueConfig?.options || []}
        value={value?.value}
        onChange={(val: string) => {
          handleValueChange({ ...value, value: val })
        }}
        {...valueExtraConfig}
        disabled={disabled}
        className={classNames('flex-1', valueClassName)}
      />
    </div>
  )
}
