import { ComponentProps, connector } from '@easy-page/react-ui';
import { DatePicker as AntdDatePicker } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import React from 'react';

export type BaseRangePickerProps = RangePickerProps & {
  handleChange?: (options: {
    onChange: RangePickerProps['onChange'];
    /** 当前最新值 */
    value: any;
    /** 上一次的值 */
    preValue: any;
    frameworkProps: DatePickerRangeProps['frameworkProps'];
  }) => void;
};

/**
 * - 1. 定义组件 Props，一般由：UI 库组件本身 Props + 框架通用组件 Props + 自定义组件 Props 构成
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DatePickerRangeProps = ComponentProps<BaseRangePickerProps, any>;

/**
 * - 2. 重写 FieldUIConfig，增加组件配置提示
 */
declare module '@easy-page/react-ui/interface' {
  export interface FieldUIConfig {
    datePickerRange?: BaseRangePickerProps;
  }
}
/**
 * - 3. 编写通用组件逻辑
 * @param props
 * @returns
 */
export const DatePickerRange = connector(
  React.memo((props: DatePickerRangeProps) => {
    const {
      frameworkProps: _,
      onChange,
      value,
      handleChange,
      ...baseProps
    } = props;

    return (
      <AntdDatePicker.RangePicker
        value={value}
        onChange={(val) => {
          if (!handleChange) {
            onChange(val);
            return;
          }
          handleChange({
            onChange,
            preValue: value,
            value: val,
            frameworkProps: props.frameworkProps,
          });
        }}
        {...baseProps}
      />
    );
  })
);
