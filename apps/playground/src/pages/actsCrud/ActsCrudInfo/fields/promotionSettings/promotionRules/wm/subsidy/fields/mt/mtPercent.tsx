import { nodeUtil } from '@easy-page/antd-ui'
import { CommonSubActPageState } from '@/pages/actsCrud/ActsCrudInfo/fields/interface'
import {
  ChargeSideEnum,
  ChargeSideInfo,
  ISubActivity,
  PromotionKey,
  checkNumberInvalid,
  removeLeadingZeros,
  toNumber,
} from '@/common'
import { appendSubsidyListToContentList } from '../../../utils'
import { getFromChargeDetailVos } from '../../../../sg'

export const mtPercent = nodeUtil.createField<string, CommonSubActPageState>(
  'mtPercent',
  '每单美团成本占比',
  {
    value: '',
    preprocess: ({ defaultValues }) => {
      const mtPercent = getFromChargeDetailVos(
        defaultValues as ISubActivity,
        'meituan',
        'chargeAmt'
      )
      if (mtPercent) {
        return `${mtPercent}`
      }
      return ''
    },
    postprocess(context) {
      const { value } = context
      if (!value) return {}
      return appendSubsidyListToContentList(context, {
        appendValue: (detailVo) => [
          {
            ...detailVo,
            meituan: {
              ...(detailVo?.meituan || {}),
              chargeSideCode: ChargeSideEnum.MeiTuanWaiMai,
              chargeAmt: toNumber(value),
            } as ChargeSideInfo,
          },
        ],
      })
    },
    effectedKeys: ['mtMaxMoney', 'atPercent'],
    validate: ({ value, pageState }) => {
      if (pageState['mtMaxMoney'] && !value && !value) {
        return {
          success: false,
          errorMsg: '请设置每单美团成本占比',
        }
      }

      if (toNumber(pageState['atPercent'].maxValue) + toNumber(value) > 100) {
        return {
          success: false,
          errorMsg:
            '【每单美团成本占比】与【每单代理成本占比】最大值之和需小于等于100',
        }
      }

      const checkValid = (val: string) => {
        return checkNumberInvalid(val, {
          checkNumber: true,
          checkInteger: true,
          checkInRange: {
            min: 0,
            max: 100,
          },
        })
      }
      const checkRes = checkValid(value)

      if (value && !checkRes.success) {
        return {
          success: false,
          errorMsg: '可输入0-100之间的数字，仅支持整数。',
        }
      }
      return { success: true }
    },
  },
  {
    formItem: {},
    input: {
      placeholder: '0-100之间',
      allowClear: true,
      suffix: '%',
      handleChange: ({ onChange, value }) => {
        console.log(value)
        if (!value) {
          onChange({ target: { value: value } } as any)
        }
        const res = checkNumberInvalid(value as string, {
          checkNumber: true,
          checkInteger: true,
          checkInRange: {
            min: 0,
            max: 100,
          },
        })
        if (res.success) {
          onChange({ target: { value: removeLeadingZeros(value) } } as any)
        }
      },
    },
  }
)
