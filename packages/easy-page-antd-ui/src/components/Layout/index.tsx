/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentProps, connector } from '@easy-page/react-ui';
import classNames from 'classnames';
import React from 'react';
import { UI_COMPONENTS } from '../../common/constant';
import './index.css';

/**
 * - 1. 定义组件 Props，一般由：UI 库组件本身 Props + 框架通用组件 Props + 自定义组件 Props 构成
 */

export type BaseLayoutProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  disableLayout?: boolean;
  /** 单个子元素会包裹一个 div 的样式 */
  childClassName?: string;
  childrenContainerClassName?: string;
  indentation?: boolean;
};
export type LayoutProps = ComponentProps<BaseLayoutProps, any>;

/**
 * - 2. 重写 FieldUIConfig，增加组件配置提示
 */
declare module '@easy-page/react-ui/interface' {
  export interface FieldUIConfig {
    layout?: BaseLayoutProps;
  }
}

const IndentationContainer = (props: {
  children?: any[];
  indentation: boolean;
  childrenContainerClassName?: string;
}) => {
  const { indentation, children, childrenContainerClassName } = props;
  const showContainer = children?.find((e) => e.props['x-show'] === 'true');
  if (indentation) {
    return (
      <div className="ant-form-item">
        <div className="ant-row ant-form-item-row">
          <div className="ant-col ant-form-item-label">
            <label />
          </div>
          {children && showContainer ? (
            <div
              className={`${
                childrenContainerClassName ||
                'border border-inherit p-4 rounded mb-8'
              } ant-col ant-form-item-control`}
            >
              {children}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  }
  return <>{children}</>;
};
/**
 * - 3. 编写通用组件逻辑
 * @param props
 * @returns
 */
export const Layout = connector(
  React.memo((props: LayoutProps) => {
    const {
      frameworkProps,
      children,
      childrenContainerClassName,
      disableLayout,
      value,
      childClassName,
      onChange: _,
      indentation,
      style = {},
      ...baseProps
    } = props;
    const { curNode, grandChildren, nodeInfo, store } = frameworkProps;

    const showChildrenMap = store.showChildren;
    // console.log('curNode111:', curNode);
    if (disableLayout) {
      // return curNode
      if (
        curNode.props.frameworkProps.componentName === UI_COMPONENTS.FORMITEM
      ) {
        if (!grandChildren) {
          // 如 customField
          return React.cloneElement(curNode, {
            ...curNode.props,
            children: React.Children.map(curNode.props.children, (child) => {
              return React.cloneElement(child, { ...child.props, children });
            }),
          });
        }

        // 存在 grandChildren 情况，如 select、radio、checkbox
        return React.cloneElement(curNode, {
          ...curNode.props,
          children: React.Children.map(curNode.props.children, (child) => {
            /**
             * - curNode.children 是 sex 这一层 - child2
             * - child.children 是选项：man、female - child3
             * - 这里应该是将：grandChildren 添加给 child.children
             */
            return React.cloneElement(child, {
              ...child.props,
              children: React.Children.map(child.props.children, (each) => {
                const nodeId = each.props?.frameworkProps?.nodeInfo?.id || '';
                const grandChildrenInfo = grandChildren?.[nodeId];
                return React.cloneElement(each, {
                  ...each.props,
                  children: grandChildrenInfo,
                });
              }),
            });
          }),
        });
      }
      return React.cloneElement(curNode, {
        ...curNode.props,
        children,
      });
    }
    const grandChildrenKeys = Object.keys(grandChildren || {});
    return (
      <div style={style} {...baseProps} className="layout-id">
        {curNode}
        {children}
        <IndentationContainer
          childrenContainerClassName={childrenContainerClassName}
          indentation={indentation || false}
        >
          {/* {grandChildren?.[value]} */}
          {grandChildrenKeys.map((each) => {
            const customShowHandler = showChildrenMap?.[nodeInfo.id];
            const showChild =
              (Array.isArray(value) && value.includes(each)) ||
              value === each ||
              customShowHandler?.({
                fieldValue: value,
                parentNode: nodeInfo,
                curNode: { id: each, name: '', isFormField: false },
              });

            return (
              <div
                className={classNames(childClassName, { hidden: !showChild })}
                key={`layout_child_${nodeInfo.id}_${each}`}
                x-show={`${showChild}`}
              >
                {grandChildren?.[each]}
              </div>
            );
          })}
        </IndentationContainer>
      </div>
    );
  })
);
