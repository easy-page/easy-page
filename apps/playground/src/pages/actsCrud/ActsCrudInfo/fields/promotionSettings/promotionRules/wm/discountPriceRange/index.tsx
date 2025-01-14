import { RangeConfig } from '@/common/fields'
import { commonRange } from '../../common'
import { PromotionKey } from '@/common'

const PriceRange: RangeConfig = {
  max: 99999,
  min: 0.01,
}

// 菜品折扣价格
export const dishDiscountPrice = commonRange({
  id: PromotionKey.DishDiscountPrice,
  label: '菜品折扣价格',
  range: {
    max: PriceRange.max,
    min: 0,
  },
  formItemConfig: {
    tooltip: '',
  },
  suffix: '元',
  placeholder: {
    max: `可输入${PriceRange.min}~${PriceRange.max}之间的数字，支持2位小数。`,
    min: `可输入${PriceRange.min}~${PriceRange.max}之间的数字，支持2位小数。`,
  },
  validateConfig: {
    decimalNumber: 2,
    checkInteger: false,
    errorMsg: `可输入${PriceRange.min}~${PriceRange.max}之间的数字，支持最多2位小数`,
    checkInRange: PriceRange,
  },

  fieldKey: PromotionKey.Price,
  relationValidate: {
    keys: [PromotionKey.DishDiscountPriceRate, PromotionKey.DishDiscountPrice],
    msg: `菜品折扣价格、菜品折扣率至少设置一个。`,
  },

  effectedKeys: [PromotionKey.DishDiscountPriceRate],
})
