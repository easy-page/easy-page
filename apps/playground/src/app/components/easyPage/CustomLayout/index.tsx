/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { ComponentProps } from '@easy-page/antd-ui';
import { connector } from '@easy-page/antd-ui';

export type BaseLayoutProps = {
  withLayout: boolean;
  children?: any;
};

export type CustomLayoutProps = ComponentProps<BaseLayoutProps, any>;

declare module '@easy-page/antd-ui' {
  export interface FieldUIConfig {
    // TODO 类型定义
    customLayout?: BaseLayoutProps;
  }
}

export const CustomLayout = connector(
  React.memo(({ children, withLayout, frameworkProps }: CustomLayoutProps) => {
    const { curNode } = frameworkProps;
    return (
      <div className="flex flex-col">
        {curNode}
        <div className="px-2 bg-red-200 py-2">{children}</div>
      </div>
    );
  })
);
