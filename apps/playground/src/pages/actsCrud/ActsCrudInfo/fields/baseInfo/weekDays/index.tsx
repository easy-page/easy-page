import { nodeUtil } from '@easy-page/antd-ui'
import { WEEK_TIMES_OPTIONS, weekDaysValidate } from './common'
import { CommonActCrudFormState } from '../../interface'
import { get } from 'lodash'

const WeekTimesDefaultVal = Array.from({ length: 7 }, (_, index) => index + 1)
export const weekDays = () =>
  nodeUtil.createField<number[], CommonActCrudFormState>(
    'promotionTime.weekTimes',
    '周循环',
    {
      mode: 'multiple',
      required: true,
      validate: weekDaysValidate,
      value: Array.from({ length: 7 }, (_, index) => index + 1),
      postprocess({ value }) {
        return {
          'activity.promotionTime.weekTimes': (value || [])
            .sort((a, b) => a - b)
            .join(','),
        }
      },
      preprocess({ defaultValues }) {
        const weekTimes = get(defaultValues, 'activity.promotionTime.weekTimes')
        if (!weekTimes) {
          return WeekTimesDefaultVal
        }
        return weekTimes.split(',').map((e) => Number(e))
      },
    },
    {
      checkBoxGroup: {
        options: WEEK_TIMES_OPTIONS,
      },
    }
  )
