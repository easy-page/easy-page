import { ComponentProps, connector } from '@easy-page/react-ui';
import { Switch as AntdSwitch, SwitchProps as AntdSwitchProps } from 'antd';
import React from 'react';

/**
 * - 1. 定义组件 Props，一般由：UI 库组件本身 Props + 框架通用组件 Props + 自定义组件 Props 构成
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SwitchProps = ComponentProps<AntdSwitchProps, any>;

/**
 * - 2. 重写 FieldUIConfig，增加组件配置提示
 */
declare module '@easy-page/react-ui/interface' {
  export interface FieldUIConfig {
    switch?: AntdSwitchProps;
  }
}
/**
 * - 3. 编写通用组件逻辑
 * @param props
 * @returns
 */
export const Switch = connector(
  React.memo((props: SwitchProps) => {
    const { frameworkProps: _, ...baseProps } = props;

    return <AntdSwitch {...baseProps} />;
  })
);
