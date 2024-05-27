/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentProps, connector } from '@easy-page/react-ui';
import React from 'react';

/**
 * - 1. 定义组件 Props，一般由：UI 库组件本身 Props + 框架通用组件 Props + 自定义组件 Props 构成
 */

export type RootContainerBaseProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
export type RootContainerProps = ComponentProps<RootContainerBaseProps, any>;

/**
 * - 2. 重写 FieldUIConfig，增加组件配置提示
 */
declare module '@easy-page/react-ui/interface' {
  export interface FieldUIConfig {
    // eslint-disable-next-line @typescript-eslint/ban-types
    rootContainer?: RootContainerBaseProps;
  }
}
/**
 * - 3. 编写通用组件逻辑
 * @param props
 * @returns
 */
export const RootContainer = connector(
  React.memo((props: RootContainerProps) => {
    const { frameworkProps: _, ...baseProps } = props;
    return <div {...baseProps} />;
  })
);
