import { commonRangeInfo } from './common/commonRangeInfo'
import { commonUnit } from './common/commonUnit'
import { commonContainer } from './common/commonContainer'
import { showDecorator } from './common/showDecorator'

export const discountInfo = showDecorator(
  'discountRange',
  commonContainer('discountRange', '折扣范围字段配置').appendChildren([
    commonRangeInfo('discountRange', '范围', { extra: '折扣配置范围' }),
    commonUnit('discountRange.unit'),
  ])
)
