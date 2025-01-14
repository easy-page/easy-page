import { RequestResult } from '@/common'
import { ZsptButton } from '@/common/components'
import React from 'react'
import RejectDialog from '../../components/RejectDialog'
import { message, Modal } from 'antd'
import { PoiListDismissCountRes } from '@/common/apis/getPoiListDismissCount'
import { ListDismissTips } from '../../components/ListDismissTips'

export type AsyncBatchCancelProps<T> = {
  getCount: (poiBrandIds: T[]) => Promise<PoiListDismissCountRes | undefined>
  canCancelRecords: T[]
  onConfirm?: (params: {
    canCancelRecords: T[]
    reason: string
  }) => Promise<RequestResult>
}
export function AsyncBatchCancel<T>(props: AsyncBatchCancelProps<T>) {
  const { canCancelRecords = [], onConfirm, getCount } = props
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

        if (reason) {
          const count = await getCount(canCancelRecords)
          Modal.confirm({
            centered: true,
            title: '确认【批量】清退所选业务品牌吗?',
            content: <ListDismissTips countInfo={count} />,
            cancelText: '取消',
            okText: '确认',
            async onOk() {
              if (count.exitCount === 0) {
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
        }
      }}
    >
      批量清退
    </ZsptButton>
  )
}
