import { OperationType, getBizLine, getOperationType, getPlanType, getQueryString, isEmptyStr, planNameCheck, toNumber } from '@/common'
import { nodeUtil } from '@easy-page/antd-ui'

const MAX_LENGTH = 25
export const planName = nodeUtil.createField(
  'name',
  '方案名称',
  {
    value: '',
    required: true,
    validate: ({ value }) => {
      if (isEmptyStr(value)) {
        return { errorMsg: '请输入方案名称', success: false }
      }
      return { success: true }
    },
  },
  {
    input: {
      placeholder: '填写方案名称',
      maxLength: MAX_LENGTH,
    },
  }
)

export const uoionCouponPlanName = nodeUtil.createField(
  'name',
  '方案名称',
  {
    value: '',
    required: true,
    validate: async ({ value }) => {
      if (isEmptyStr(value)) {
        return { errorMsg: '请输入方案名称，不可重复', success: false }
      }
      const operationType = getOperationType();
      const res = await planNameCheck({
        bizType: getBizLine(),
        planType: getPlanType(),
        planName: value.trim(),
        planId: operationType === OperationType.EDIT ? toNumber(getQueryString('planId')) : undefined,
      })

      if (res?.data?.nameRepeat) {
        return { errorMsg: '请输入方案名称，不可重复', success: false }
      }

      return { success: true }
    },
    postprocess: ({ value }) => {
      return {
        name: value.trim(),
      }
    },
  },
  {
    formItem: {
      validateTrigger: 'onBlur',
    },
    input: {
      placeholder: '填写方案名称',
      maxLength: MAX_LENGTH,
    },
  }
)
