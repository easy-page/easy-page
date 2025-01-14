import { nodeUtil } from '@easy-page/antd-ui'
import { QuestionTooltip } from '@/common/components/base/QuestionTooltip'
import { shopPercent } from './shop/shopPercent'

export const dishShopCost = nodeUtil
  .createCustomField(
    'dishShopCost',
    '菜品商家成本',
    ({ children }) => {
      return <div className="flex flex-row ">{children}</div>
    },
    {
      postprocess(context) {
        return {}
      },
      when: {
        effectedKeys: ['poiType'],
        show({ effectedData }) {
          return effectedData['poiType']
        },
      },
    },
    {
      formItem: {
        // tooltip: 'xxxx',
        customExtra: () => (
          <>
            美团/代理成本命中最高承担金额限制时，可能突破【每单商家成本占比】的范围。
          </>
        ),
      },
      layout: { disableLayout: true },
    }
  )
  .appendChildren([shopPercent({ min: 0, max: 100, unit: '%' })])
