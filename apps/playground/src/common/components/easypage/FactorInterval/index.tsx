// 左侧下拉，右侧文本域（例如：商品名称关键字）
import React from 'react';
import { ComponentProps, connector } from '@easy-page/antd-ui';
import { BaseFactorInterval, FactorIntervalBaseProps } from '../../zspt';

export type FactorIntervalProps = ComponentProps<FactorIntervalBaseProps, any>;

/**
 * - 2. 重写 FieldUIConfig，增加组件配置提示
 */
declare module '@easy-page/antd-ui' {
  export interface FieldUIConfig {
    factorInterval?: FactorIntervalBaseProps;
  }
}
/**
 * - 3. 编写通用组件逻辑
 * @param props
 * @returns
 */
export const FactorInterval = connector(
  React.memo((props: FactorIntervalProps) => {
    const { ...baseProps } = props;

    return <BaseFactorInterval {...baseProps} />;
  }),
);
