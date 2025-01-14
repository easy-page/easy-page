import { ComponentProps, connector } from '@easy-page/antd-ui'
import {
  FactorIndividualInputProps as BaseFactorIndividualInputProps,
  FactorIndividualInput as BaseFactorIndividualInput,
} from '../../zspt'
import React from 'react'

export type FactorIndividualInputProps = ComponentProps<
  BaseFactorIndividualInputProps,
  any
>

/**
 * - 2. 重写 FieldUIConfig，增加组件配置提示
 */
declare module '@easy-page/antd-ui' {
  export interface FieldUIConfig {
    factorIndividualInput?: FactorIndividualInputProps
  }
}

export const FactorIndividualInput = connector(
  React.memo((props: FactorIndividualInputProps) => {
    const { onChange, ...baseProps } = props
    return <BaseFactorIndividualInput onChange={onChange} {...baseProps} />
  })
)
