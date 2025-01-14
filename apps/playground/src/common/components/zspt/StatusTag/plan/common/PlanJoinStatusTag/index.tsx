import { PLAN_STATUS_DESC, PlanJoinStatusEnum } from '@/common/constants'

import classNames from 'classnames'
import { StatusTagSizeEnum } from '../../../common'
import { PlanJoinStatusColors } from './constant'

export const PlanJoinStatusTag = ({
  status,
  children,
  size,
}: {
  status: PlanJoinStatusEnum
  size: StatusTagSizeEnum
  children?: any
}) => {
  const config = PlanJoinStatusColors[status]
  const text = PLAN_STATUS_DESC[status]
  return (
    <span
      style={{
        backgroundColor: config?.bgColor,
        color: config?.fontColor,
      }}
      className={classNames('rounded-sm  flex items-center w-fit', size)}
    >
      {children || text}
    </span>
  )
}
