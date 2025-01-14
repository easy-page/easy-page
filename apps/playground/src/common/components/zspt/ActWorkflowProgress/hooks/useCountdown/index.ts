import { useState, useEffect, useMemo } from 'react'
import { isNil } from 'lodash'
import dayjs, { Dayjs } from 'dayjs'

export enum CountdownStatusEnum {
  Waiting = 0, // 待开始
  InProgress = 1, // 进行中
  End = 2, // 已结束
}

export const useCountdown = (startPoint: number, endPoint: number) => {
  const [startDiffTime, setStartDiffTime] = useState<number>()
  const [endDiffTime, setEndDiffTime] = useState<number>()

  useEffect(() => {
    if (!startPoint || !endPoint) {
      return
    }

    let timer: any

    const calculateDiffTime = () => {
      // 并且每次都用活动开始和结束时间实时计算，避免浏览器退到后台定时不准确
      const startDiffTime = dayjs(startPoint).diff(dayjs(), 'second')
      const endDiffTime = dayjs(endPoint).diff(dayjs(), 'second')
      setStartDiffTime(startDiffTime)
      setEndDiffTime(endDiffTime)
      if (endDiffTime < 0) {
        // 已结束
      } else {
        // 未结束

        // 只要是未结束就开启定时器
        timer = setTimeout(() => {
          calculateDiffTime()
        }, 1000)
      }
    }
    calculateDiffTime()

    return () => {
      timer && clearTimeout(timer)
      timer = undefined
    }
  }, [startPoint, startPoint])

  return useMemo(() => {
    if (isNil(startDiffTime) || isNil(endDiffTime)) {
      return {
        text: '待开始',
        status: CountdownStatusEnum.Waiting,
        isInProgress: false,
      }
    }

    if (startDiffTime < 0) {
      // 已开始
      if (endDiffTime > 0) {
        // 进行中
        const days = dayjs(endPoint).diff(dayjs(), 'day')
        if (days > 0) {
          // 剩余时间大于 1 天
          return {
            text: `${days} 天后结束`,
            status: CountdownStatusEnum.InProgress,
            isInProgress: true,
          }
        } else {
          // 剩余时间小于等于 1 天，计算小时、分钟和秒
          const secondsLeft = endDiffTime
          const hours = Math.floor(secondsLeft / 3600)
          const minutes = Math.floor((secondsLeft % 3600) / 60)
          const seconds = secondsLeft % 60
          const formattedTime = `${String(hours).padStart(2, '0')}:${String(
            minutes
          ).padStart(2, '0')}:${String(seconds).padStart(2, '0')} 后结束`

          return {
            text: formattedTime,
            status: CountdownStatusEnum.InProgress,
            isInProgress: true,
          }
        }
      } else {
        // 已结束
        return {
          text: '已结束',
          status: CountdownStatusEnum.End,
          isInProgress: false,
        }
      }
    } else {
      // 待开始
      return {
        text: '待开始',
        status: CountdownStatusEnum.Waiting,
        isInProgress: false,
      }
    }
  }, [startDiffTime, endDiffTime])
}
