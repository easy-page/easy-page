import { ComponentProps, connector } from '@easy-page/react-ui';
import { Input } from 'antd';
import type { TextAreaProps as AntdTextAreaProps } from 'antd/es/input';
import React from 'react';

export type AntdTextBaseAreaProps = AntdTextAreaProps & {
  handleChange?: (options: {
    onChange: AntdTextAreaProps['onChange'];
    /** 当前最新值 */
    value: string;
    /** 上一次的值 */
    preValue: string;
    frameworkProps: TextAreaProps['frameworkProps'];
  }) => void;
};

/**
 * - 1. 定义组件 Props，一般由：UI 库组件本身 Props + 框架通用组件 Props + 自定义组件 Props 构成
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TextAreaProps = ComponentProps<AntdTextBaseAreaProps, any>;

/**
 * - 2. 重写 FieldUIConfig，增加组件配置提示
 */
declare module '@easy-page/react-ui/interface' {
  export interface FieldUIConfig {
    textArea?: AntdTextBaseAreaProps;
  }
}
/**
 * - 3. 编写通用组件逻辑
 * @param props
 * @returns
 */
export const TextArea = connector(
  React.memo((props: TextAreaProps) => {
    const {
      frameworkProps: _,
      onChange,
      value,
      handleChange,
      ...baseProps
    } = props;
    return (
      <Input.TextArea
        value={value}
        onChange={(e) => {
          if (!handleChange) {
            onChange(e);
            return;
          }
          handleChange({
            onChange,
            preValue: value,
            value: e.target.value,
            frameworkProps: props.frameworkProps,
          });
        }}
        {...baseProps}
      />
    );
  })
);
