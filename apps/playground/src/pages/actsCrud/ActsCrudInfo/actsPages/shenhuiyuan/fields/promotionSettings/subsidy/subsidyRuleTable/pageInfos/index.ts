import { allDayLinePageInfo } from "./allDayLinePageInfo"
import { firstLinePeriodInfo } from "./firstLinePeriodInfo"
import { getOtherLinePageInfo } from "./otherLinePeriodInfo"
import { userGroupLinePageInfo } from "./userGroupLinePageInfo"

export const getPageInfo = (idx: number) => {
  if (idx === 0) {
    return userGroupLinePageInfo
  }
  if (idx === 1) {
    return allDayLinePageInfo
  }
  if (idx === 2) {
    return firstLinePeriodInfo
  }
  return getOtherLinePageInfo()
}