import { Button } from '@roo/roo'
import React from 'react'
import { SearchRuleId } from '../../constants'
import { RequestResult, ZsptButton } from '@/common'
import RejectDialog from '../../components/RejectDialog'
import { Modal, message } from 'antd'
import { CommonTips } from '../../components/CommonTips'
import { ListDismissTips } from '../../components/ListDismissTips'
import { PoiListDismissCountRes } from '@/common/apis/getPoiListDismissCount'

export type ListDismissCustomHandler = (context: {
  reason: string
  filterRules: Partial<Record<SearchRuleId, any>>
}) => void

export type ListDismissProps = {
  getCount: (
    filterRules: Partial<Record<SearchRuleId, any>>
  ) => Promise<PoiListDismissCountRes | undefined>
  onConfirm?: (options: {
    reason: string
    filterRules: Partial<Record<SearchRuleId, any>>
  }) => Promise<RequestResult>
  filterRules: Partial<Record<SearchRuleId, any>>
  isDisabled: boolean
  listDismissCustomHandler?: ListDismissCustomHandler
}
export const ListDismiss = (props: ListDismissProps) => {
  const {
    onConfirm,
    filterRules,
    listDismissCustomHandler,
    getCount,
    isDisabled,
  } = props
  return (
    <ZsptButton
      type="primary"
      disabled={isDisabled}
      onClick={async () => {
        const reason: string | undefined = await RejectDialog.show({
          title: '写给商家的清退理由',
          cancelText: '取消',
          okText: '确认',
          centered: true,
          placeholder: '请输入清退理由',
        })
        if (reason && !listDismissCustomHandler) {
          const count = await getCount(filterRules)

          Modal.confirm({
            centered: true,
            title: '确认【按列表】清退所有门店吗?',
            content: <ListDismissTips countInfo={count} />,
            cancelText: '取消',
            okText: '确认',
            async onOk(e, type) {
              if (count.exitCount === 0) {
                message.warning('无可清退的门店')
                return null
              }
              const result = await onConfirm?.({ reason, filterRules })
              return result
            },
          })
        } else if (reason){
          console.log('胡雪测试123', listDismissCustomHandler)
          listDismissCustomHandler({ reason, filterRules })
        }
      }}
    >
      列表清退
    </ZsptButton>
  )
}
