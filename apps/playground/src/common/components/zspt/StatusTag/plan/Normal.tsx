import { PlanInfo } from '@/common/apis'
import { ActivityStatusEnum, PlanStatusEnum } from '@/common/constants'
import { Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { PlanStatusTag } from './common'
import { StatusTagSizeEnum } from '../common/constant'

const getAmount = (status: ActivityStatusEnum, row: PlanInfo) => {
  return (
    row.activityStatusAmount?.find((item) => item.activityStatus === status)
      ?.amount || 0
  )
}

export const PlanStatus = (props: { row: PlanInfo }) => {
  const { row } = props
  //待邀请的活动数量
  const createdActAmount = getAmount(ActivityStatusEnum.Created, row)
  //已暂停的活动数量
  const pausedActAmount = getAmount(ActivityStatusEnum.Pause, row)

  // 展示邀请数据
  const showAmount =
    row.status === PlanStatusEnum.Published &&
    (createdActAmount > 0 || pausedActAmount > 0)
  return (
    <div className="flex flex-row items-center">
      <PlanStatusTag
        size={StatusTagSizeEnum.Small}
        status={row.status as PlanStatusEnum}
      >
        {row.statusDesc}
      </PlanStatusTag>
      {showAmount ? (
        <Tooltip
          title={
            <ul className="text-red font-sm">
              {createdActAmount ? (
                <li>{createdActAmount}个活动待邀请</li>
              ) : (
                <></>
              )}
              {pausedActAmount ? <li>{pausedActAmount}个活动已暂停</li> : <></>}
            </ul>
          }
        >
          <QuestionCircleOutlined className="ml-2" />
        </Tooltip>
      ) : (
        <></>
      )}
    </div>
  )
}
