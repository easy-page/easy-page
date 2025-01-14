import { nodeUtil } from '@easy-page/antd-ui'
import { commonDateRange, FlowNodeKey } from './commonDateRange'
import { get } from 'lodash'
import dayjs from 'dayjs'

import { isCreate, mccModel } from '@/common'
import {
  CommonDateRangeState,
  WmsActFormState,
  WmsActFormProps,
} from '../../../../interface'

export const purchaseManagerDateRange = nodeUtil.extends<
  CommonDateRangeState,
  WmsActFormState,
  WmsActFormProps
>(
  commonDateRange({
    needCheckCurrentTime: true,
    flowNode: FlowNodeKey.PurchaseManager,
    startPlaceholder: '活动发送邀请后',
  }),
  {
    preprocess: () => {
      return ({ defaultValues }) => {
        return {
          endTime: get(defaultValues, 'activity.confirmTime.purchaseManager')
            ?.endTime,
        }
      }
    },
    postprocess:
      () =>
      ({ value, pageState }) => {
        const actTime = get(pageState, 'promotionTime.timeRange')
        const actStartTime = actTime[0]
        return {
          ['activity.confirmTime.purchaseManager']: {
            ...value,
            // startTime: actStartTime.unix(),
          },
        }
      },
    validate:
      () =>
      ({ value, pageState }) => {
        const actTime = get(pageState, 'promotionTime.timeRange')
        const actEndTime = actTime[1]
        if (!value?.endTime) {
          return { success: false, errorMsg: '采购确认周期结束时间必填' }
        }

        if (
          actEndTime &&
          dayjs(value?.endTime * 1000).isAfter(
            actEndTime.endOf('day'),
            'minute'
          )
        ) {
          return {
            success: false,
            errorMsg: '采购确认周期结束时间不可晚于活动结束时间',
          }
        }
        return { success: true }
      },
    actions(oldActions) {
      return [
        {
          effectedKeys: ['promotionTime.timeRange'],
          action: ({ value, effectedData }) => {
            const actTime = effectedData['promotionTime.timeRange']
            const {
              data: { purchase_operate_confirm_time_interval = 168 },
            } = mccModel.getData()

            if (!Array.isArray(actTime) || !actTime[0]) {
              return {}
            }

            const actStartTime = actTime[0]

            if (!value?.endTime) {
              let computedStartTime = null
              const currentDay = dayjs(actStartTime)
              const daysAgo = currentDay.subtract(
                purchase_operate_confirm_time_interval / 24,
                'day'
              )

              computedStartTime = daysAgo.isAfter(dayjs())
                ? currentDay.unix() -
                  purchase_operate_confirm_time_interval * 60 * 60 - 1
                : null

              return {
                fieldValue: {
                  ...value,
                  endTime: computedStartTime,
                },
              }
            }

            return {}
          },
        },
      ]
    },
  }
)
