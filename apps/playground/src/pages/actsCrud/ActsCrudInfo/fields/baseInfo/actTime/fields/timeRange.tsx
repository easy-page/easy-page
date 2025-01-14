import {
  ChargeSideEnum,
  diffDaysBetweenTimestamps,
  getDisabledState,
  isExactly365DaysAgo,
  loadActPnListToModel,
} from '@/common'
import { nodeUtil, UI_COMPONENTS } from '@easy-page/antd-ui'
import dayjs, { Dayjs } from 'dayjs'
import { get } from 'lodash'
import {
  CommonActCrudFormProps,
  CommonActCrudFormState,
} from '../../../interface'

export enum ActTimeRangeUnitEnum {
  Year = 'year',
  Day = 'day',
}

const UnitStrTextConfig = {
  [ActTimeRangeUnitEnum.Day]: '天',
  [ActTimeRangeUnitEnum.Year]: '年',
}

const MAX_DIFF_DAYS = 365

export const actTimeRange = ({
  name,
  unit,
  diffRange,
}: {
  name?: string
  unit?: ActTimeRangeUnitEnum
  diffRange?: number
}) =>
  nodeUtil.createField<Dayjs[], CommonActCrudFormState, CommonActCrudFormProps>(
    'promotionTime.timeRange',
    name || ' ',
    {
      preprocess: ({ defaultValues }) => {
        const startTime = get(defaultValues, 'activity.promotionTime.startTime')
        const endTime = get(defaultValues, 'activity.promotionTime.endTime')
        if (!startTime || !endTime) return []

        return [dayjs(startTime * 1000), dayjs(endTime * 1000)]
      },
      postprocess({ value }) {
        if (!value) {
          return {}
        }

        return {
          'activity.promotionTime.startTime': dayjs(value[0])
            .startOf('day')
            .unix(),
          'activity.promotionTime.endTime': dayjs(value[1]).endOf('day').unix(),
        }
      },
      validate({ value, pageProps }) {
        const unitType = unit || ActTimeRangeUnitEnum.Day

        const unitStr = UnitStrTextConfig[unitType]
        if (!value || value.length !== 2) {
          return { success: false, errorMsg: '请选择活动生效时间' }
        }

        if (!isExactly365DaysAgo(value[0])) {
          return { success: false, errorMsg: '活动开始时间需在365天内' }
        }

        if (unitType === ActTimeRangeUnitEnum.Day) {
          const diffDays = diffDaysBetweenTimestamps(value[0], value[1])
          const MAX_DIFF_DAYS = 365
          if (diffDays >= MAX_DIFF_DAYS) {
            return {
              success: false,
              errorMsg: `活动时间跨度不能超过 ${MAX_DIFF_DAYS} 天`,
            }
          }
        } else {
          const startDate = dayjs(value[0])
          // 计算加上10年后的日期
          const endDate = startDate
            .add(10, 'year')
            .subtract(1, 'day')
            .endOf('day')
          if (value[1].valueOf() > endDate.valueOf()) {
            return {
              success: false,
              errorMsg: `活动时间跨度不能超过 ${diffRange} ${unitStr}`,
            }
          }
        }

        const disabled = getDisabledState(
          'promotionTime.timeRange',
          pageProps.editable
        )
        if (!disabled && value[0] && dayjs().startOf('day').isAfter(value[0])) {
          return {
            success: false,
            errorMsg: '活动开始、结束日期仅可设置当日及未来的日期',
          }
        }

        return { success: true }
      },
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
        format: 'YYYY-MM-DD',
      },
    }
  )
