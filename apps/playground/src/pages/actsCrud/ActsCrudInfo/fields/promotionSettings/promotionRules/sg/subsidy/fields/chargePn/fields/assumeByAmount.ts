import { ChargeTypeEnum } from '@/common/constants'
import { nodeUtil, InputEffectedType } from '@easy-page/antd-ui'
import { set } from 'lodash'
import { assumeByPercent } from './assumeByPercent'
import { ChargeSidePnPageProps } from '../chargePnForm/interface'
import { toNumber } from '@/common'
import { ChargeSidePnPageState } from '@/pages/actsCrud/ActsCrudInfo/fields/interface'

export const assumeByAmount = nodeUtil.createField<
  string,
  ChargeSidePnPageState,
  ChargeSidePnPageProps,
  InputEffectedType
>(
  'amount',
  '承担金额',
  {
    required: true,

    when: {
      effectedKeys: ['chargeType'],
      show({ effectedData }) {
        const chargeType = effectedData['chargeType']
        return chargeType?.choosed === `${ChargeTypeEnum.Amount}`
      },
    },

    postprocess({ value }) {
      return {
        chargeAmt: toNumber(value),
      }
    },
    preprocess({ defaultValues }) {
      if (defaultValues.chargeAmt !== undefined) {
        return `${defaultValues.chargeAmt}`
      }
      return ''
    },
  },
  {
    input: {
      addonAfter: '元',
      placeholder: '请输入',
      trigger: 'onBlur',
    },
  }
)
