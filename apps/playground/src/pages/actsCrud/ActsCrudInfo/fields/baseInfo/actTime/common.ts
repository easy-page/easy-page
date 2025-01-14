import { actTimeRange, ActTimeRangeUnitEnum } from './fields/timeRange'
import { baseActTime } from './fields'
import { actTimeLimitOption, actTimeNoLimitOption } from './options'
import { nodeUtil } from '@easy-page/antd-ui'
import { ActTimeLimit } from './constant'
import { ChargeSideEnum } from '@/common'

/** 具备限制、不限制选项的活动生效时间 */
export const commonActTime = baseActTime().appendChildren([
  actTimeNoLimitOption(),
  actTimeLimitOption().appendChildren([actTimeRange({})]),
])

/** 只有活动生效时间字段，无：限制不限制 */
export const commonActTimeRange = nodeUtil.extends(actTimeRange({}), {
  name: '活动生效时间',
  required: true,
  postprocess(oldPostprocess) {
    return (context) => {
      return {
        ...oldPostprocess(context),
        'activity.promotionTime.isRestrict': ActTimeLimit.Limit,
      }
    }
  },
})

export const unionCouponActTimeRange = nodeUtil.extends(
  actTimeRange({
    unit: ActTimeRangeUnitEnum.Year,
    diffRange: 10,
  }),
  {
    name: '活动生效时间',
    required: true,
    postprocess(oldPostprocess) {
      return (context) => {
        return {
          ...oldPostprocess(context),
          'activity.promotionTime.isRestrict': ActTimeLimit.Limit,
        }
      }
    },
  }
)
