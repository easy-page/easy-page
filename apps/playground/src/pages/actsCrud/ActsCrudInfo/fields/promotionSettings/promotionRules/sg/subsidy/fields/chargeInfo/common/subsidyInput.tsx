import {
  ChargeSideEnum,
  ChargeSideInfo,
  checkNumberInvalid,
  ISubActivity,
  toNumber,
} from '@/common'
import { InputProps, nodeUtil } from '@easy-page/antd-ui'
import { appendChargeDetailVosToSubAct } from '../../../utils/appendChargeDetailVosToSubsidy'
import { getChargeDetailVosFromSubAct } from '../../../utils'

export type ChargeSideInputOption = {
  title: string
  id: string
  range: {
    min: number
    max: number
  }
  suffix: string
  disabled?: boolean
  chargeSideCode: ChargeSideEnum
  defaultVal?: string
  label?: string
  required?: boolean
  handleChange?: (options: {
    onChange: InputProps['onChange']
    value: string
    preValue: string
    frameworkProps: InputProps['frameworkProps']
  }) => void
}

export const subsidyInput = ({
  id,
  title,
  range,
  disabled,
  suffix,
  chargeSideCode,
  defaultVal = '',
  label = '',
  required = false,
  handleChange,
}: ChargeSideInputOption) => {
  const disabledConfig = disabled ? { disabled: true } : {}
  return nodeUtil.createField(
    id,
    label,
    {
      required,
      validate: ({ value }) => {
        if (!value) {
          return { success: false, errorMsg: `请输入${title}` }
        }
        const res = checkNumberInvalid(value, {
          checkNumber: true,
          checkInteger: true,
          checkInRange: range,
        })
        if (!res.success) {
          return {
            success: false,
            errorMsg: `请输入[${range.min}-${range.max}]的整数`,
          }
        }
        return {
          success: true,
        }
      },
      postprocess({ value, processedFormData }) {
        // 这里的字段一般是：meituan.chargeAmt，agent.chargeAmt，merchant.chargeAmt
        // 我们需要第一个key 用于提交
        const submitId = id.split('.')[0]
        return appendChargeDetailVosToSubAct(
          {
            [submitId]: {
              chargeSideCode,
              chargeAmt: toNumber(value),
            },
          },
          processedFormData
        )
      },
      preprocess({ defaultValues }) {
        const [submitId, _] = id.split('.')
        const value = getChargeDetailVosFromSubAct(
          defaultValues as ISubActivity,
          submitId as any
        ) as ChargeSideInfo
        return value?.['chargeAmt'] !== undefined
          ? `${value?.['chargeAmt']}`
          : defaultVal
      },
    },
    {
      input: {
        placeholder: `${range.min}-${range.max}之间`,
        addonAfter: suffix,
        ...disabledConfig,
        handleChange: handleChange,
      },
    }
  )
}
