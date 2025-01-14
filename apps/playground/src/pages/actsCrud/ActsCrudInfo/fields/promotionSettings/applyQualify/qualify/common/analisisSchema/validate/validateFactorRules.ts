import { Validator } from '@/common/apis'
import { ValidateOptions, ValidateRes } from './interface'
import { validateHandler } from './validateHandlers'

export const validateFactorRules = async (
  fieldVal: any,
  rules: Validator[],
  options: ValidateOptions
): Promise<ValidateRes> => {
  let result = { success: true, errorMsg: '' }
  for (let i = 0; i < rules.length; i++) {
    const curRule = rules[i]

    const validateRes = await validateHandler[curRule.type](
      fieldVal,
      curRule,
      options
    )
    if (validateRes) {
      result = validateRes
      break
    }
  }
  return result
}
