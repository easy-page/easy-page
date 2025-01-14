import { checkNumberInvalid, toNumber } from '@/common'
import { nodeUtil } from '@easy-page/antd-ui'
import { get } from 'lodash'

const MAX_GOOD_COUNT = 20

export const canApplyGoodCount = () =>
  nodeUtil.createField(
    'validationRule.skuLimit',
    '可报名商品数',
    {
      required: true,
      postprocess({ value }) {
        return {
          'validationRule.skuLimit': toNumber(value),
          /** 兼容历史数据 */
          'validationRule.enterMax': -1,
          /** 兼容历史数据 */
          'validationRule.enterMin': 1,
        }
      },

      preprocess({ defaultValues }) {
        const val = get(defaultValues, 'validationRule.skuLimit')
        return val !== undefined && val !== null ? `${val}` : ''
      },
      validate: ({ value }) => {
        if (!value) {
          return {
            success: false,
            errorMsg: '请输入可报名商品数',
          }
        }
        const res = checkNumberInvalid(value, {
          checkInRange: { min: 1, max: MAX_GOOD_COUNT },
          checkInteger: true,
        })
        if (!res.success) {
          return {
            success: false,
            errorMsg: `请输入1-${MAX_GOOD_COUNT}之间的整数`,
          }
        }
        return { success: true }
      },
    },
    {
      input: {
        className: 'w-1/2',
        placeholder: `1-${MAX_GOOD_COUNT} 之间`,
        allowClear: true,
        handleChange: ({ onChange, value }) => {
          if (!value) {
            onChange({ target: { value: value } } as any)
          }
          const res = checkNumberInvalid(value as string, {
            checkNumber: true,
            checkInteger: true,
            // checkInRange: { min: 1, max: MAX_GOOD_COUNT },
          })
          if (res.success) {
            onChange({ target: { value: value } } as any)
          }
        },
      },
    }
  )
