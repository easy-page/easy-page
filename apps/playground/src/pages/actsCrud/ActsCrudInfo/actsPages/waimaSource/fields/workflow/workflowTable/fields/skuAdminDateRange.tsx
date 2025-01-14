import { nodeUtil } from '@easy-page/antd-ui'
import { commonDateRange, FlowNodeKey } from './commonDateRange'
import { get } from 'lodash'
import dayjs from 'dayjs'

import { isCreate, mccModel } from '@/common'
import {
  CommonDateRangeState,
  WmsActFormProps,
  WmsActFormState,
} from '../../../../interface'

export const skuAdminDateRange = nodeUtil.extends<
  CommonDateRangeState,
  WmsActFormState,
  WmsActFormProps
>(
  commonDateRange({
    needCheckCurrentTime: true,
    flowNode: FlowNodeKey.SkuAdmin,
    startPlaceholder: '活动发送邀请后',
  }),
  {
    preprocess: () => {
      return ({ defaultValues }) => {
        return {
          endTime: get(defaultValues, 'activity.confirmTime.skuAdmin')?.endTime,
        }
      }
    },
    postprocess:
      () =>
      ({ value, pageState }) => {
        // 判断是否选择了品类运营
        const isSelectSkuAdminPartner = get(
          pageState,
          'skuAdminPartner.isSelectSkuPartner'
        )
        const actTime = get(pageState, 'promotionTime.timeRange')
        const actStartTime = actTime[0]
        return {
          ['activity.confirmTime.skuAdmin']: isSelectSkuAdminPartner
            ? {
                ...value,
                // startTime: actStartTime.unix(),
              }
            : undefined,
        }
      },
    validate:
      () =>
      ({ value, pageState }) => {
        const actTime = get(pageState, 'promotionTime.timeRange')
        const actEndTime = actTime[1]
        // 判断是否选择了品类运营
        const isSelectSkuAdminPartner = get(
          pageState,
          'skuAdminPartner.isSelectSkuPartner'
        )
        // 品牌运营审核周期校验
        if (isSelectSkuAdminPartner && !value?.endTime) {
          return { success: false, errorMsg: '品类运营确认商品结束时间必填' }
        }
        if (
          isSelectSkuAdminPartner &&
          actEndTime &&
          dayjs(value?.endTime * 1000).isAfter(
            actEndTime.endOf('day'),
            'minute'
          )
        ) {
          return {
            success: false,
            errorMsg: '品类运营确认商品结束时间不可晚于活动结束时间',
          }
        }
        return { success: true }
      },
    actions(oldActions) {
      return [
        {
          effectedKeys: ['promotionTime.timeRange', 'skuAdminPartner'],
          action: ({ value, effectedData }) => {
            const actTime = effectedData['promotionTime.timeRange']

            const isSelectSkuAdminPartner = get(
              effectedData['skuAdminPartner'],
              'isSelectSkuPartner'
            )

            console.log('actTime', actTime, effectedData['skuAdminPartner'])

            const {
              data: { sku_operate_confirm_time_interval = 72 },
            } = mccModel.getData()

            if (!Array.isArray(actTime) || !actTime[0]) {
              return {}
            }

            const actStartTime = actTime[0]

            if (isSelectSkuAdminPartner && !value?.endTime) {
              let computedStartTime = null
              const currentDay = dayjs(actStartTime)
              const daysAgo = currentDay.subtract(
                sku_operate_confirm_time_interval / 24,
                'day'
              )

              computedStartTime = daysAgo.isAfter(dayjs())
                ? currentDay.unix() -
                  sku_operate_confirm_time_interval * 60 * 60 - 1
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
          initRun: true,
        },
      ]
    },
  }
)
