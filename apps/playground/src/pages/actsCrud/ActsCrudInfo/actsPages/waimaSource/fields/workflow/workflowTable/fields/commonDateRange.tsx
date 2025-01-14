import { nodeUtil } from '@easy-page/antd-ui'
import { debounce, get } from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  ActivityStatusEnum,
  isEdit,
  isView,
  mccModel,
  MisSelectWithCheck,
} from '@/common'
import { NormalOption, SelectorOption } from '@roo/roo/Selector'
import {
  CommonDateRangeState,
  WmsActFormProps,
  WmsActFormState,
} from '../../../../interface'
import dayjs, { Dayjs } from 'dayjs'
import { DatePicker } from 'antd'

export enum FlowNodeKey {
  SkuAdmin = 'skuAdmin', //品类运营确认周期
  PurchaseManager = 'purchaseManager', //采购确认周期
  Supplier = 'supplier', //供应商报名周期
}

export const DefaultTimeRange = [
  dayjs('00:00:00', 'HH:mm:ss'),
  dayjs('23:59:59', 'HH:mm:ss'),
]

type CommonDateRangeOptions = {
  flowNode: string
  startPlaceholder: string
  needCheckCurrentTime: boolean
}

const checkTimeOverCurrentTime = ({
  time,
  timeType,
  flowNode,
  pageState,
}: {
  time: number
  timeType: 'start' | 'end'
  flowNode: FlowNodeKey
  pageState: any
}) => {
  if (isView()) {
    return true
  }

  if (!isEdit() || !time) {
    return false
  }

  const status = get(pageState, 'activity.status')
  if (
    [
      ActivityStatusEnum.Created,
      ActivityStatusEnum.Creating,
      ActivityStatusEnum.Pause,
    ].includes(status)
  ) {
    return false
  }

  if (
    [FlowNodeKey.Supplier, FlowNodeKey.SkuAdmin].includes(flowNode) &&
    timeType === 'end'
  ) {
    return false
  }

  if (dayjs(time * 1000).isBefore(dayjs(), 'minute')) {
    return true
  }

  return false
}

export const commonDateRange = (props: CommonDateRangeOptions) =>
  nodeUtil.createCustomField<
    CommonDateRangeState,
    WmsActFormState,
    WmsActFormProps
  >(
    props.flowNode,
    '',
    ({ value, onChange, disabled, frameworkProps: { store, getFormUtil } }) => {
      const pageState = store?.pageState
      const defaultValues = store?.getDefaultValues()

      console.log('defaultValues', defaultValues)

      const { flowNode, startPlaceholder } = props

      return (
        <div className="flex items-center ">
          <DatePicker
            showTime={{ defaultValue: DefaultTimeRange[0] }}
            format="YYYY-MM-DD HH:mm:ss"
            disabled={true}
            placeholder={startPlaceholder || '开始时间'}
            value={
              get(value, `startTime`)
                ? dayjs(get(value, `startTime`) * 1000)
                : undefined
            }
            onChange={(date: Dayjs) => {
              onChange({ ...value, startTime: date.unix() })
            }}
            disabledDate={(current) => {
              return current && current.isBefore(dayjs().startOf('day'))
            }}
          />
          <span className="mr-1 ml-1">-</span>
          <DatePicker
            format="YYYY-MM-DD HH:mm:ss"
            showTime={{ defaultValue: DefaultTimeRange[1] }}
            disabled={
              value?.disableEnd ||
              checkTimeOverCurrentTime({
                time: defaultValues[flowNode]?.endTime,
                timeType: 'end',
                flowNode: flowNode as FlowNodeKey,
                pageState,
              }) ||
              isView()
            }
            placeholder="结束时间"
            value={
              get(value, `endTime`)
                ? dayjs(get(value, `endTime`) * 1000)
                : undefined
            }
            onChange={(date: Dayjs) => {
              onChange({
                ...value,
                endTime: date.unix(),
              })
            }}
            disabledDate={(current) => {
              return current && current.isBefore(dayjs().startOf('day'))
            }}
          />
        </div>
      )
    },
    {
      value: {
        endTime: undefined,
        startTime: undefined,
      },
      effectedKeys: ['skuAdminPartner', 'promotionTime.timeRange'],
    },
    {
      layout: {},
      formItem: {
        labelAlign: 'right',
        className: 'col-span-8 mb-0',
        // noStyle: true,
        wrapperCol: { span: 20 },
      },
    }
  )
