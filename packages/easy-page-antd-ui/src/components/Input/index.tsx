/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentProps, connector } from '@easy-page/react-ui';
import { Input as AntdInput, InputProps as AntdInputProps } from 'antd';
import React, { useEffect, useState } from 'react';

export type InputBaseProps = AntdInputProps & {
  /** 字段变化时间：onBlur 表示 onBlur 时才提交变化, 默认 onBlur */
  trigger?: 'onChange' | 'onBlur';
  /** 自定义 onChange 处理 onChange */
  handleChange?: (options: {
    onChange: AntdInputProps['onChange'];
    /** 当前最新值 */
    value: string;
    /** 上一次的值 */
    preValue: string;
    frameworkProps: InputProps['frameworkProps'];
  }) => void;
};

export type InputEffectedType = {
  inputProps?: InputBaseProps;
};
/**
 * - 1. 定义组件 Props，一般由：UI 库组件本身 Props + 框架通用组件 Props + 自定义组件 Props 构成
 */
export type InputProps = ComponentProps<InputBaseProps, any, InputEffectedType>;

/**
 * - 2. 重写 FieldUIConfig，增加组件配置提示
 */
declare module '@easy-page/react-ui/interface' {
  export interface FieldUIConfig {
    input?: InputBaseProps;
  }
}
/**
 * - 3. 编写通用组件逻辑
 * @param props
 * @returns
 */
export const Input = connector(
  React.memo((props: InputProps) => {
    const {
      frameworkProps: { effectedResult, effectedLoading },
      value,
      onChange: _onChange,
      onBlur,
      trigger = 'onChange',
      handleChange,
      ...baseProps
    } = props;
    const onChange = (e: { target: { value: any } }) => {
      const val = e.target.value;
      if (!handleChange) {
        _onChange(val);
        return;
      }
      handleChange({
        onChange: _onChange,
        preValue: value,
        value: val,
        frameworkProps: props.frameworkProps,
      });
    };
    const [fieldValue, setFieldValue] = useState(value);
    useEffect(() => {
      if (value && value !== fieldValue) {
        setFieldValue(value);
      }
    }, [value]);
    if (trigger === 'onChange') {
      return (
        <AntdInput
          {...baseProps}
          onBlur={onBlur}
          {...(effectedResult?.inputProps || {})}
          onChange={onChange}
          value={value}
        />
      );
    }
    return (
      <AntdInput
        {...baseProps}
        {...(effectedResult?.inputProps || {})}
        onBlur={(e) => {
          onChange({ target: { value: fieldValue } });
          onBlur?.(e);
        }}
        onChange={(val) => {
          setFieldValue(val.target.value);
        }}
        value={fieldValue}
      />
    );
  })
);
