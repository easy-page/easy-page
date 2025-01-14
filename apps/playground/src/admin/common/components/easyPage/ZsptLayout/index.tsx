import { ComponentProps, connector, UI_COMPONENTS } from '@easy-page/antd-ui'
import classNames from 'classnames'
import React from 'react'

/**
 * - 1. 定义组件 Props，一般由：UI 库组件本身 Props + 框架通用组件 Props + 自定义组件 Props 构成
 */

export type BaseLayoutProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  childrenContainerClassName?: string
  indentation?: boolean
  showLayout?: (value: any) => boolean
  layoutFormItem?: {
    labelClass?: string
    wrapClass?: string
  }
}
export type LayoutProps = ComponentProps<BaseLayoutProps, any>

/**
 * - 2. 重写 FieldUIConfig，增加组件配置提示
 */
declare module '@easy-page/antd-ui' {
  export interface FieldUIConfig {
    zsptLayout?: BaseLayoutProps
  }
}

const IndentationContainer = (props: {
  children?: any
  indentation: boolean
  childrenContainerClassName?: string
  layoutFormItem?: {
    labelClass?: string
    wrapClass?: string
  }
}) => {
  const { indentation, children, childrenContainerClassName, layoutFormItem } =
    props
  if (indentation) {
    return (
      <div className="ant-form-item css-dev-only-do-not-override-3rel02">
        <div className="ant-row ant-form-item-row  css-dev-only-do-not-override-3rel02">
          <div
            className={classNames(
              'ant-col ant-form-item-label css-dev-only-do-not-override-3rel02',
              layoutFormItem?.labelClass
            )}
          >
            <label className="ant-form-item-no-colon"></label>
          </div>
          {children ? (
            <div
              className={classNames(
                `${
                  childrenContainerClassName ||
                  'border border-inherit p-4 rounded mb-2'
                } ant-col ant-form-item-control css-dev-only-do-not-override-3rel02`,
                layoutFormItem?.wrapClass
              )}
            >
              {children}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    )
  }
  return <>{children}</>
}
/**
 * - 3. 编写通用组件逻辑
 * @param props
 * @returns
 */
export const ZsptLayout = connector(
  React.memo((props: LayoutProps) => {
    const {
      frameworkProps,
      children,
      childrenContainerClassName,
      indentation,
      style = {},
      showLayout,
      layoutFormItem,
      value,
      ...baseProps
    } = props
    const { curNode } = frameworkProps
    const showLayoutContainer = showLayout ? showLayout(value) : false
    return (
      <div style={style} {...baseProps} className="zspt-layout-id">
        {curNode}

        {showLayoutContainer ? (
          <IndentationContainer
            layoutFormItem={layoutFormItem}
            childrenContainerClassName={childrenContainerClassName}
            indentation={indentation || false}
          >
            {children}
          </IndentationContainer>
        ) : (
          children
        )}
      </div>
    )
  })
)
