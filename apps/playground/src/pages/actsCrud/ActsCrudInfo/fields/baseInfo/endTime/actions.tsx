import {
  EffectActionType,
  DatePickerEffectedResultType,
  Empty,
} from '@easy-page/antd-ui'
import dayjs from 'dayjs'
import { CommonActCrudFormState } from '../../interface'

export const endTimeActions: EffectActionType<
  dayjs.Dayjs,
  CommonActCrudFormState,
  Empty,
  DatePickerEffectedResultType
>[] = [
  {
    effectedKeys: ['promotionTime.isRestrict', 'promotionTime.timeRange'],
    initRun: true,
    action: ({ effectedData }) => {
      return {
        effectResult: {
          disabledDate: (current) => {
            if (current && current.isBefore(dayjs().startOf('day'))) {
              return true
            }

            const endTime = effectedData['promotionTime.timeRange']?.[1]
            if (!endTime) {
              return false
            }

            if (current.unix() > endTime.endOf('day').unix()) {
              return true
            }
            return false
          },
        },
      }
    },
  },
]
