import { timeRangeField } from '@/common/fields'
import { SearchRuleId } from './constant'

export const actCreateTime = timeRangeField({
  nodeId: SearchRuleId.ActivityTime,
  label: '活动时间',
})
