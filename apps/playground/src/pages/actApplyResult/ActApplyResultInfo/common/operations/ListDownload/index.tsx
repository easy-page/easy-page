import React from 'react'
import './index.less'
import { SearchRuleId } from '../../constants'
import { RequestResult, ZsptButton } from '@/common'
import { message } from 'antd'
import { ZSPT_S3 } from '@/common/constants/upload'
import { DownloadOutlined } from '@ant-design/icons'

export type ListDownloadProps = {
  onDownlaod?: (
    filterRules: Partial<Record<SearchRuleId, any>>
  ) => Promise<RequestResult>
  filterRules: Partial<Record<SearchRuleId, any>>
}
export const ListDownload = (props: ListDownloadProps) => {
  const { onDownlaod, filterRules } = props

  return (
    <ZsptButton
      // type="primary"
      // icon={'download'}
      icon={<DownloadOutlined />}
      onClick={async () => {
        try {
          const downloadRes = await onDownlaod?.(filterRules)
          if (downloadRes.success) {
            message.success(
              downloadRes.data || '正在导出中，请注意查看大象消息'
            )
          } else {
            message.error(downloadRes.msg || '下载失败，请稍后重试')
          }
        } catch (error) {
          console.log(error)
        }
      }}
      className="result-action-btn"
    >
      列表下载
    </ZsptButton>
  )
}
