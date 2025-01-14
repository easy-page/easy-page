// 左侧下拉，右侧文本域（例如：商品名称关键字）
import React from 'react';
import { ComponentProps, connector } from '@easy-page/antd-ui';
import { BaseFactorBothSelect, BaseFactorBothSelectProps } from '../../zspt';

export type FactorBothSelectProps = ComponentProps<
  BaseFactorBothSelectProps,
  any
>;

/**
 * - 2. 重写 FieldUIConfig，增加组件配置提示
 */
declare module '@easy-page/antd-ui' {
  export interface FieldUIConfig {
    factorBothSelect?: BaseFactorBothSelectProps;
  }
}
/**
 * - 3. 编写通用组件逻辑
 * @param props
 * @returns
 */
export const FactorBothSelect = connector(
  React.memo((props: FactorBothSelectProps) => {
    const { ...baseProps } = props;

    return <BaseFactorBothSelect {...baseProps} />;
  }),
);
