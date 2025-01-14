import { RangeConfig } from '@/common/fields'
import { commonRange } from '../common'
import { PromotionKey } from '@/common'
import { DiscountRange } from './discountRange'

const PriceRange: RangeConfig = {
  max: 999999,
  min: 0,
}

export const priceRange = commonRange({
  id: 'price',
  label: '价格范围',
  range: PriceRange,
  formItemConfig: {
    tooltip: '指商品可报名的折扣活动价的范围，非商品原价。',
  },
  suffix: '元',
  placeholder: {
    max: `${PriceRange.min}~${PriceRange.max}之间`,
    min: `${PriceRange.min}~${PriceRange.max}之间`,
  },
  validateConfig: {
    decimalNumber: 2,
    errorMsg: `请输入${PriceRange.min}~${PriceRange.max}之间的数字，支持2位小数`,
  },
  extra: (
    <div className="text-sm mt-2">
      折扣范围、价格范围至少设置一个。仅设置价格范围时，折扣默认最大范围：
      {DiscountRange.min}-{DiscountRange.max}折
    </div>
  ),
  fieldKey: PromotionKey.Price,
  relationValidate: {
    keys: [PromotionKey.DiscountRate, PromotionKey.Price],
    msg: `折扣范围、价格范围至少设置一个。仅设置价格范围时，折扣默认最大范围：${DiscountRange.min}-${DiscountRange.max} 折`,
  },
  effectedKeys: ['discountRate'],
})
