import React from 'react'
import { message, Modal } from 'antd'
import dayjs from 'dayjs'
import {
  ActApplyResultParams,
  RequestResult,
  toNumber,
  useParamsInfo,
} from '@/common'
import { ZsptButton } from '@/common/components'
import { PoiListDismissCountRes } from '@/common/apis/getPoiListDismissCount'
import RejectDialog from '../../components/RejectDialog'

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

export function WmBatchCancel<T>(props: BatchCancelProps<T>) {
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
      tips="对列表中勾选的数据进行【清退】操作，请先勾选需要操作的数据 "
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
          Modal.confirm({
            title: '确认清退吗？',
            cancelText: '取消',
            centered: true,
            content: `仅未清退的活动可进行清退通过操作，当前符合条件的商品为${canCancelRecords.length}个`,
            okText: '确认',
            async onOk() {
              await onConfirm?.({
                canCancelRecords,
                reason: reason,
              })
              return null
            },
          })
        } else if(reason) {
          batchCancelCustomHandler({ reason, canCancelRecords })
        }
      }}
    >
      批量清退
    </ZsptButton>
  )
}
