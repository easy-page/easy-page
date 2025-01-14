import { ValidateRes } from './interface'
import { validateFactorRules } from './validateFactorRules'
import { Empty, Validate } from '@easy-page/antd-ui'
import { FactorsFormProps, MccConfig } from '../interface'
import { OperationFactorItem } from '@/common/apis'

export const getFactorsValidate: (
  factor: OperationFactorItem,
  options: {
    mccConfigs: MccConfig
  }
) => Validate<any, Empty, FactorsFormProps> =
  (factor: OperationFactorItem, options) =>
  async ({ value, pageState }) => {
    let result: ValidateRes = {
      success: true,
    }

    if (factor.validators) {
      const keys = Object.keys(factor.validators)
      for (let i = 0; i < keys.length; i++) {
        const fieldVal = value[keys[i]]
        console.log('fffffffffassasaada:', fieldVal, value)
        const rules = factor.validators[keys[i]] || []
        const res = await validateFactorRules(fieldVal, rules, {
          value,
          factor,
          pageState,
          mccConfigs: options.mccConfigs,
        })
        if (!res.success) {
          result = res
          break
        }
      }
    }
    return result
  }
