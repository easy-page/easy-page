import React, { CSSProperties } from 'react'
import './index.less'
import classNames from 'classnames'

export const DangerouslySetInnerHTML: React.FC<{
  children: any
  className?: string
  style?: CSSProperties
}> = ({ children, className, style }) => {
  return (
    <div
      style={style}
      className={classNames('zspt-dangerously-set-inner-html', className)}
      dangerouslySetInnerHTML={{
        __html: children || '',
      }}
    />
  )
}
