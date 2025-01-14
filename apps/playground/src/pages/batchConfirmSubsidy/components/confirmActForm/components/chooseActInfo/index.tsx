import { nodeUtil } from '@easy-page/antd-ui'
import { useMemo, useState } from 'react'
import {
  ConfirmContent,
  SingleBatchConfirmAct,
} from '@/common/apis/getBatchConfirmActList'
import { formateDate, FormatStyle } from '@/common'

export const chooseActInfo = nodeUtil.createCustomField<any>(
  'chooseActInfo',
  '已勾选活动数',
  ({ value, onChange, frameworkProps: { store }, disabled }) => {
    // 当前表单所有配置
    const { pageState } = store

    const chooseAct = pageState?.chooseAct as SingleBatchConfirmAct[]

    const chooseRecordLength = useMemo(() => {
      return (chooseAct || []).length
    }, [chooseAct])

    const [minDate, maxDate] = useMemo(() => {
      if (chooseRecordLength === 0) {
        return [null, null]
      }

      let minDate = chooseAct[0].activityStartTime
      let maxDate = chooseAct[0].activityEndTime

      chooseAct.map((item) => {
        const { activityStartTime, activityEndTime } = item
        if (activityStartTime < minDate) {
          minDate = activityStartTime
        }
        if (activityEndTime > maxDate) {
          maxDate = activityEndTime
        }
      })

      return [minDate, maxDate]
    }, [chooseAct, chooseRecordLength])

    // 按照券规则聚合活动数据
    const groupActCouponInfo = useMemo(() => {
      if (chooseRecordLength === 0) {
        return []
      }
      const couponInfo: Array<
        Pick<ConfirmContent, 'couponRule' | 'couponChannel'> & {
          productBrandChargeArr: string[]
        }
      > = []

      chooseAct.map((item) => {
        const { couponRule, couponChannel, productBrandCharge } =
          item?.confirmContent || {}

        const existCouponInfo = couponInfo.find(
          (ci) =>
            ci.couponRule === couponRule && ci.couponChannel === couponChannel
        )

        if (existCouponInfo) {
          if (
            !existCouponInfo.productBrandChargeArr.includes(productBrandCharge)
          ) {
            existCouponInfo.productBrandChargeArr =
              existCouponInfo.productBrandChargeArr.concat(productBrandCharge)
          }
        } else {
          couponInfo.push({
            couponRule,
            couponChannel,
            productBrandChargeArr: [productBrandCharge],
          })
        }
      })
      return couponInfo
    }, [chooseAct, chooseRecordLength])

    return (
      <div className="flex flex-col pt-[5px]">
        <div>
          共
          <span className="ml-2 text-[#FF4D4F]">
            {chooseRecordLength}&nbsp;&nbsp;个
          </span>
        </div>

        <div className="mt-2">
          <div className="mt-1 flex">
            <span className="w-[150px]">活动时间覆盖范围</span>
            {chooseRecordLength === 0 ? (
              <span className="text-[#ccc] ml-4">请先勾选需要确认的活动</span>
            ) : (
              <div>
                {formateDate(minDate, FormatStyle.YYYYMMDDHHmmss)}
                &nbsp;至&nbsp;
                {formateDate(maxDate, FormatStyle.YYYYMMDDHHmmss)}
              </div>
            )}
          </div>
          <div className="mt-4 flex">
            <span className="w-[150px]"> 券规则覆盖范围</span>
            {chooseRecordLength === 0 ? (
              <span className="text-[#ccc] ml-4">请先勾选需要确认的活动</span>
            ) : (
              <div>
                {groupActCouponInfo.map((item, index) => (
                  <div key={'coupon-info' + index} className="flex">
                    <div className="w-[150px] mr-4">{item.couponRule}</div>
                    <div className="w-[100px] mr-4">{item.couponChannel}</div>
                    <div className="">
                      品牌承担
                      <span>
                        {item.productBrandChargeArr.map((each, idx) => (
                          <span>
                            <span className="text-[#FF4D4F] ml-1 mr-1">
                              {each}
                            </span>
                            {idx !== item.productBrandChargeArr.length - 1
                              ? '/'
                              : ''}
                          </span>
                        ))}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  },
  {
    effectedKeys: ['chooseAct'],
    postprocess() {
      return {}
    },
  },
  {
    formItem: {
      colon: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
      className: 'mt-3',
    },
  }
)
