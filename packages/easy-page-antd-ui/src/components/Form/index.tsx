/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentProps, FormUtil, connector } from '@easy-page/react-ui';
import {
  Form as AntdForm,
  FormProps as AntdFormProps,
  FormInstance,
} from 'antd';
import React, { ReactNode, useEffect, useRef } from 'react';
import { AntdFormUtil } from './formUtil';
/**
 * - 1. 定义组件 Props，一般由：UI 库组件本身 Props + 框架通用组件 Props + 自定义组件 Props 构成
 */
export type FormProps = ComponentProps<AntdFormProps<any>, any> & {
  setFormUtil?: (formUtil: FormUtil<any>) => void;
  // configProvider?: ConfigProviderProps;
};

/**
 * - 2. 重写 FieldUIConfig，增加组件配置提示
 */
declare module '@easy-page/react-ui/interface' {
  export interface FieldUIConfig {
    form?: AntdFormProps;
  }
}
/**
 * - 3. 编写通用组件逻辑
 * @param props
 * @returns
 */
export const Form = connector(
  React.memo((props: FormProps) => {
    const {
      frameworkProps: { store },
      setFormUtil,
      children,
      ...baseProps
    } = props;
    const formRef = useRef<FormInstance>(null);
    useEffect(() => {
      if (setFormUtil && formRef.current) {
        setFormUtil(new AntdFormUtil(formRef, store));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    console.log('Form themeConfig:', children);
    return (
      <AntdForm
        {...baseProps}
        children={children as ReactNode}
        initialValues={store.getDefaultValues()}
        ref={formRef}
      />
    );
  })
);
