import {
  ChargeSideInfo,
  checkNumberInvalid,
  CheckNumberInvalidOptions,
  ISubActivity,
  openInUoc,
  toNumber,
} from '@/common'
import { nodeUtil } from '@easy-page/antd-ui'
import { ChargeSideInputOption } from './subsidyInput'
import { zsptConfirm } from '@/common/components/zspt/ZsptConfirm'
import {
  appendChargeDetailVosToSubAct,
  getChargeDetailVosFromSubAct,
} from '../../../utils'

export type MaxAmountLimitConfig = {
  tips: string
  subsidyAmountCheckFromAdress: string
  subsidyAmountCheckConditions: number
  /** 是否提示判断条件 */
  shouldNotice: () => boolean
}
export const subsidyMaxAmountInput = ({
  id,
  title,
  range,
  suffix,
  maxLimit,
  chargeSideCode,
  disabled,
  validateConfig,
}: ChargeSideInputOption & {
  maxLimit?: MaxAmountLimitConfig
  validateConfig?: CheckNumberInvalidOptions & {
    errorMsg: string
  }
}) => {
  const diableConfig = disabled ? { disabled: true } : {}
  return nodeUtil.createField(
    id,
    '',
    {
      postprocess({ value, processedFormData }) {
        // 这里的字段一般是：meituan.chargeAmt，agent.chargeAmt，merchant.chargeAmt
        // 我们需要第一个key 用于提交
        const submitId = id.split('.')[0]
        return appendChargeDetailVosToSubAct(
          {
            [submitId]: {
              chargeSideCode,
              maxAmount: toNumber(value),
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
        return value?.['maxAmount'] !== undefined
          ? `${value?.['maxAmount']}`
          : ''
      },
      validate: ({ value }) => {
        if (!value) {
          return { success: false, errorMsg: `请输入${title}最高金额` }
        }
        const res = checkNumberInvalid(value, {
          checkNumber: true,
          checkInRange: range,
          ...(validateConfig || {}),
        })
        if (!res.success) {
          return {
            success: false,
            errorMsg:
              validateConfig?.errorMsg ||
              `请输入[${range.min}-${range.max}]的整数`,
          }
        }
        return {
          success: true,
        }
      },
    },
    {
      input: {
        placeholder: `${range.min}-${range.max}之间`,
        addonAfter: suffix,
        handleChange({ value, onChange }) {
          const amount = toNumber(value)
          console.log('amountamount:', value, amount)
          if (
            !maxLimit ||
            !maxLimit.shouldNotice() ||
            amount === undefined ||
            maxLimit.subsidyAmountCheckConditions >= amount
          ) {
            onChange({ target: { value } } as any)
            return
          }
          zsptConfirm({
            title: maxLimit.tips,
            okText: '去申请权限',
            cancelText: '返回',

            onCancel: () => {
              // 关闭弹窗，不做任何事情
            },
            onOk() {
              openInUoc(
                'sgyx-glzx-qxsq',
                maxLimit.subsidyAmountCheckFromAdress,
                '_blank'
              )
            },
          })
        },
        ...diableConfig,
      },
    }
  )
}
