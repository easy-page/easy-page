import dayjs from 'dayjs'
import { CommonActCrudFormState } from '../../../interface'
import { Empty, Validate } from '@easy-page/antd-ui'
import { ActTimeLimit } from '../../actTime/constant'

/**
 * 判断【活动时间】和【周循环】之间需要存在时间交叉
 */
const isActTimeIncludeWeek = (
  startDate: number,
  endDate: number,
  weeks: number[]
) => {
  let startTime = startDate
  const endTime = endDate
  const weeksArr: number[] = []
  while (startTime <= endTime) {
    // 直到结束日期，跳出循环
    let weekNum: number = dayjs(startTime).day()
    // 处理周日，当前周日为：7，dayjs 默认为0
    weekNum = weekNum === 0 ? 7 : weekNum
    if (!weeksArr.includes(weekNum)) {
      weeksArr.push(weekNum)
      // 超过7天一定会包含周循环，直接返回true，校验通过
      if (weeksArr.length >= 7) {
        return true
      }
    }
    // 每次递增1天
    startTime = startTime + 24 * 60 * 60
  }
  return weeksArr.some((item) => weeks.includes(item))
}

export const weekDaysValidate: Validate<
  number[],
  CommonActCrudFormState,
  Empty
> = ({ value, pageState }) => {
  if (!value || value.length === 0) {
    return { success: false, errorMsg: '周循环至少勾选一个选项' }
  }
  // const isRestrict =
  //   pageState['promotionTime.isRestrict'] === `${ActTimeLimit.Limit}`
  const startTime = pageState['promotionTime.timeRange']?.[0]
  const endTime = pageState['promotionTime.timeRange']?.[1]
  if (
    // isRestrict &&
    startTime &&
    endTime &&
    !isActTimeIncludeWeek(startTime.valueOf(), endTime.valueOf(), value)
  ) {
    return {
      success: false,
      errorMsg: '【活动生效时间】和【周循环】之间需要存在时间交叉',
    }
  }
  return { success: true }
}
