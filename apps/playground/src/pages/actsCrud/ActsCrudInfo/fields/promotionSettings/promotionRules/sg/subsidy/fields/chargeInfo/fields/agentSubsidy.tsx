import { ChargeSideEnum, PoiTypeEnum } from '@/common'
import { nodeUtil } from '@easy-page/antd-ui'

import { subsidyField } from '../common'
import {
  CommonSubActPageState,
  CommonSubActPageProps,
} from '@/pages/actsCrud/ActsCrudInfo/fields/interface'

export const agentSubsidyField = nodeUtil.extends<
  any,
  CommonSubActPageState,
  CommonSubActPageProps
>(
  subsidyField({
    title: '代理商承担',
    id: 'agent',
    inputSuffix: '%',
    disabledMaxAmount: false,
    chargeSideCode: ChargeSideEnum.Agent,
    maxAmountValidateConfig: {
      errorMsg: `请输入0-999之间的数字，支持两位小数`,
      decimalNumber: 2,
    },
  }),
  {
    when() {
      return {
        effectedKeys: ['poiType'],
        show({ effectedData }) {
          return effectedData['poiType'] === PoiTypeEnum.Agent
        },
      }
    },
  }
)
