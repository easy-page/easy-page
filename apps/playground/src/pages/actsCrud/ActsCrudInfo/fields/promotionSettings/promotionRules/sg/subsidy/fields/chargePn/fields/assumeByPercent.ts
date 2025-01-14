import { ChargeTypeEnum } from '@/common/constants'
import {
  nodeUtil,
  InputEffectedType,
  getChildrenFormData,
} from '@easy-page/antd-ui'
import { ChargeSidePnPageProps } from '../chargePnForm/interface'
import { checkNumberInvalid, toNumber } from '@/common'
import { sum } from 'lodash'
import { isEmptyMtChargeAmt } from '../utils'
import { ChargeSidePnPageState } from '@/pages/actsCrud/ActsCrudInfo/fields/interface'

export const assumeByPercent = nodeUtil.createField<
  string,
  ChargeSidePnPageState,
  ChargeSidePnPageProps,
  InputEffectedType
>(
  'chargeAmt',
  '承担比例',
  {
    required: true,
    when: {
      effectedKeys: ['chargeType'],
      show({ effectedData }) {
        const chargeType = effectedData['chargeType']
        return chargeType?.choosed === `${ChargeTypeEnum.Percentage}`
      },
    },
    validate: ({ pageProps, value }) => {
      const mtCharge = pageProps['meituan.chargeAmt']
      if (isEmptyMtChargeAmt(mtCharge)) {
        return { success: true }
      }
      if (!value) {
        return { success: false, errorMsg: '承担值为空' }
      }
      const res = checkNumberInvalid(value, {
        checkNumber: true,
        checkInRange: {
          min: 1,
          max: 100,
        },
      })
      if (!res.success) {
        return {
          success: false,
          errorMsg: `请输入1-100之间整数`,
        }
      }
      const pns = pageProps['pns.chargeSidePnform']
      const onlyOnePn = pns.childForms?.length === 1
      const pnsFormInfo = getChildrenFormData(pns?.formUtils)

      const count = onlyOnePn ? 100 : sum(pnsFormInfo.map((x) => x.chargeAmt))

      if (count !== 100) {
        return { success: false, errorMsg: '承担比例之和需为100%' }
      }
      return { success: true }
    },
    actions: [
      {
        effectedKeys: ['pns.chargeSidePnform', 'meituan.chargeAmt'],
        initRun: true,
        action: ({ effectedData, value, initRun }) => {
          const mtCharge = effectedData['meituan.chargeAmt']
          const pns = effectedData['pns.chargeSidePnform']?.childForms
          const onlyOnePn = pns?.length === 1
          const getEffectedVal = () => {
            if (mtCharge === '0' || (!initRun && !mtCharge)) {
              /**
               * - 如果是这种情况，修改了值，变成 0，则会导致无限死循环
               * - 需要思考下如何处理
               *  */
              return {}
            }
            return onlyOnePn && value !== '100'
              ? {
                  fieldValue: '100',
                }
              : {}
          }
          const effectValue = getEffectedVal()

          return {
            ...effectValue,
            effectResult: {
              inputProps: onlyOnePn
                ? {
                    disabled: true,
                  }
                : {},
            },
          }
        },
      },
      // {
      //   effectedKeys: ['meituan.chargeAmt'],
      //   action: ({ effectedData }) => {

      //     if (mtCharge === '0') {
      //       return {
      //         fieldValue: '0',
      //       }
      //     }
      //     return {}
      //   },
      // },
    ],
    postprocess({ value }) {
      return {
        chargeAmt: toNumber(value),
      }
    },
    preprocess({ pageProps, defaultValues }) {
      if (defaultValues.chargeAmt !== undefined) {
        return `${defaultValues.chargeAmt}`
      }
      const pns = pageProps['pns.chargeSidePnform']?.childForms
      return pns?.length > 1 ? '' : '100'
    },
  },
  {
    input: {
      addonAfter: '%',
      placeholder: '1-100之间',
      trigger: 'onBlur',
    },
  }
)
