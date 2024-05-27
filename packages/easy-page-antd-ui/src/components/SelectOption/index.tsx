/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentProps, connector } from '@easy-page/react-ui';
import { Select } from 'antd';
import type { OptionProps } from 'antd/es/select';
import React from 'react';

export type SelectOptionBaseProps = OptionProps;

declare module '@easy-page/react-ui/interface' {
  export interface FieldUIConfig {
    selectOption?: SelectOptionBaseProps;
  }
}

export type SelectOptionProps = ComponentProps<SelectOptionBaseProps, any>;

/** antd ui will not run this option component */
export const SelectOption = connector(
  React.memo((props: SelectOptionProps) => {
    const { frameworkProps, value, ...restProps } = props;
    console.log('vvv:', value, restProps);
    return <Select.Option {...restProps}></Select.Option>;
  })
);
