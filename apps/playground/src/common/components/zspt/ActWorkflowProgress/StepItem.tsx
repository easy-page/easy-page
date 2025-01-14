import React, { useMemo } from 'react'
import { CountdownStatusEnum, useCountdown } from './hooks/useCountdown'
import {
  ACTIVITY_STATUS_DESC,
  ActivityStatusEnum,
  FlowNodeCodeEnum,
} from '@/common/constants'
import './index.less'
import { Tag } from 'antd'
import { RooIcon } from '../RooIcon'
import { formateDate, FormatStyle } from '@/common/libs'
interface IProps {
  item: any
  activityStatus: ActivityStatusEnum
  stopStatus: boolean
  isExistParallelNode: boolean
  isLast?: boolean
}
export const StepItem: React.FC<IProps> = (props) => {
  const {
    item,
    activityStatus,
    stopStatus,
    isExistParallelNode,
    isLast = false,
  } = props
  const { text, status } = useCountdown(
    item.startTime * 1000,
    item.endTime * 1000
  )
  console.log('text:', text)
  const stepStatus = useMemo((): string => {
    if (stopStatus) {
      return 'roo-steps-error'
    } else {
      if (status === CountdownStatusEnum.InProgress) {
        return 'roo-steps-active'
      }
      if (status === CountdownStatusEnum.Waiting) {
        return `roo-steps-wait`
      }
      return `roo-steps-finish`
    }
  }, [status, activityStatus, stopStatus])

  const startTimeText = useMemo(() => {
    if (!item.startTime && item.flowNodeCode === FlowNodeCodeEnum.BrandApply) {
      return '活动发邀请后'
    }
    if (
      !item.startTime &&
      item.flowNodeCode === FlowNodeCodeEnum.BrandOperateAudit
    ) {
      return '品牌商报名后'
    }
    return formateDate(item.startTime, FormatStyle.YYYYMMDDHHmmss)
  }, [item.startTime])

  const stepContent = useMemo((): React.ReactNode => {
    return (
      <div className="roo-steps-item-content">
        <div className="roo-steps-title">
          <span
            style={{ display: 'block', lineHeight: '25px' }}
            className="title-text mr-2"
          >
            {item.flowNodeName}
          </span>
          <Tag
            color={`${
              stopStatus
                ? '#BABCCC'
                : status === CountdownStatusEnum.InProgress
                ? '#386BFF'
                : status === CountdownStatusEnum.End
                ? 'var(--primary)'
                : 'var(--gray-200)'
            }`}
          >
            {stopStatus ? ACTIVITY_STATUS_DESC[activityStatus] : text}
          </Tag>
        </div>
        <div className="roo-steps-desc">{`${startTimeText}-${formateDate(
          item.endTime,
          FormatStyle.YYYYMMDDHHmmss
        )}`}</div>
      </div>
    )
  }, [item, activityStatus, status, text, stopStatus])

  const skey = useMemo((): React.ReactNode => {
    if (stopStatus) {
      return (
        <div className="roo-steps-icon-content">
          {<RooIcon size={25} name="warning" />}
        </div>
      )
    } else {
      if (status === CountdownStatusEnum.End) {
        //时间已结束
        return (
          <div className="roo-steps-icon-content">
            {<RooIcon size={20} name="check" />}
          </div>
        )
      }
      if (status === CountdownStatusEnum.InProgress) {
        //进行中

        return (
          <div className="roo-steps-icon-content">
            {<RooIcon size={20} name="countdown" />}
          </div>
        )
      }
      return (
        //待开始
        <div className="roo-steps-icon-content">
          {<RooIcon size={25} name="time" />}
        </div>
      )
    }
  }, [status, stopStatus])

  return (
    <li
      className={`roo-steps-item mr-12 ${stepStatus} ${
        isExistParallelNode && 'parallel'
      }`}
    >
      {/* <div className="roo-steps-tail" /> */}
      {!isLast ? <div className="roo-steps-line " /> : <></>}
      <div className="roo-steps-icon">{skey}</div>
      {stepContent}
    </li>
  )
}
