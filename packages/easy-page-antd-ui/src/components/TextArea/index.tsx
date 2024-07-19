import { ComponentProps, connector } from '@easy-page/react-ui';
import { Input } from 'antd';
import type { TextAreaProps as AntdTextAreaProps } from 'antd/es/input';
import React from 'react';

/**
 * - 1. 定义组件 Props，一般由：UI 库组件本身 Props + 框架通用组件 Props + 自定义组件 Props 构成
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TextAreaProps = ComponentProps<AntdTextAreaProps, any>;

/**
 * - 2. 重写 FieldUIConfig，增加组件配置提示
 */
declare module '@easy-page/react-ui/interface' {
  export interface FieldUIConfig {
    textArea?: AntdTextAreaProps;
  }
}
/**
 * - 3. 编写通用组件逻辑
 * @param props
 * @returns
 */
export const TextArea = connector(
  React.memo((props: TextAreaProps) => {
    const { frameworkProps: _, ...baseProps } = props;
    return <Input.TextArea {...baseProps} />;
  })
);
