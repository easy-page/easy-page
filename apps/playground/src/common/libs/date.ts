import dayjs, { Dayjs } from 'dayjs'

export enum FormatStyle {
  YYYYMMDDHHmmss = 'YYYY-MM-DD HH:mm:ss',
  YYYYMMDD = 'YYYY-MM-DD',
  YYYYMMDDHHmm = 'YYYY.MM.DD HH:mm',
}

export const formateDate = (
  date: string | number | Date | dayjs.Dayjs | null | undefined,
  format: FormatStyle
) => {
  if (!date) {
    return ''
  }
  const curDate = typeof date === 'number' ? date * 1000 : date
  return dayjs(curDate).format(format)
}

export const transformStringToDayjs = (
  timeRange: string
): Dayjs | undefined => {
  const timeArr = timeRange.split(':')
  return dayjs()
    .set('hour', Number(timeArr[0]) || 0)
    .set('minute', Number(timeArr[1]) || 0)
}

/** 判断是否超过 365 */
export function isExactly365DaysAgo(startTime: dayjs.Dayjs) {
  // 获取当前时间的 dayjs 对象
  const now = dayjs()

  // 计算365天后的时间的 dayjs 对象
  const future365 = now.add(365, 'day').startOf('day')

  const start = startTime.startOf('day')

  // 判断 startTime 是否在当前时间的365天后之前
  return start.isBefore(future365)
}

export function diffDaysBetweenTimestamps(
  timestamp1: dayjs.Dayjs,
  timestamp2: dayjs.Dayjs
): number {
  // 将时间戳转换为 dayjs 对象
  const date1 = dayjs(timestamp1)
  const date2 = dayjs(timestamp2)

  // 计算两个日期之间的天数差
  const diffDays = date2.diff(date1, 'day')

  // 返回天数差
  return Math.abs(diffDays) // 使用 Math.abs() 取绝对值，确保始终返回正数
}
