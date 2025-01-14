import { nodeUtil } from '@easy-page/antd-ui'
import { commonRangeInfo } from './common/commonRangeInfo'
import { commonUnit } from './common/commonUnit'
import { commonContainer } from './common/commonContainer'
import { showDecorator } from './common/showDecorator'

export const priceRangeInfo = showDecorator(
  'priceRange',
  commonContainer('priceRange', '价格范围字段配置').appendChildren([
    commonRangeInfo('priceRange', '范围', { extra: '价格配置范围' }),
    commonUnit('priceRange.unit'),
  ])
)
