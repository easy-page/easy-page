import { PeriodTypeEnum } from './constant'
import { Period } from './interface'

export const validateFrom00 = (period: Period) => {
  return (
    period[0].endsWith('00') &&
    (period[1].endsWith('00') || period[1].endsWith('23:59'))
  )
}

export const validateFrom30 = (period: Period) => {
  // 起点必须是：00 或者 30
  return (
    period[0].endsWith('30') &&
    (period[1].endsWith('30') || period[1].endsWith('23:59'))
  )
}

export const validateFrom30Or00 = (period: Period) => {
  // 起点必须是：00 或者 30
  return (
    (period[0].endsWith('30') || period[0].endsWith('00')) &&
    (period[1].endsWith('30') ||
      period[1].endsWith('00') ||
      period[1].endsWith('23:59'))
  )
}

export const hasCrossTime = (periodList: Period[]) => {
  if (periodList.length < 2) {
    return false
  }
  // 时间段不能交叉，需大于上一个时段的结束时间。
  const startList = []
  const endList = []
  for (let i = 0; i < periodList.length; i++) {
    startList.push(periodList[i][0])
    endList.push(periodList[i][1])
  }
  const startListCopy = startList.sort()
  const endListCopy = endList.sort()
  for (let i = 1; i < startListCopy.length; i++) {
    if (startListCopy[i] <= endListCopy[i - 1]) {
      return true
    }
  }
  return false
}

export const isValidPeriod = (
  periodList: Period[],
  periodType: PeriodTypeEnum[]
) => {
  if (periodType.length === 0) {
    return true
  }
  const res = periodList.every((each) => {
    const isFrom00 = validateFrom00(each)
    const isFrom30 = validateFrom30(each)

    if (periodType.length === 1 && periodType.includes(PeriodTypeEnum.From00)) {
      return isFrom00
    }
    if (periodType.length === 1 && periodType.includes(PeriodTypeEnum.From30)) {
      return isFrom30
    }
    if (
      periodType.includes(PeriodTypeEnum.From00) &&
      periodType.includes(PeriodTypeEnum.From30)
    ) {
      return validateFrom30Or00(each)
    }
    return false // Default case
  })
  return res
}

export const isValidTimeRange = (periods: Period[]) => {
  return periods.every((x) => compareRange(x))
}
export function compareRange(period: Period): boolean {
  if (period.length < 2) {
    return true
  }
  const [startTime, endTime] = period
  const toMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number)
    return hours * 60 + minutes
  }

  const minutes1 = toMinutes(startTime)
  const minutes2 = toMinutes(endTime)

  if (minutes1 < minutes2) return true // startTime 小于 endTime
  if (minutes1 >= minutes2) return false // startTime 大于 endTime
}
