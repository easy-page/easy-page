import React, { useMemo } from 'react'

interface PrimaryHeaderProps {
  largeSize?: boolean
  extra?: React.ReactNode
  description?: React.ReactNode
  outerStyle?: React.CSSProperties
  children?: any
}

export const PrimaryHeader: React.FC<PrimaryHeaderProps> = ({
  largeSize,
  extra,
  description,
  children,
  outerStyle = {},
}) => {
  const style = useMemo(() => {
    return largeSize
      ? {
          fontSize: 20,
          fontWeight: 500,
          marginRight: '10px',
          lineHeight: '30px',
        }
      : {
          fontSize: 16,
          fontWeight: 500,
          marginRight: '6px',
          lineHeight: '24px',
        }
  }, [largeSize])
  return (
    <div
      style={{
        display: 'flex',
        height: 39,
        justifyContent: 'space-between',
        ...outerStyle,
      }}
    >
      <div className="flex flex-row items-center">
        <span style={style}>{children}</span>
        {description}
      </div>
      {extra}
    </div>
  )
}
