/* eslint-disable @typescript-eslint/no-explicit-any */

import { ComponentProps, connector } from '@easy-page/react-ui';
import { RadioGroupProps as AntdRadioGroupProps, Radio } from 'antd';
import React from 'react';

export type BaseRadioGroupProps = AntdRadioGroupProps & {
  /** 自定义 onChange 处理 onChange */
  handleChange?: (options: {
    onChange: AntdRadioGroupProps['onChange'];
    /** 当前最新值 */
    value: AntdRadioGroupProps['value'];
    /** 上一次的值 */
    preValue: AntdRadioGroupProps['value'];
    frameworkProps: RadioGroupProps['frameworkProps'];
  }) => void;
};
/**
 * - 1. 定义组件 Props，一般由：UI 库组件本身 Props + 框架通用组件 Props + 自定义组件 Props 构成
 */
export type RadioGroupProps = ComponentProps<BaseRadioGroupProps, any>;

/**
 * - 2. 重写 FieldUIConfig，增加组件配置提示
 */
declare module '@easy-page/react-ui/interface' {
  export interface FieldUIConfig {
    radioGroup?: BaseRadioGroupProps;
  }
}
/**
 * - 3. 编写通用组件逻辑
 * @param props
 * @returns
 */
export const RadioGroup = connector(
  React.memo((props: RadioGroupProps) => {
    const {
      frameworkProps: _,
      onChange,
      value,
      handleChange,
      ...baseProps
    } = props;
    return (
      <Radio.Group
        value={value}
        onChange={(checkValue) => {
          if (!handleChange) {
            onChange(checkValue);
            return;
          }
          handleChange({
            onChange,
            preValue: value,
            value: checkValue,
            frameworkProps: props.frameworkProps,
          });
        }}
        {...baseProps}
      />
    );
  })
);
