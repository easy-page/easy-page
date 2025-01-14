import { IsRestrictEnum } from "@/common/constants"

export interface PromotionTime {
  // 是否限制, 1-是, 0-否, 本次传限制
  isRestrict: IsRestrictEnum
  // 活动开始时间
  startTime: number
  // 活动结束时间
  endTime: number
  // 周循环
  weekTimes: string
  // 生效时段
  period: string
  //活动时间
  actTime: number[]
}