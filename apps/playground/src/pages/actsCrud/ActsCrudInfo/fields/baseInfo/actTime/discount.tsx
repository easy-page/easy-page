import {
  loadActPnListToModel,
  isExactly365DaysAgo,
  diffDaysBetweenTimestamps,
  getDisabledState,
  ChargeSideEnum,
} from '@/common'
import {
  ChildFormState,
  generateId,
  nodeUtil,
  UI_COMPONENTS,
} from '@easy-page/antd-ui'
import dayjs, { Dayjs } from 'dayjs'
import {
  CommonActCrudFormState,
  CommonActCrudFormProps,
  CommonSubActPageState,
  ChargeSidePnPageState,
} from '../../interface'
import { ActTimeRangeUnitEnum } from './fields'
import { debounce, get } from 'lodash'
import { ActTimeLimit } from './constant'
import { DatePicker as AntdDatePicker } from 'antd'
import { useEffect, useState } from 'react'
// import {RangeValueType } from 'rc-'

const bgBuList = [ChargeSideEnum.MeiTuanShanGou]

const UnitStrTextConfig = {
  [ActTimeRangeUnitEnum.Day]: '天',
  [ActTimeRangeUnitEnum.Year]: '年',
}

export const disActTimeRange = nodeUtil.createCustomField<
  Dayjs[],
  CommonActCrudFormState,
  CommonActCrudFormProps
>(
  'promotionTime.timeRange',
  '活动生效时间',
  ({ onChange, value, frameworkProps: { store } }) => {
    const [val, setVal] = useState(value)
    console.log('valuevaluevalue:', value)
    const debounceChange = debounce(async (val: any) => {
      const startTime = dayjs(val[0]).startOf('day').unix()
      // const formUtil = getFormUtil?.()
      await loadActPnListToModel({
        bgBuList,
        period: startTime || new Date().getTime() / 1000,
      })
      // const data = formUtil?.getOriginFormData?.()
      // if (data) {
      //   const subActForm = data as ChildFormState<CommonSubActPageState>

      //   const firstSubActivity = Object.values(subActForm?.formUtils || {})?.[0]
      //   const pnForm = (firstSubActivity?.getFieldValue?.(
      //     'pns.chargeSidePnform'
      //   ) || {}) as ChildFormState<ChargeSidePnPageState>
      //   firstSubActivity?.setFieldsValue?.({
      //     'pns.chargeSidePnform': {
      //       ...pnForm,
      //       choosedItemId: generateId('chrage-side'),
      //     } as ChildFormState<ChargeSidePnPageState>,
      //   })
      // }
    }, 100)
    useEffect(() => {
      const initValue = async () => {
        const defaultValues = store.getDefaultValues()
        const startTime = get(defaultValues, 'activity.promotionTime.startTime')
        const endTime = get(defaultValues, 'activity.promotionTime.endTime')
        if (bgBuList?.length > 0 && startTime) {
          await loadActPnListToModel({
            bgBuList,
            period: startTime || new Date().getTime() / 1000,
          })
        }

        if (!startTime || !endTime) {
          // setVal([])
          // onChange([])
        } else {
          setVal([dayjs(startTime * 1000), dayjs(endTime * 1000)])
          onChange([dayjs(startTime * 1000), dayjs(endTime * 1000)])
        }
      }
      initValue()
    }, [])
    return (
      <AntdDatePicker.RangePicker
        value={val as any}
        onChange={async (newVal) => {
          setVal(newVal)
          debounceChange(newVal)
        }}
        placeholder={['开始时间', '结束时间']}
        picker={'date'}
        needConfirm={false}
        disabledDate={(current) => {
          return current && current.isBefore(dayjs().startOf('day'))
        }}
        format={'YYYY-MM-DD'}
      />
    )
  },
  {
    required: true,
    // preprocess: ({ defaultValues }) => {

    // },
    postprocess({ value }) {
      if (!value) {
        return {}
      }

      return {
        'activity.promotionTime.startTime': dayjs(value[0])
          .startOf('day')
          .unix(),
        'activity.promotionTime.endTime': dayjs(value[1]).endOf('day').unix(),
        'activity.promotionTime.isRestrict': ActTimeLimit.Limit,
      }
    },
    validate({ value, pageProps }) {
      const unitType = ActTimeRangeUnitEnum.Day

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
        //
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
  }
)
