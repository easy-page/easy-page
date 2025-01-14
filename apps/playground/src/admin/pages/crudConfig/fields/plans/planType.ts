import { checkNumberInvalid, toNumber } from '@/common'
import { nodeUtil } from '@easy-page/antd-ui'
import { get } from 'lodash'

export const planType = nodeUtil.createField(
  'planType',
  '方案类型',
  {
    required: true,
    postprocess({ value }) {
      return {
        'config.planType': value ? toNumber(value) : undefined,
      }
    },
    preprocess({ defaultValues }) {
      const planType = get(defaultValues, 'config.planType')
      return planType !== undefined ? `${planType}` : ''
    },
    validate: ({ value }) => {
      if (!value) {
        return {
          success: false,
          errorMsg: '请输入',
        }
      }
      const res = checkNumberInvalid(value, {
        checkInteger: true,
      })
      if (!res.success) {
        return {
          success: false,
          errorMsg: `请输入`,
        }
      }
      return { success: true }
    },
  },
  {
    input: {
      className: 'w-1/2',
      placeholder: `请输入`,
      allowClear: true,
    },
    formItem: {
      extra:
        '同 PlanTypeEnum 枚举值，0 表示品牌、1 表示神价、2 表示神会员、可以继续扩展输入：4 等，需和项目中的 PlanTypeEnum 一一匹配',
    },
  }
)
