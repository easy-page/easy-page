import {
  NumberOperator,
  SubsidyOptEnum,
  checkNumberInvalid,
  compareNumber,
  toNumber,
} from '@/common'
import { ChildFormState, nodeUtil } from '@easy-page/antd-ui'
import { Input } from 'antd'
import {
  BudgetRuleTableFormState,
  BudgetRuleTableFormProps,
} from '../interface'
import {
  StockRequestType,
  StockRequestEnum,
} from '@/common/apis/saveAct/interfaces/stockReq'
import {
  RangeConfig,
  RangeState,
  numberRangeField,
} from '@/common/fields/common/numberRangeField'
import { StockReqFormState } from '../../stockReq/interface'
import { getStockExpandLevel } from '../utils/getStoreBaseLevel'

const PriceRange: RangeConfig = {
  max: 999999,
  min: 1,
}

export const stockRequest = (id: StockRequestEnum) => {
  return nodeUtil.extends<
    RangeState,
    BudgetRuleTableFormState,
    BudgetRuleTableFormProps
  >(
    numberRangeField({
      id,
      label: '',
      range: PriceRange,
      denyZero: true,
      formItemConfig: {
        className: 'col-span-1 mb-0',
      },
      disabledMax: true,
      getFieldRange({ frameworkProps: { store } }) {
        const pageProps = store.getPageProps() as BudgetRuleTableFormProps
        const expandLevel = getStockExpandLevel(pageProps.stockRequest)
        return {
          min: PriceRange.min,
          max: expandLevel?.minValue || PriceRange.max,
        }
      },
      validateConfig: {
        errorMsg: '1-999999，仅支持整数',
        // decimalNumber: 1,
        checkInteger: true,
      },
    }),
    {
      actions: () => {
        return [
          {
            effectedKeys: ['stockRequest'],
            initRun: true,
            action: ({ value, effectedData }) => {
              const stockRequest = effectedData?.[
                'stockRequest'
              ] as ChildFormState<StockReqFormState>
              const expandLevel = getStockExpandLevel(stockRequest)
              const isLessThenDiffMin = compareNumber(
                expandLevel?.minValue,
                value.min,
                NumberOperator.Lt
              )
              console.log('value.min', value.min, isLessThenDiffMin)
              return {
                fieldValue: {
                  min: value.min,
                  max: expandLevel?.maxValue || '',
                },
                /** 有值就要校验 */
                validate: Boolean(value.min),
              }
            },
          },
        ]
      },
      validate(oldValidate) {
        return async (context) => {
          const { value, pageProps } = context
          const res = await oldValidate?.(context)
          if (!res.success) {
            return res
          }

          const stockRequest = pageProps?.[
            'stockRequest'
          ] as ChildFormState<StockReqFormState>
          const expandLevel = getStockExpandLevel(stockRequest)
          const isLessThenDiffMin = compareNumber(
            expandLevel?.minValue,
            value.min,
            NumberOperator.Lt
          )
          if (expandLevel?.minValue && isLessThenDiffMin) {
            return {
              success: false,
              errorMsg: '最小值需小于等于膨胀档位每日库存最小值',
            }
          }
          return {
            success: true,
          }
        }
      },
      preprocess() {
        return ({ defaultValues }) => {
          const stockRule: StockRequestType = defaultValues?.stockRule || []
          const curBudgetRule = stockRule.find((e) => e.key === id)
          return {
            min: curBudgetRule?.minValue,
            max: curBudgetRule?.maxValue,
          }
        }
      },
      postprocess() {
        return ({ value, processedFormData }) => {
          const stockRule: StockRequestType =
            processedFormData?.['stockRule'] || []
          stockRule.push({
            key: id,
            opt: SubsidyOptEnum.CloseInterval,
            minValue: value.min,
            maxValue: value.max,
          })
          return {
            stockRule,
          }
        }
      },
    }
  )
}
