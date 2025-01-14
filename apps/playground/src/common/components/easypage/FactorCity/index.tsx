// 左侧下拉，右侧文本域（例如：商品名称关键字）
import React from 'react'
import { ComponentProps, connector } from '@easy-page/antd-ui'
import { BaseFactorCity, FactorCityBaseProps } from '../../zspt'
import { mccModel } from '@/common/models'

export type FactorCityProps = ComponentProps<FactorCityBaseProps, any>

/**
 * - 2. 重写 FieldUIConfig，增加组件配置提示
 */
declare module '@easy-page/antd-ui' {
  export interface FieldUIConfig {
    factorCity?: FactorCityBaseProps
  }
}
/**
 * - 3. 编写通用组件逻辑
 * @param props
 * @returns
 */
export const FactorCity = connector(
  React.memo((props: FactorCityProps) => {
    const { onChange, ...baseProps } = props
    const { data } = mccModel.getData()
    return (
      <BaseFactorCity
        mccCityMaxNum={data.factor_city_invert_size}
        onChange={onChange}
        {...baseProps}
      />
    )
  })
)
