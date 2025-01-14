import { RequestResult, ZsptButton } from '@/common'
import React from 'react'
import RejectDialog from '../../components/RejectDialog'
import { Button, Modal, message } from 'antd'

export type DismissProps<T> = {
  onConfirm: (options: { reason: string }) => Promise<RequestResult<any>>
}

export function Dismiss<T>(props: DismissProps<T>) {
  const { onConfirm } = props
  return (
    <ZsptButton
      type="text"
      onClick={async () => {
        const reason: string | undefined = await RejectDialog.show({
          title: '写给商家的清退理由',
          cancelText: '取消',
          okText: '确认',
          centered: true,
          placeholder: '请输入清退理由',
        })
        if (reason) {
          Modal.confirm({
            title: '确认清退吗？',
            centered: true,
            content: '清退后，商家无法再次报名本活动',
            cancelText: '取消',
            okText: '确认',
            async onOk() {
              const result = await onConfirm({
                reason,
              })
              if (result.success) {
                message.success('已成功清退该商品')
              }
              return null
            },
          })
        }
      }}
    >
      清退
    </ZsptButton>
  )
}
