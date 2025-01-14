import { RangeConfig } from '@/common/fields'
import { commonRange } from '../../common'
import { PromotionKey } from '@/common'

const DiscountRange: RangeConfig = {
  max: 9.99,
  min: 0.01,
}

export const dishDiscountPriceRate = commonRange({
  id: PromotionKey.DishDiscountPriceRate,
  label: '菜品折扣率',
  range: {
    max: DiscountRange.max,
    min: 0,
  },
  isRequired: false,
  formItemConfig: {
    tooltip: '',
  },
  suffix: '折',
  placeholder: {
    max: `可输入${DiscountRange.min}~${DiscountRange.max}之间的数字，支持最多2位小数。`,
    min: `可输入${DiscountRange.min}~${DiscountRange.max}之间的数字，支持最多2位小数。`,
  },
  validateConfig: {
    decimalNumber: 2,
    checkInteger: false,
    errorMsg: `可输入${DiscountRange.min}~${DiscountRange.max}之间的数字，支持最多2位小数`,
    checkInRange: DiscountRange,
  },
  extra: (
    <div className="text-sm mt-2">菜品折扣价格、菜品折扣率至少设置一个。</div>
  ),
  fieldKey: PromotionKey.DiscountRate,
  relationValidate: {
    keys: [PromotionKey.DishDiscountPriceRate, PromotionKey.DishDiscountPrice],
    msg: `菜品折扣价格、菜品折扣率至少设置一个。`,
  },

  effectedKeys: [PromotionKey.DishDiscountPriceRate],
})
