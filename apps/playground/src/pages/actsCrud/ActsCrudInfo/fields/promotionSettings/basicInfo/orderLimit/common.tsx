import { commonRange } from '../../promotionRules/common'
import { RangeConfig } from '@/common/fields'
import { PromotionKey, SubsidyOptEnum } from '@/common'
import { Select } from 'antd'

export const OrderLimitRange: RangeConfig = {
  max: 999999,
  min: 1,
}

export const orderLimitRange = commonRange({
  id: 'orderLimitRange',
  label: '每单限购',
  range: OrderLimitRange,
  isRequired: true,
  validateConfig: {
    checkInteger: true,
    errorMsg: `${OrderLimitRange.min}~${OrderLimitRange.max}之间`,
  },
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
    max: `${OrderLimitRange.min}~${OrderLimitRange.max}之间`,
    min: `${OrderLimitRange.min}~${OrderLimitRange.max}之间`,
  },
  fieldKey: PromotionKey.OrderLimit,
})
