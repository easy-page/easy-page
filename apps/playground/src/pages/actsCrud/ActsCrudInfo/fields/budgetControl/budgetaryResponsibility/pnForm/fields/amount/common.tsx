import { nodeUtil } from '@easy-page/antd-ui'
import {
  ActivityStatusEnum,
  checkNumberInvalid,
  IBudget,
  isCopy,
  isCreate,
  isEdit,
  isView,
  PriceExtra,
  removeLeadingZeros,
  toNumber,
} from '@/common'
import { BudgetaryPnPageState } from '@/pages/actsCrud/ActsCrudInfo/fields/interface'
import { BudgetaryPnPageProps } from '../../interface'
const WARNING_PRICE_LIMIT = 10

export const commonBudgetAmount = nodeUtil.createField<
  string,
  BudgetaryPnPageState,
  BudgetaryPnPageProps
>(
  'budgetAmount',
  '承担，预算金额:',
  {
    postprocess: ({ value }) => {
      return {
        budget: value,
      }
    },
    preprocess({ defaultValues }) {
      return defaultValues.budget
    },
    validate: ({ value }) => {
      if (!value || !toNumber(value)) {
        return { success: false, errorMsg: '请输入1-9999999之间的整数' }
      }

      if (toNumber(value) < 0 || toNumber(value) > 9999999) {
        return { success: false, errorMsg: '请输入1-9999999之间的整数' }
      }
      return {
        success: true,
      }
    },
  },
  {
    input: {
      placeholder: '1-9999999之间',
      suffix: '元',
      handleChange: ({ onChange, value }) => {
        if (!value) {
          onChange({ target: { value: value } } as any)
        }
        const res = checkNumberInvalid(value as string, {
          checkNumber: true,
          checkInteger: true,
          checkInRange: {
            min: 1,
            max: 9999999,
          },
        })
        if (res.success) {
          onChange({ target: { value: removeLeadingZeros(value) } } as any)
        }
      },
    },

    formItem: {
      className: 'ml-2 mr-2 mb-0',
      customExtra: (props) => {
        const {
          frameworkProps: { store },
        } = props
        const { budgetCost } = (store.getDefaultValues() || {}) as IBudget
        const showPriceExtra = !isView()
        const pageProps = store.getPageProps() as BudgetaryPnPageProps
        const status = pageProps?.activity?.status

        return (
          <div className="flex flex-col">
            {showPriceExtra && (
              <PriceExtra {...props} priceWarningLimit={WARNING_PRICE_LIMIT} />
            )}
            {!budgetCost || !isView() ? (
              ''
            ) : (
              <div className="text-[#FF4D4F] mt-1 font-medium">
                实际消耗：
                {budgetCost ? toNumber(budgetCost).toFixed(2) : budgetCost}
              </div>
            )}
          </div>
        )
      },
    },
  }
)
