import React, { useEffect, useState } from 'react'
import './index.less'
import classNames from 'classnames'
import { Button, ButtonProps, Tooltip } from 'antd'
/**
 * - 具备 loading 和 tooltip 能力
 * @param props
 * @returns
 */
export const ZsptButton = (props: ButtonProps & { tips?: string }) => {
  const { tips, onClick, className, loading: userLoading, ...restProps } = props
  const [loading, setLoading] = useState(false)
  const handleClick = async (e) => {
    setLoading(true)
    await onClick?.(e)
    setLoading(false)
  }

  useEffect(() => {
    if (
      !onClick &&
      userLoading !== undefined &&
      typeof userLoading === 'boolean'
    ) {
      setLoading(userLoading)
    }
  }, [userLoading])

  if (props.disabled && tips) {
    return (
      <Tooltip placement="leftTop" title={tips}>
        <Button
          className={classNames('zspt-button', className)}
          onClick={handleClick}
          {...restProps}
          loading={loading}
        />
      </Tooltip>
    )
  }
  return (
    <Button
      className={classNames('zspt-button', className)}
      onClick={handleClick}
      {...restProps}
      loading={loading}
    />
  )
}
