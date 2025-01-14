import { nodeUtil, InputEffectedType } from '@easy-page/antd-ui'
import {
  CommonActCrudFormState,
  CommonActCrudFormProps,
} from '../../../interface'
import { showSettings } from '../lib/showSettings'
import {
  DEFAULT_APPLY_ACT_MAX_LIMIT,
  DEFAULT_APPLY_ACT_MIN_LIMIT,
} from '../lib/constant'
import { checkNumberInvalid } from '@/common/libs'
import { get } from 'lodash'
import { CanApplyActLimit } from './restrict'

export const applyActMaxCount = nodeUtil.createField<
  string,
  CommonActCrudFormState,
  CommonActCrudFormProps,
  InputEffectedType
>(
  'subactivityRule.enterMax',
  '最大',
  {
    when: showSettings,
    postprocess({ value }) {
      return {
        'applyControl.subactivityRule.enterMax': value ? Number(value) : -1,
      }
    },
    preprocess({ defaultValues }) {
      const val = get(defaultValues, 'applyControl.subactivityRule.enterMax')
      return val !== undefined ? `${val}` : ''
    },
    actions: [
      {
        effectedKeys: ['mccSubActMaxCount'],
        initRun: true,
        action: ({ effectedData }) => {
          const { mccSubActMaxCount = DEFAULT_APPLY_ACT_MAX_LIMIT } =
            effectedData
          return {
            effectResult: {
              inputProps: {
                placeholder: `1-${mccSubActMaxCount}之间的整数`,
              },
            },
          }
        },
      },
      {
        effectedKeys: ['subactivityRule.isRestrict'],
        action: ({ effectedData }) => {
          const val = effectedData['subactivityRule.isRestrict']
          if (val.choosed === CanApplyActLimit.NoLimit) {
            return {
              fieldValue: '',
            }
          }
          return {}
        },
      },
    ],
    validate: ({ value, pageProps }) => {
      const mccSubActMaxCount =
        pageProps.mccSubActMaxCount || DEFAULT_APPLY_ACT_MAX_LIMIT
      const res = checkNumberInvalid(value, {
        checkNumber: true,
        checkInteger: true,
        checkInRange: {
          min: DEFAULT_APPLY_ACT_MIN_LIMIT,
          max: mccSubActMaxCount,
        },
      })
      if (!res.success) {
        return {
          success: false,
          errorMsg: `请输入1-${mccSubActMaxCount}之间的整数`,
        }
      }

      return { success: true }
    },
  },
  {
    input: {
      trigger: 'onBlur',
    },
    formItem: {
      className: 'ml-2',
    },
  }
)
