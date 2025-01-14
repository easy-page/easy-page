// 左侧下拉，右侧文本域（例如：商品名称关键字）
import React from 'react';
import { ComponentProps, connector } from '@easy-page/antd-ui';
import {
  FactorSelectTextareaProps as FactorSelectTextareaBaseProps,
  FactorSelectTextarea as BaseFactorSelectTextarea,
} from '../../zspt';

export type FactorSelectTextareaProps = ComponentProps<
  FactorSelectTextareaBaseProps,
  any
>;

/**
 * - 2. 重写 FieldUIConfig，增加组件配置提示
 */
declare module '@easy-page/antd-ui' {
  export interface FieldUIConfig {
    factorSelectTextarea?: FactorSelectTextareaBaseProps;
  }
}
/**
 * - 3. 编写通用组件逻辑
 * @param props
 * @returns
 */
export const FactorSelectTextarea = connector(
  React.memo((props: FactorSelectTextareaProps) => {
    const { ...baseProps } = props;

    return <BaseFactorSelectTextarea {...baseProps} />;
  }),
);
