import { Validate, nodeUtil } from '@easy-page/antd-ui'
import {
  MerchantMaxSubsidyField,
  NumberOperator,
  PriceExtra,
  checkNumberInvalid,
  compareNumber,
  removeLeadingZeros,
} from '@/common'
import { MerchantMaxSubsidyFormProps } from '../interface'
import { validateExpandLevelPrice } from '../../validates'
import { MerchantMaxSubsidyFormState } from '../../../subPlan'

const MerchantRequestPriceRange = {
  Max: 20,
  Min: 0,
}
export type MerchantRequestPriceProps = {
  validate?: Validate<string>
  errorMsg?: string
  effectedKeys?: (
    | keyof MerchantMaxSubsidyField
    | 'stepNumber'
    | keyof MerchantMaxSubsidyFormProps
  )[]
  range?: {
    Max: number
    Min: number
  }
}

const WARNING_PRICE_LIMIT = 10

export const merchantRequestPrice = ({
  errorMsg = '必填，小数需以0.5结束。（不可为0）',
  range = MerchantRequestPriceRange,
  effectedKeys,
  validate = validateExpandLevelPrice,
}: MerchantRequestPriceProps = {}) => {
  return nodeUtil.createField<
    string,
    MerchantMaxSubsidyFormState,
    MerchantMaxSubsidyFormProps
  >(
    'merchantRequestPrice',
    '',
    {
      value: '',
      validate: async (context) => {
        const { value, pageProps } = context

        const { lastFormUtil } = pageProps
        const res = await validate(context)
        if (!res.success) {
          return res
        }

        if (value && Number(value) === 0) {
          return {
            success: false,
            errorMsg: errorMsg,
          }
        }
        // 验证比上一个阶梯的值大
        const lastVal = lastFormUtil?.getFieldValue?.('merchantRequestPrice')
        if (lastVal && !compareNumber(value, lastVal, NumberOperator.Gt)) {
          return {
            success: false,
            errorMsg: '高阶梯补贴金额需大于低阶梯补贴金额',
          }
        }
        return { success: true }
      },
      effectedKeys: effectedKeys,
    },
    {
      formItem: {
        className: 'col-span-3 mb-0',
        customExtra: (props) => {
          return (
            <PriceExtra {...props} priceWarningLimit={WARNING_PRICE_LIMIT} />
          )
        },
      },
      input: {
        className: 'w-[100px]',
        placeholder: '请输入',
        handleChange: ({ onChange, value }) => {
          if (!value) {
            onChange({ target: { value: value } } as any)
          }
          const res = checkNumberInvalid(value as string, {
            checkNumber: true,
            checkInRange: {
              min: range.Min || MerchantRequestPriceRange.Min,
              max: range.Max || MerchantRequestPriceRange.Max,
            },
          })
          if (res.success) {
            onChange({ target: { value: removeLeadingZeros(value) } } as any)
          }
        },
      },
    }
  )
}
