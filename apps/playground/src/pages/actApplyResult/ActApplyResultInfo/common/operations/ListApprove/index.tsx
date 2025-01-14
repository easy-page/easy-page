import React from 'react'
import { SearchRuleId } from '../../constants'
import { RequestResult, ZsptButton } from '@/common'
import { Modal, message } from 'antd'
import { CommonTips } from '../../components/CommonTips'

export type ListApproveProps = {
  filterRules: Partial<Record<SearchRuleId, any>>
  /** 返回待处理数量 */
  getCount: (
    filterRules: Partial<Record<SearchRuleId, any>>
  ) => Promise<number | undefined>
  onConfirm?: (
    filterRules: Partial<Record<SearchRuleId, any>>
  ) => Promise<RequestResult>
}
export const ListApprove = (props: ListApproveProps) => {
  const { onConfirm, filterRules, getCount } = props
  return (
    <ZsptButton
      className="result-action-btn"
      onClick={async () => {
        const count = await getCount(filterRules)
        Modal.confirm({
          centered: true,
          title: '确认列表内全部活动审核通过吗？',
          content: <CommonTips count={count} />,
          cancelText: '取消',
          okText: '确认',
          async onOk() {
            const result = await onConfirm?.(filterRules)

            return result
          },
        })
      }}
    >
      列表审核通过
    </ZsptButton>
  )
}
