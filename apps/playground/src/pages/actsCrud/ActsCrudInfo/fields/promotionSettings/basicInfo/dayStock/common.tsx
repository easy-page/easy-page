import { commonRange } from '../../promotionRules/common'
import { RangeConfig } from '@/common/fields'
import { PromotionKey, SubsidyOptEnum } from '@/common'
import { Select } from 'antd'

export const DayStockRange: RangeConfig = {
  max: 999999,
  min: 1,
}

export const dayStockRange = commonRange({
  id: 'dayStockRange',
  label: '单日库存',
  range: DayStockRange,
  formItemConfig: {
    tooltip: '指活动商品的每日库存限制',
  },
  validateConfig: {
    checkInteger: true,
    errorMsg: `${DayStockRange.min}~${DayStockRange.max}之间`,
  },
  isRequired: true,
  prefix: (
    <Select
      defaultValue={SubsidyOptEnum.CloseInterval}
      disabled
      className="w-[100px] mr-1"
      options={[
        {
          label: '闭区间',
          value: SubsidyOptEnum.CloseInterval,
        },
      ]}
    />
  ),
  placeholder: {
    max: `${DayStockRange.min}~${DayStockRange.max}之间`,
    min: `${DayStockRange.min}~${DayStockRange.max}之间`,
  },
  fieldKey: PromotionKey.DayStock,
})
