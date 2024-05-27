import { ComponentProps, connector } from '@easy-page/react-ui';
import {
  DatePicker as AntdDatePicker,
  DatePickerProps as AntdDatePickerProps,
} from 'antd';
import React from 'react';

/**
 * - 1. 定义组件 Props，一般由：UI 库组件本身 Props + 框架通用组件 Props + 自定义组件 Props 构成
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DatePickerProps = ComponentProps<AntdDatePickerProps, any>;

export type DatePickerEffectedResultType = AntdDatePickerProps;

/**
 * - 2. 重写 FieldUIConfig，增加组件配置提示
 */
declare module '@easy-page/react-ui/interface' {
  export interface FieldUIConfig {
    datePicker?: AntdDatePickerProps;
  }
}
/**
 * - 3. 编写通用组件逻辑
 * @param props
 * @returns
 */
export const DatePicker = connector(
  React.memo((props: DatePickerProps) => {
    const {
      frameworkProps: { effectedResult = {} },
      ...baseProps
    } = props;

    return <AntdDatePicker {...baseProps} {...effectedResult} />;
  })
);
