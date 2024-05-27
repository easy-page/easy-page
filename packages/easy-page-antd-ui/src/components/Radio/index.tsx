/* eslint-disable @typescript-eslint/no-explicit-any */
import { QuestionCircleOutlined } from '@ant-design/icons';
import { ComponentProps, connector } from '@easy-page/react-ui';
import {
  Radio as AntdRadio,
  RadioProps as AntdRadioProps,
  Tooltip,
} from 'antd';
import classNames from 'classnames';
import React from 'react';
import './index.less';

export type RadioBaseProps = AntdRadioProps & {
  tips?: string;
  helper?: string | React.ReactNode;
  layoutClassName?: string;
};

/** 当前组件的副作用类型定义 */
export type RadioEffectedType = {
  radioProps?: RadioBaseProps;
};
/**
 * - 1. 定义组件 Props，一般由：UI 库组件本身 Props + 框架通用组件 Props + 自定义组件 Props 构成
 */
export type RadioProps = ComponentProps<RadioBaseProps, any, RadioEffectedType>;

/**
 * - 2. 重写 FieldUIConfig，增加组件配置提示
 */
declare module '@easy-page/react-ui/interface' {
  export interface FieldUIConfig {
    radio?: RadioBaseProps;
  }
}

const RadioLayout = ({
  children,
  radio,
  className,
}: {
  children?: React.ReactNode;
  radio: React.ReactNode;
  className?: string;
}) => {
  if (!children) {
    return radio;
  }
  return (
    <div
      className={classNames(className, {
        'flex flex-row items-center': !className,
      })}
    >
      {radio}
      {children}
    </div>
  );
};

/**
 * - 3. 编写通用组件逻辑
 * @param props
 * @returns
 */
export const Radio = connector(
  React.memo((props: RadioProps) => {
    const {
      frameworkProps: { nodeInfo, effectedResult },
      children,
      value: _,
      onChange: __,
      tips,
      helper,
      layoutClassName,
      ...baseProps
    } = props;
    console.log('eeee1111:', children);
    const { name, id } = nodeInfo;
    const curName = effectedResult?.radioProps?.name || name;
    return (
      <RadioLayout
        className={layoutClassName}
        radio={
          <AntdRadio
            value={id}
            className={classNames(baseProps.className, {
              'mr-2 flex flex-row items-center': Boolean(children),
            })}
            {...baseProps}
            {...(effectedResult?.radioProps || {})}
          >
            <div className="flex flex-row items-center break-keep">
              {curName}
              {tips ? (
                <Tooltip style={{ display: 'inline' }} title={tips}>
                  <QuestionCircleOutlined className="ml-2" />
                </Tooltip>
              ) : (
                <></>
              )}
              {helper}
            </div>
          </AntdRadio>
        }
      >
        {children}
      </RadioLayout>
    );
  })
);
