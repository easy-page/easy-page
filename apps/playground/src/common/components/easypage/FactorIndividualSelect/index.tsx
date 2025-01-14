// 左侧下拉，右侧文本域（例如：商品名称关键字）
import React from 'react';
import { ComponentProps, connector } from '@easy-page/antd-ui';

import {
  FactorIndividualSelectProps as FactorIndividualSelectBaseProps,
  FactorIndividualSelect as BaseFactorIndividualSelect,
} from '../../zspt';

export type FactorIndividualSelectProps = ComponentProps<
  FactorIndividualSelectBaseProps,
  any
>;

/**
 * - 2. 重写 FieldUIConfig，增加组件配置提示
 */
declare module '@easy-page/antd-ui' {
  export interface FieldUIConfig {
    FactorIndividualSelect?: FactorIndividualSelectBaseProps;
  }
}
/**
 * - 3. 编写通用组件逻辑
 * @param props
 * @returns
 */
export const FactorIndividualSelect = connector(
  React.memo((props: FactorIndividualSelectProps) => {
    const { ...baseProps } = props;
    return <BaseFactorIndividualSelect {...baseProps} />;
  }),
);
