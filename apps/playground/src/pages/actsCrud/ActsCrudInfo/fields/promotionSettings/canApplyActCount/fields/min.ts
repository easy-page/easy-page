import { nodeUtil } from '@easy-page/antd-ui'
import {
  CommonActCrudFormState,
  CommonActCrudFormProps,
} from '../../../interface'
import { showSettings } from '../lib/showSettings'
import { get } from 'lodash'

export const applyActMinCount = nodeUtil.createField<
  string,
  CommonActCrudFormState,
  CommonActCrudFormProps
>(
  'subactivityRule.enterMin',
  '最小',
  {
    value: '1',
    postprocess({ value }) {
      return {
        'applyControl.subactivityRule.enterMin': Number(value),
      }
    },
    preprocess({ defaultValues }) {
      const val = get(defaultValues, 'applyControl.subactivityRule.enterMin')
      return val !== undefined ? `${val}` : '1'
    },
    when: showSettings,
  },
  {
    input: {
      disabled: true,
    },
    formItem: {
      className: 'ml-2',
    },
  }
)
