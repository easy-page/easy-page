import {
  actListModel,
  ActSubTabResources,
  DownloadType,
  ZsptButton,
} from '@/common'
import { DownloadListModal } from './DownloadListModal'
import { useCallback, useState } from 'react'
import { observer } from 'mobx-react'

export type TableOperationsProps = {
  listCount: number
}

export const TableOperations = observer(
  ({ listCount }: TableOperationsProps) => {
    const disableBtn = listCount === 0
    const { filterType } = actListModel.getFilters()
    const [downloadType, setDownloadType] = useState<DownloadType>(
      DownloadType.Merge
    )
    const [showDownloadModal, setShowDownloadModal] = useState(false)
    const handleDownloadList = useCallback((downloadType) => {
      setDownloadType(downloadType)
      setShowDownloadModal(true)
    }, [])

    return (
      <div className="flex flex-row items-center">
        <ZsptButton
          onClick={() => {
            console.log('handle download')
            handleDownloadList(DownloadType.Merge)
          }}
          className="text-[#1677FF] border border-[#1677FF]"
          disabled={disableBtn}
        >
          合并下载列表
        </ZsptButton>
        {filterType === ActSubTabResources.Confirm && (
          <ZsptButton
            className="ml-2 text-[#1677FF] border border-[#1677FF]"
            onClick={() => {
              handleDownloadList(DownloadType.SplitByPoiBrand)
            }}
            disabled={disableBtn}
          >
            分商家下载列表
          </ZsptButton>
        )}
        <DownloadListModal
          isShow={showDownloadModal}
          setIsShow={setShowDownloadModal}
          downloadType={downloadType}
        />
      </div>
    )
  }
)
