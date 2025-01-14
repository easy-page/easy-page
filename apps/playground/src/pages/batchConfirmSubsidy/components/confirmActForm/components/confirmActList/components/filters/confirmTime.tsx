import { timeRangeField } from '@/common/fields'
import { SearchRuleId } from './constant'

export const confirmTime = timeRangeField({
  nodeId: SearchRuleId.ConfirmTime,
  label: '合作运营确认时间',
})
