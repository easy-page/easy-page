import {
  DatePickerEffectedResultType,
  Empty,
  UI_COMPONENTS,
  nodeUtil,
} from '@easy-page/antd-ui'
import dayjs, { Dayjs } from 'dayjs'
import { CommonActCrudFormState } from '../../interface'
import { endTimeActions } from './actions'
import { endTimeValidate } from './validate'
import { get } from 'lodash'

export const endTime = () =>
  nodeUtil.createField<
    Dayjs,
    CommonActCrudFormState,
    Empty,
    DatePickerEffectedResultType
  >(
    'endTime',
    '商家报名截止时间',
    {
      required: true,
      actions: endTimeActions,
      validate: endTimeValidate,

      postprocess({ value }) {
        if (!value) {
          return {}
        }
        return {
          'activity.endTime': value?.unix(),
        }
      },

      preprocess({ defaultValues }) {
        const val = get(defaultValues, 'activity.endTime')
        if (!val) {
          return null
        }
        return dayjs(val * 1000)
      },
    },
    {
      ui: UI_COMPONENTS.DATE_PICKER,
      // formItem: {
      //   notValidWhenDisabled: true,
      // },
      datePicker: {
        placeholder: '选择商家报名截止时间',
        className: 'w-[250px]',
        showTime: {
          defaultValue: dayjs('23:59:59', 'HH:mm:ss'),
        },
      },
    }
  )
