import {
  ChargeSideInfo,
  ISubActivity,
  PoiTypeEnum,
  checkNumberInvalid,
  removeLeadingZeros,
  toNumber,
} from '@/common'
import { nodeUtil } from '@easy-page/antd-ui'
import { CommonSubActPageState } from '@/pages/actsCrud/ActsCrudInfo'
import { appendSubsidyListToContentList } from '../../../utils'
import { getFromChargeDetailVos } from '../../../../sg/subsidy/utils'

export const mtMaxMoney = nodeUtil.createField<string, CommonSubActPageState>(
  'mtMaxMoney',
  '每单最高承担金额',
  {
    value: '',
    effectedKeys: ['mtPercent'],
    validate: ({ value, pageState }) => {
      if (pageState['mtPercent'] && !value && !value) {
        return {
          success: false,
          errorMsg: '请设置每单最高承担金额',
        }
      }
      const checkValid = (val: string) => {
        return checkNumberInvalid(val, {
          checkNumber: true,
          checkInRange: {
            min: 0,
            max: 100,
          },
          decimalNumber: 2, // 2位小数
        })
      }
      const valueMinCheckRes = checkValid(value)
      if (value && !valueMinCheckRes.success) {
        return {
          success: false,
          errorMsg: '可输入0-100之间的数字，支持2位小数。',
        }
      }
      return { success: true }
    },
    preprocess: ({ defaultValues }) => {
      const mtMaxMoney = getFromChargeDetailVos(
        defaultValues as ISubActivity,
        'meituan',
        'maxAmount'
      )
      if (mtMaxMoney) {
        return `${mtMaxMoney}`
      }
      return ''
    },
    postprocess(context) {
      const { value } = context
      if (!value) {
        return {}
      }
      return appendSubsidyListToContentList(context, {
        appendValue: (detailVo) => [
          {
            ...detailVo,
            meituan: {
              ...(detailVo?.meituan || {}),
              maxAmount: toNumber(value),
            } as ChargeSideInfo,
          },
        ],
      })
    },
  },
  {
    // ui: UI_COMPONENTS.SELECT,
    formItem: {
      tooltip: '配置后限制美团每单最高追加补贴金额',
      className: 'ml-2',
      layout: 'horizontal',
    },
    input: {
      placeholder: '0-100之间',
      allowClear: true,
      suffix: '元',
      handleChange: ({ onChange, value }) => {
        console.log(value)
        if (!value) {
          onChange({ target: { value: value } } as any)
        }
        const res = checkNumberInvalid(value as string, {
          checkNumber: true,
          // checkInteger: true,
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
