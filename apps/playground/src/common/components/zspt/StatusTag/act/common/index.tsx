import {
  ActivityConfirmStatusEnum,
  ActivityStatusEnum,
} from '@/common/constants'
import classNames from 'classnames'
import { ActConfirmStatusColors, ActStatusColors } from './constant'
import { StatusTagSizeEnum } from '../../common/constant'
import { ShowStatusBoxProps } from '../../common'

export const ActStatusTag = ({
  status,
  children,
  size,
}: {
  status: ActivityStatusEnum
  size: StatusTagSizeEnum
  children?: any
}) => {
  const config = ActStatusColors[status] || ({} as ShowStatusBoxProps)
  return (
    <span
      style={{
        backgroundColor: config?.bgColor,
        color: config?.fontColor,
      }}
      className={classNames('rounded-sm  flex items-center w-fit', size)}
    >
      {children}
    </span>
  )
}

export const ActConfirmStatusTag = ({
  status,
  children,
  size,
}: {
  status: ActivityConfirmStatusEnum
  size: StatusTagSizeEnum
  children?: any
}) => {
  const config = ActConfirmStatusColors[status]
  if (!config || !children) {
    return <></>
  }
  return (
    <div className="flex items-center justify-center">
      <span
        style={{
          backgroundColor: config.bgColor,
          color: config.fontColor,
        }}
        className={classNames(
          'rounded-sm  flex items-center justify-center w-fit',
          size
        )}
      >
        {children}
      </span>
    </div>
  )
}
