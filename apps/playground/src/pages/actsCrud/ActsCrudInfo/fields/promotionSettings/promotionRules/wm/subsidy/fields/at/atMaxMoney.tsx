import {
  checkNumberInvalid,
  ISubActivity,
  PromotionKey,
  removeLeadingZeros,
  SubsidyOptEnum,
  toNumber,
} from '@/common'
import { nodeUtil } from '@easy-page/antd-ui'
import { appendToKeyList } from '../../../utils'
import { getKeyListInfo } from '../../../../utils'

export const atMaxMoney = nodeUtil.createField<string>(
  'atMaxMoney',
  '每单最高承担金额',
  {
    value: '0',
    preprocess: ({ defaultValues }) => {
      const info = getKeyListInfo({
        defaultValues: defaultValues as ISubActivity,
        key: PromotionKey.AgentSubsidyMax,
      })
      console.log('infoinfo:', info?.min, info?.min?.length)
      return info?.min || '0'
    },
    postprocess(context) {
      const { value } = context
      if (!value) {
        return
      }
      return appendToKeyList(context, {
        appendValue(keyList) {
          const { value } = context
          keyList.push({
            key: PromotionKey.AgentSubsidyMax,
            minValue: value,
            opt: SubsidyOptEnum.Eq,
          })
          return keyList
        },
      })
    },
    effectedKeys: ['atPercent'],
    validate: ({ value, pageState }) => {
      console.log('atPercent', pageState['atPercent'])
      if (
        pageState['atPercent'].maxValue &&
        pageState['atPercent'].minValue &&
        !value
      ) {
        return {
          success: false,
          errorMsg: '请设置每单最高承担金额',
        }
      }
      // if (toNumber(value) > 100) {
      //   return {
      //     success: false,
      //     errorMsg: '可输入0-100之间的数字，支持2位小数。',
      //   }
      // }
      const checkValid = (val: string) => {
        return checkNumberInvalid(val, {
          checkNumber: true,
          checkInteger: false,
          decimalNumber: 2, // 最多支持2位小数
          checkInRange: {
            min: 0,
            max: 100,
          },
        })
      }
      if (value && !checkValid(value).success) {
        return {
          success: false,
          errorMsg: '可输入0-100之间的数字，支持2位小数。',
        }
      }
      return { success: true }
    },
  },
  {
    // ui: UI_COMPONENTS.SELECT,
    formItem: {
      disabled: true,
      className: 'ml-2',
      layout: 'horizontal',
      tooltip: '配置后限制合作商每单最高追加补贴金额',
    },
    input: {
      placeholder: '0-100之间',
      allowClear: true,
      suffix: '元',
      handleChange: ({ onChange, value }) => {
        console.log('vvvasdasasd:', value)
        if (!value) {
          onChange({ target: { value: value } } as any)
        }
        const res = checkNumberInvalid(value as string, {
          checkNumber: true,
          checkInteger: false,
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
