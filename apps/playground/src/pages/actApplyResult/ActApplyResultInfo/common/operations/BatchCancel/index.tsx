import {
  ActApplyResultParams,
  RequestResult,
  toNumber,
  useParamsInfo,
} from '@/common'
import { ZsptButton } from '@/common/components'
import React from 'react'
import RejectDialog from '../../components/RejectDialog'
import { message, Modal } from 'antd'
import dayjs from 'dayjs'
import {
  getPoiListDismissCount,
  PoiListDismissCountRes,
} from '@/common/apis/getPoiListDismissCount'
import { ListDismissTips } from '../../components/ListDismissTips'
import { SearchRuleId } from '../../constants'

export type BatchCancelCustomHandler<T> = (context: {
  reason: string
  canCancelRecords: T[]
}) => void

export type BatchCancelProps<T> = {
  canCancelRecords: T[]
  onConfirm?: (params: {
    canCancelRecords: T[]
    reason: string
  }) => Promise<RequestResult>
  getCount?: (
    choosedRecords: T[]
  ) => Promise<PoiListDismissCountRes | undefined>
  batchCancelCustomHandler?: BatchCancelCustomHandler<T>
}
export function BatchCancel<T>(props: BatchCancelProps<T>) {
  const {
    canCancelRecords = [],
    onConfirm,
    getCount,
    batchCancelCustomHandler,
  } = props

  const { params } = useParamsInfo<ActApplyResultParams>()
  const actId = toNumber(params.activityId)

  return (
    <ZsptButton
      type="primary"
      tips="对列表中勾选的数据进行【批量清退】操作，请先勾选需要操作的数据 "
      className="m-right-sm"
      disabled={canCancelRecords.length === 0}
      onClick={async () => {
        const reason: string | undefined = await RejectDialog.show({
          title: '写给商家的清退理由',
          cancelText: '取消',
          okText: '确认',
          centered: true,
          placeholder: '请输入清退理由',
        })
        if (reason && !batchCancelCustomHandler) {
          const res = await getCount(canCancelRecords)

          Modal.confirm({
            title: '确认【批量】清退所选门店吗？',
            cancelText: '取消',
            centered: true,
            content: <ListDismissTips countInfo={res} />,
            okText: '确认',
            async onOk() {
              if (res.exitCount === 0) {
                message.warning('无可清退的门店')
                return null
              }
              await onConfirm?.({
                canCancelRecords,
                reason: reason,
              })
              return null
            },
          })
        } else {
          batchCancelCustomHandler({ reason, canCancelRecords })
        }
      }}
    >
      批量清退
    </ZsptButton>
  )
}
