import { checkNumberInvalid, getDisabledState, mccModel } from '@/common'
import {
  CommonActCrudFormState,
  CommonActCrudFormProps,
} from '@/pages/actsCrud/ActsCrudInfo'
import { InputEffectedType, nodeUtil } from '@easy-page/antd-ui'
import { get } from 'lodash'

export const commissionRatio = nodeUtil.createField<
  string,
  CommonActCrudFormState,
  CommonActCrudFormProps,
  InputEffectedType
>(
  'commissionRatio',
  '商家佣金比例',
  {
    required: true,
    preprocess({ defaultValues }) {
      const materialRule = get(defaultValues, 'commissionRatio')

      return `${materialRule ?? ''}`
    },
    postprocess: ({ value }) => {
      return {
        commissionRatio: value?.trim() || '',
      }
    },
    validate: ({ value, pageProps }) => {
      const _value = value?.trim()
      const disabled = getDisabledState('commissionRatio', pageProps.editable)

      if (disabled) {
        return { success: true }
      }
      const {
        data: { commission_max_threshold = 100 },
      } = mccModel.getData()

      if (!_value) {
        return {
          success: false,
          errorMsg: `必填，请输入0-${commission_max_threshold}的整数`,
        }
      }

      const res = checkNumberInvalid(_value as string, {
        checkNumber: true,
        checkInteger: true,
        checkInRange: {
          min: 0,
          max: commission_max_threshold,
        },
      })
      if (!res.success) {
        return {
          success: false,
          errorMsg: `必填，请输入0-${commission_max_threshold}的整数`,
        }
      }

      return { success: true }
    },
    actions: [{
      initRun: true,
      action: () => {
        const {
          data: { commission_max_threshold = 100 },
        } = mccModel.getData()
        return {
          effectResult: {
            inputProps: {
              placeholder: `请输入0-${commission_max_threshold}`,
            },
          }
        }
      }
    }],
  },
  {
    input: {
      addonAfter: '%',
      handleChange({ value, onChange }) {
        onChange({ target: { value: value?.trim() || '' } } as any)
      },
    },
    formItem: {
      tooltip: '向商家收取的站外推广费用比例，按照实付GMV的x%收取',
      wrapperCol: {
        span: 4,
      },
      required: true,
    },
  }
)
