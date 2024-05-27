/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentProps, connector } from '@easy-page/react-ui';
import { Checkbox } from 'antd';
import type { CheckboxGroupProps as AntdCheckboxGroupProps } from 'antd/es/checkbox/Group';
import React from 'react';

export type BaseCheckboxGropProps = AntdCheckboxGroupProps & {
  /** 自定义 onChange 处理 onChange */
  handleChange?: (options: {
    onChange: AntdCheckboxGroupProps['onChange'];
    /** 当前最新值 */
    value: AntdCheckboxGroupProps['value'];
    /** 上一次的值 */
    preValue: AntdCheckboxGroupProps['value'];
    frameworkProps: CheckBoxGroupProps['frameworkProps'];
  }) => void;
};
/**
 * - 定义副作用影响结构
 * - 下属定义表明副作用只影响我的组件属性配置
 */
export type CheckboxGroupEffectResultType = BaseCheckboxGropProps;

/**
 * - 1. 定义组件 Props，一般由：UI 库组件本身 Props + 框架通用组件 Props + 自定义组件 Props 构成
 */
export type CheckBoxGroupProps = ComponentProps<
  BaseCheckboxGropProps,
  any,
  CheckboxGroupEffectResultType
>;

/**
 * - 2. 重写 FieldUIConfig，增加组件配置提示
 */
declare module '@easy-page/react-ui/interface' {
  export interface FieldUIConfig {
    checkBoxGroup?: BaseCheckboxGropProps;
  }
}
/**
 * - 3. 编写通用组件逻辑
 * @param props
 * @returns
 */
export const CheckBoxGroup = connector(
  React.memo((props: CheckBoxGroupProps) => {
    const {
      frameworkProps: { effectedResult = {} },
      defaultValue: _,
      onChange,
      value,
      handleChange,
      ...baseProps
    } = props;
    return (
      <Checkbox.Group
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
        {...effectedResult}
      />
    );
  })
);
