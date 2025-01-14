import { nodeUtil } from '@easy-page/antd-ui'
import { Input } from 'antd'
import {
  PriceExtra,
  SubsidyChargeKeyEnum,
  SubsidyConditionKeyEnum,
  SubsidyLevelEnum,
  SubsidyOptEnum,
  SubsidyRule,
  checkNumberInvalid,
  preprocessBaseLevelMerchantMaxSubsidy,
  removeLeadingZeros,
} from '@/common'

const DEFAULT_RANGE = {
  MIN: 0,
  MAX: 5000,
}

const WARNING_PRICE_LIMIT = 10

export const sqBaseLevelPrice = nodeUtil.createCustomField(
  'baseLevelPrice',
  '商家补贴要求',
  ({ value, onChange, disabled }) => {
    return (
      <div className="flex flex-row items-center ">
        <Input
          placeholder={`${DEFAULT_RANGE.MIN}~${DEFAULT_RANGE.MAX}之间`}
          value={value}
          disabled={disabled}
          className="w-[250px]"
          onChange={(e) => {
            const curVal = e.target.value

            const { success } = checkNumberInvalid(curVal, {
              checkNumber: true,
              checkInRange: {
                min: DEFAULT_RANGE.MIN,
                max: DEFAULT_RANGE.MAX,
              },
            })
            if (!curVal || success) {
              onChange(removeLeadingZeros(curVal))
            }
          }}
        />
        <div className="min-w-[200px] ml-2">元，不限制券门槛</div>
      </div>
    )
  },
  {
    value: '',
    preprocess({ defaultValues }) {
      return preprocessBaseLevelMerchantMaxSubsidy(defaultValues.subsidyRule)
    },
    postprocess({ value, processedFormData }) {
      const baseLevelInfo: SubsidyRule = {
        scene: SubsidyLevelEnum.Base,
        rule: [
          {
            condition: {
              key: SubsidyConditionKeyEnum.ScCouponThreshold,
              opt: SubsidyOptEnum.Unlimited,
              minValue: '',
              maxValue: '',
            },
            charge: [
              {
                key: SubsidyChargeKeyEnum.chargeSidePoi4Sg,
                opt: SubsidyOptEnum.Eq,
                minValue: value,
                maxValue: '',
              },
            ],
          },
        ],
      }
      const processedInfo = processedFormData.subsidyRule || []
      return {
        subsidyRule: [baseLevelInfo, ...processedInfo],
      }
    },
    required: true,
    validate: ({ value }) => {
      const { success } = checkNumberInvalid(value, {
        checkNumber: true,
        checkInRange: {
          min: DEFAULT_RANGE.MIN,
          max: DEFAULT_RANGE.MAX,
        },

        decimalNumber: 1,
        // endWith: [
        //   {
        //     sence(val) {
        //       return val.includes('.')
        //     },
        //     endWith: ['.0', '.5'],
        //   },
        // ],
      })

      const msg = `必填，${DEFAULT_RANGE.MIN}~${DEFAULT_RANGE.MAX}，支持一位小数。（不可为0）`

      if (value && Number(value) === 0) {
        return {
          success: false,
          errorMsg: msg,
        }
      }

      if (!value || !success) {
        return {
          success: false,
          errorMsg: msg,
        }
      }
      return { success: true }
    },
  },
  {
    formItem: {
      className: 'mb-0',
      customExtra: (props) => {
        return <PriceExtra {...props} priceWarningLimit={WARNING_PRICE_LIMIT} />
      },
    },
  }
)
