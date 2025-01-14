import React from 'react'
import './index.less'
import { Tooltip, TooltipProps } from 'antd'

export type CustomEllipsisProps = Omit<TooltipProps, 'onVisibleChange'> & {
  line: number
  text?: React.ReactNode
  tabIndex: number
  content: any
}

export const CustomEllipsis = ({
  line,
  text,
  content,
  className,
  tabIndex,
  ...restProps
}: CustomEllipsisProps) => {
  // TODO
  const getPopupContainer = (tabIndex: number) => {
    if (tabIndex === -1 || tabIndex === undefined) {
      return document.querySelector('.product-selection-table')
    }

    return document.querySelector(
      `.tabPane-${tabIndex} .product-selection-table`
    )
  }

  return (
    <Tooltip
      title={content}
      {...restProps}
      // getPopupContainer={getPopupContainer(tabIndex)}
      // trigger="click"
      className={`${className || ''}`}
    >
      <div
        className={'custom-ellipsis'}
        style={{
          WebkitLineClamp: line,
        }}
      >
        {text || content || '-'}
      </div>
    </Tooltip>
  )
}
