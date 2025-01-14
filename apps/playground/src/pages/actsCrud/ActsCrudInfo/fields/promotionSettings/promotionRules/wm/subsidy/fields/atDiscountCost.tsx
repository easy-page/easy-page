import { nodeUtil } from '@easy-page/antd-ui'
import { atPercent } from './at/atPercent'
import { atMaxMoney } from './at/atMaxMoney'
import { PoiTypeEnum } from '@/common'
import {
  CommonSubActPageProps,
  CommonSubActPageState,
} from '@/pages/actsCrud/ActsCrudInfo/fields/interface'

// 菜品代理成本
export const agentDiscountCost = nodeUtil
  .createCustomField<any, CommonSubActPageState, CommonSubActPageProps>(
    'agentDiscountCost',
    '菜品代理成本',
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
          return (
            effectedData['poiType'] &&
            effectedData['poiType'] !== PoiTypeEnum.Direct
          )
        },
      },
    },
    {
      formItem: {
        tooltip:
          '配置后允许合作商城市经理在范围内设置代理补贴比例，当前仅支持自门店维度下发邀请的活动',
      },
      layout: { disableLayout: true },
    }
  )
  .appendChildren([atPercent({ min: 0, max: 100, unit: '%' }), atMaxMoney])
