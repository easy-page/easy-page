import { PromotionKey } from '@/common'
import { commonRange } from '../../common'

const LimitRange = {
  max: 99999,
  min: 1,
}

// 每单限购份数
export const limitNumber = commonRange({
  id: 'limitNumber',
  label: '每单限购份数',
  range: LimitRange,
  isRequired: true,
  formItemConfig: {
    tooltip: '',
  },
  suffix: '份',
  placeholder: {
    max: `${LimitRange.min}~${LimitRange.max}之间`,
    min: `${LimitRange.min}~${LimitRange.max}之间`,
  },
  validateConfig: {
    decimalNumber: 2,
    checkInteger: true,
    errorMsg: `请输入${LimitRange.min}~${LimitRange.max}之间的数字，支持2位小数`,
    checkInRange: LimitRange,
  },
  fieldKey: PromotionKey.OrderLimit,
})
