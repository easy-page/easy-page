import { nodeUtil } from '@easy-page/antd-ui'
import { commonDateRange, FlowNodeKey } from './commonDateRange'
import { get } from 'lodash'
import dayjs from 'dayjs'

import { purchaseManagerId, supplierId } from '../utils'
import {
  CommonDateRangeState,
  WmsActFormState,
  WmsActFormProps,
} from '../../../../interface'
import { isCreate, mccModel } from '@/common'

export const supplierDateRange = nodeUtil.extends<
  CommonDateRangeState,
  WmsActFormState,
  WmsActFormProps
>(
  commonDateRange({
    needCheckCurrentTime: true,
    flowNode: FlowNodeKey.Supplier,
    startPlaceholder: '',
  }),
  {
    preprocess: () => {
      return ({ defaultValues }) => {
        return get(defaultValues, 'activity.confirmTime.supplier')
      }
    },
    postprocess:
      () =>
      ({ value }) => {
        return {
          ['activity.confirmTime.supplier']: {
            startTime: value.startTime,
            endTime: value.endTime,
          },
          ['activity.endTime']: value.endTime,
        }
      },
    validate:
      () =>
      ({ value, pageState }) => {
        const actTime = get(pageState, 'promotionTime.timeRange')
        const actEndTime = actTime[1]
        if (!value?.startTime) {
          return { success: false, errorMsg: '供应商报名周期开始时间必填' }
        }
        if (!value?.endTime) {
          return { success: false, errorMsg: '供应商报名周期结束时间必填' }
        }

        if (
          dayjs(value?.startTime * 1000).isAfter(dayjs(value?.endTime * 1000))
        ) {
          return {
            success: false,
            errorMsg: '供应商报名周期开始时间不可晚于结束时间',
          }
        }

        if ((value?.endTime - value?.startTime) / (60 * 60) < 2) {
          return {
            success: false,
            errorMsg: '开始时间和结束时间至少间隔2小时',
          }
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
            errorMsg: '供应商报名周期结束时间不可晚于活动结束时间',
          }
        }
        return { success: true }
      },
    actions: () => [
      {
        effectedKeys: [
          'purchaseManager',
          'promotionTime.timeRange',
          'skuAdminPartner',
          'skuAdmin',
        ],
        action: ({ pageState, value, effectedData }) => {
          const isSelectSkuAdmin =
            effectedData['skuAdminPartner']?.isSelectSkuPartner

          const skuAdmin = effectedData['skuAdmin']
          const purchaseManager = effectedData['purchaseManager']
          const actTime = effectedData['promotionTime.timeRange']

          const {
            data: { sku_operate_confirm_time_interval = 72 },
          } = mccModel.getData()

          if (!isSelectSkuAdmin) {
            let computedStartTime = null

            // 取活动开始时间三天前，如果是已经是过去的时间则不取
            if (actTime[0]) {
              const currentDay = dayjs(actTime[0])
              const threeDaysAgo = currentDay.subtract(
                sku_operate_confirm_time_interval / 24,
                'day'
              )

              console.log('value.endTime',value.endTime);
              

              computedStartTime =
                !value.endTime && threeDaysAgo.isAfter(dayjs())
                  ? currentDay.unix() -
                    sku_operate_confirm_time_interval * 60 * 60
                  : value.endTime
            }

            return {
              fieldValue: {
                ...value,
                startTime: purchaseManager?.endTime,
                endTime: computedStartTime,
                disableEnd: false,
              },
            }
          }

          console.log('skuAdmin', skuAdmin)

          return {
            fieldValue: {
              ...value,
              disableEnd: true,
              startTime: purchaseManager?.endTime ? purchaseManager?.endTime + 1 : undefined,
              endTime: skuAdmin?.endTime,
            },
          }
        },
        initRun: true,
      },
    ],
  }
)
