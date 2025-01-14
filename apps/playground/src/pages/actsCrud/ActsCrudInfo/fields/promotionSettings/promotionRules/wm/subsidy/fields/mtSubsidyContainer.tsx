import { nodeUtil } from '@easy-page/antd-ui'
import { mtMaxMoney } from './mt/mtMaxMoney'
import { mtPercent } from './mt/mtPercent'
import {
  CommonSubActPageState,
  CommonSubActPageProps,
} from '@/pages/actsCrud/ActsCrudInfo/fields/interface'

export const mtDiscountCost = nodeUtil
  .createCustomField<any, CommonSubActPageState, CommonSubActPageProps>(
    'mtDiscountCost',
    '菜品美团成本',
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
          return effectedData['poiType'] ? true : false
        },
      },
    },
    {
      formItem: {
        tooltip:
          '支持配置单菜品维度、美团出资比例。美团成本=(菜品原价-菜品活动价)×比例%',
      },
      layout: { disableLayout: true },
    }
  )
  .appendChildren([mtPercent, mtMaxMoney])
