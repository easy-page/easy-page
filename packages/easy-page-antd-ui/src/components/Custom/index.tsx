/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ComponentProps,
  DefaultPageProps,
  connector,
} from '@easy-page/react-ui';
import React from 'react';

export type CustomComponentProps = Omit<
  CustomProps<
    Record<string, any> & {
      disabled?: boolean;
    }
  >,
  'component'
> & {
  disabled?: boolean;
  children?: any;
};
export type CustomBaseProps = {
  component?: React.FC<CustomComponentProps>;
};

/**
 * - 1. 定义组件 Props，一般由：UI 库组件本身 Props + 框架通用组件 Props + 自定义组件 Props 构成
 */
export type CustomProps<
  FieldType,
  EffectedResultType = any,
  PageState = Record<string, any>,
  PageProps = Record<string, any>
> = ComponentProps<
  CustomBaseProps,
  FieldType,
  EffectedResultType,
  PageState,
  PageProps & DefaultPageProps<PageState>
> & {
  disabled?: boolean;
  children?: any;
};

/**
 * - 2. 重写 FieldUIConfig，增加组件配置提示
 */
declare module '@easy-page/react-ui/interface' {
  export interface FieldUIConfig {
    custom?: CustomBaseProps;
  }
}
/**
 * - 3. 编写通用组件逻辑
 * @param props
 * @returns
 */
export const Custom = connector(
  React.memo((props: CustomProps<any>) => {
    const { frameworkProps, component: Component, ...baseProps } = props;
    if (Component) {
      return <Component frameworkProps={frameworkProps} {...baseProps} />;
    }
    const {
      nodeInfo: { name },
    } = frameworkProps || {};
    return (
      <div className="custom" {...baseProps}>
        {name}
      </div>
    );
  })
);
