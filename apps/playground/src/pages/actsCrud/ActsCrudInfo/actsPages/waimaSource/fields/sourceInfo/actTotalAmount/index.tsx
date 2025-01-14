import {
  checkNumberInvalid,
  hasDuplicateElements,
  isEmptyStr,
  removeLeadingZeros,
  toNumber,
  validateStr,
} from '@/common'
import {
  CommonSubActPageState,
  CommonActCrudFormState,
} from '@/pages/actsCrud/ActsCrudInfo/fields'

import { nodeUtil } from '@easy-page/antd-ui'
import { get } from 'lodash'

export const actTotalAmount = () =>
  nodeUtil.createField<
    string,
    CommonSubActPageState,
    Partial<CommonActCrudFormState>
  >(
    'totalPrice',
    '活动总金额',
    {
      required: true,
      preprocess({ defaultValues }) {
        return get(defaultValues, 'activity.totalPrice') || ''
      },
      postprocess: ({ value }) => {
        return {
          'activity.totalPrice': value,
        }
      },
      validate: ({ value, pageProps }) => {
        const res = checkNumberInvalid(value, {
          checkNumber: true,
          checkInRange: { min: 0.1, max: 1000 },
          decimalNumber: 1,
        })

        if (!res.success) {
          return {
            success: false,
            errorMsg: '请输入0-1000的数字，不可为0，支持1位小数',
          }
        }

        return { success: true }
      },
    },
    {
      input: {
        suffix: '万元',
        placeholder: '请输入',
        allowClear: true,
        handleChange: ({ onChange, value }) => {
          if (!value) {
            onChange({ target: { value: value } } as any)
          }
          const res = checkNumberInvalid(value as string, {
            checkNumber: true,
          })
          if (res.success) {
            onChange({ target: { value: removeLeadingZeros(value) } } as any)
          }
        },
        className: 'w-1/2',
        // trigger: 'onBlur',
        // type: 'number',
      },
    }
  )
