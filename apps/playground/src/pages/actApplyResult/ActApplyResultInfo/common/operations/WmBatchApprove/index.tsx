import { RequestResult, ZsptButton } from '@/common'
import './index.less'
import { Button, Modal } from 'antd'
export type BatchApproveProps<T> = {
  canApproveRecords: T[]
  onConfirm?: (params: { canApproveRecords: T[] }) => Promise<RequestResult>
}
export function WmBatchApprove<T>(props: BatchApproveProps<T>) {
  const { canApproveRecords = [], onConfirm } = props
  return (
    <ZsptButton
      type="primary"
      tips="对列表中勾选的数据进行【审核通过】操作，请先勾选需要操作的数据"
      disabled={canApproveRecords.length === 0}
      onClick={async () => {
        const res = Modal.confirm({
          title: '确认审核通过吗？',
          cancelText: '取消',
          centered: true,
          content: (
            <div>
              仅待审核的商品可进行审核通过操作，当前符合条件的商品为
              {canApproveRecords.length}个
            </div>
          ),
          okText: '确认',
          async onOk() {
            await onConfirm?.({ canApproveRecords })
            return null
          },
        })
      }}
    >
      批量审核通过
    </ZsptButton>
  )
}
