import { PromotionKey } from '@/common'
import { commonRange } from '../../common'

const StockRange = {
  max: 99999,
  min: 1,
}

// 菜品优惠库存
export const dishSaleStock = commonRange({
  id: 'dishSaleStock',
  label: '菜品优惠库存',
  range: StockRange,
  isRequired: true,
  formItemConfig: {
    // tooltip: '指商品可报名的折扣活动价的范围，非商品原价。',
    tooltip: '',
  },
  suffix: '个',
  placeholder: {
    max: `${StockRange.min}~${StockRange.max}之间`,
    min: `${StockRange.min}~${StockRange.max}之间`,
  },
  validateConfig: {
    decimalNumber: 2,
    checkInteger: true,
    errorMsg: `请输入${StockRange.min}~${StockRange.max}之间的数字，支持2位小数`,
    checkInRange: StockRange,
  },
  fieldKey: PromotionKey.DayStock,
})
