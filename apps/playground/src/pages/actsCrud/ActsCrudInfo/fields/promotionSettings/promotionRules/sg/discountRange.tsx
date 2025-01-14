import { RangeConfig } from '@/common/fields'
import { commonRange } from '../common'
import { PromotionKey } from '@/common'

export const DiscountRange: RangeConfig = {
  max: 9.9,
  min: 3,
}

export const discountRange = commonRange({
  id: 'discountRate',
  label: '折扣范围',
  range: DiscountRange,
  suffix: '折',
  formItemConfig: {
    tooltip: `指商品可报名的折扣率范围，支持设置 ${DiscountRange.min} - ${DiscountRange.max} 折。`,
  },
  placeholder: {
    max: `${DiscountRange.min}~${DiscountRange.max}之间`,
    min: `${DiscountRange.min}~${DiscountRange.max}之间`,
  },
  validateConfig: {
    errorMsg: `请输入${DiscountRange.min}~${DiscountRange.max}之间的数字，支持1位小数`,
  },
  fieldKey: PromotionKey.DiscountRate,
  relationValidate: {
    keys: [PromotionKey.DiscountRate, PromotionKey.Price],
    msg: `折扣范围、价格范围至少设置一个。仅设置价格范围时，折扣默认最大范围：${DiscountRange.min}-${DiscountRange.max} 折`,
  },
  effectedKeys: ['price'],
})
