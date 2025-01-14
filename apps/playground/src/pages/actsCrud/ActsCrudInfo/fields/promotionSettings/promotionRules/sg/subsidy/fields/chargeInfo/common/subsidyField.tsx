import { createSubsidyFieldContainer } from './createSubsidyContainer'
import { subsidyInput } from './subsidyInput'
import {
  MaxAmountLimitConfig,
  subsidyMaxAmountInput,
} from './subsidyMaxAmountInput'
import { maxCountTips } from '../fields/subsidyTips'
import { ChargeSideEnum, CheckNumberInvalidOptions } from '@/common'
import { InputProps } from '@easy-page/antd-ui'

export type ChargeSideOption = {
  title: string
  id: string
  tooltip?: string
  inputSuffix: string
  disabledMaxAmount?: boolean
  maxLimit?: MaxAmountLimitConfig
  disabledAmt?: boolean
  chargeSideCode: ChargeSideEnum
  defaultVal?: string
  maxAmountValidateConfig?: CheckNumberInvalidOptions & {
    errorMsg: string
  }
  handleChange?: (options: {
    onChange: InputProps['onChange']
    value: string
    preValue: string
    frameworkProps: InputProps['frameworkProps']
  }) => void
}

export const getSubsidyId = (id: string) => {
  return `${id}.chargeAmt`
}

export const subsidyField = ({
  title,
  tooltip,
  id,
  inputSuffix,
  disabledMaxAmount,
  disabledAmt,
  maxLimit,
  handleChange,
  chargeSideCode,
  maxAmountValidateConfig,
  defaultVal,
}: ChargeSideOption) => {
  const items = [
    subsidyInput({
      id: getSubsidyId(id),
      title,
      range: { min: 0, max: 100 },
      handleChange,
      suffix: inputSuffix,
      disabled: disabledAmt,
      chargeSideCode,
      defaultVal,
    }),
  ]

  if (!disabledMaxAmount) {
    items.push(maxCountTips)
    items.push(
      subsidyMaxAmountInput({
        id: `${id}.maxAmount`,
        title,
        range: { min: 0, max: 999 },
        suffix: '元',
        maxLimit,
        chargeSideCode,
        validateConfig: maxAmountValidateConfig,
      })
    )
  }
  return createSubsidyFieldContainer({ id, title, tooltip }).appendChildren(
    items
  )
}
