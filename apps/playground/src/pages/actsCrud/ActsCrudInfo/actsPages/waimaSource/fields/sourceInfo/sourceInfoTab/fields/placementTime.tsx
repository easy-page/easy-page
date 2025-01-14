import {
  diffDaysBetweenTimestamps,
  getDisabledState,
  isExactly365DaysAgo,
} from '@/common'
import {
  CommonActCrudFormState,
  CommonActCrudFormProps,
} from '@/pages/actsCrud/ActsCrudInfo/fields'
import { nodeUtil, UI_COMPONENTS } from '@easy-page/antd-ui'
import dayjs, { Dayjs } from 'dayjs'
import { get } from 'lodash'

export const placementTime = () =>
  nodeUtil.createField<Dayjs[], CommonActCrudFormState, CommonActCrudFormProps>(
    'placeMentTime',
    '投放时间',
    {
      preprocess: ({ defaultValues }) => {
        const startTime = get(defaultValues, 'startTime')
        const endTime = get(defaultValues, 'endTime')
        if (!startTime || !endTime) return undefined
        return [dayjs(startTime * 1000), dayjs(endTime * 1000)]
      },
      postprocess({ value }) {
        if (!value) {
          return {}
        }

        return {
          startTime: dayjs(value[0]).startOf('day').unix(),
          endTime: dayjs(value[1]).endOf('day').unix(),
        }
      },
      validate({ value, pageProps, pageState }) {
        const originPageData = (pageProps as any).getFormUtil()
        const mainFormPageState = originPageData?.store?.pageState

        const actStartTime = get(
          mainFormPageState,
          'promotionTime.timeRange'
        )?.[0]
        const actEndTime = get(
          mainFormPageState,
          'promotionTime.timeRange'
        )?.[1]

        if (!value || value.length !== 2) {
          return { success: false, errorMsg: '必填，需在活动时间范围内' }
        }

        // if (dayjs(value[0]).isAfter(dayjs(value[1]))) {
        //   return { success: false, errorMsg: '开始时间不可大于结束时间' }
        // }

        if (
          actStartTime &&
          value[0].startOf('day').isBefore(dayjs(actStartTime).startOf('day'))
        ) {
          return { success: false, errorMsg: '需在活动时间范围内' }
        }

        if (
          actEndTime &&
          value[1].endOf('day').isAfter(dayjs(actEndTime).endOf('day'))
        ) {
          return { success: false, errorMsg: '需在活动时间范围内' }
        }

        return { success: true }
      },
      required: true,
      effectedKeys: ['promotionTime.timeRange'],
    },
    {
      ui: UI_COMPONENTS.DATE_PICKER_RANGE,
      formItem: { colon: false },
      datePickerRange: {
        placeholder: ['开始时间', '结束时间'],
        picker: 'date',
        needConfirm: false,
        disabledDate: (current) => {
          return current && current.isBefore(dayjs().startOf('day'))
        },
        // showTime: {
        //   hideDisabledOptions: true,
        //   defaultValue: [
        //     dayjs('00:00:00', 'HH:mm:ss'),
        //     dayjs('23:59:59', 'HH:mm:ss'),
        //   ],
        // },
        format: 'YYYY-MM-DD',
      },
    }
  )
