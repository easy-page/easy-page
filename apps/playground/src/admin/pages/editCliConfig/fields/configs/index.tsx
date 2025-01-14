import { nodeUtil } from '@easy-page/antd-ui'
import { isFilterEnabled } from './isFilterEnabled'
import { discountInfo } from './discountInfo'
import { merchantSubsidyFieldInfo } from './merchantSubsidyFieldInfo'
import { mtSubsidyFieldInfo } from './mtSubsidyFieldInfo'
import { priceRangeInfo } from './priceRangeInfo'
import { actPromotionType } from './promotionType'
import { qualify } from './qualify'

export const fieldsConfigContainer = nodeUtil
  .createContainer(
    'fieldsConfigContainer',
    ({ children }) => {
      return <div className="px-4 bg-[#f7fbfc] py-2 rounded-sm">{children}</div>
    },
    {
      childrenUIConfig: {
        formItem: {
          labelCol: { span: 8 },
          // layout: 'vertical',
        },
      },
    }
  )
  .appendChildren([
    isFilterEnabled,
    discountInfo,
    merchantSubsidyFieldInfo,
    mtSubsidyFieldInfo,
    priceRangeInfo,
    actPromotionType,
    qualify,
  ])
