import { ComponentProps, connector } from '@easy-page/react-ui';
import {
  Checkbox as AntdCheckBox,
  CheckboxProps as AntdCheckBoxProps,
} from 'antd';
import React from 'react';

export type BaseCheckboxProps = AntdCheckBoxProps & {
  customLabel?: React.FC<Omit<CheckBoxProps, 'customLabel'>>;
};

export type CheckboxEffectedType = {
  checkboxProps?: BaseCheckboxProps;
};

/**
 * - 1. 定义组件 Props，一般由：UI 库组件本身 Props + 框架通用组件 Props + 自定义组件 Props 构成
 */
export type CheckBoxProps = ComponentProps<
  BaseCheckboxProps,
  unknown,
  CheckboxEffectedType
>;

/**
 * - 2. 重写 FieldUIConfig，增加组件配置提示
 */
declare module '@easy-page/react-ui/interface' {
  export interface FieldUIConfig {
    checkBox?: BaseCheckboxProps;
  }
}
/**
 * - 3. 编写通用组件逻辑
 * @param props
 * @returns
 */
export const CheckBox = connector(
  React.memo((props: CheckBoxProps) => {
    const { frameworkProps, value, onChange, customLabel, ...baseProps } =
      props;
    const { nodeInfo, effectedResult } = frameworkProps;
    const { name, id } = nodeInfo;
    return (
      <AntdCheckBox
        value={id}
        {...baseProps}
        {...(effectedResult?.checkboxProps || {})}
      >
        {customLabel
          ? customLabel({
              value,
              onChange,
              frameworkProps,
              ...baseProps,
              name: baseProps.name || name,
            })
          : name}
      </AntdCheckBox>
    );
  })
);
