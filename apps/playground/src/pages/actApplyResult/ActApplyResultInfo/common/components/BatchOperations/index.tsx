import React, { useContext } from 'react'
import { PoiListDismissCountRes } from '@/common/apis/getPoiListDismissCount'
import './index.less'
import { BatchAction } from '../../constants'
import { BatchApproveProps, BatchApprove } from '../../operations/BatchApprove'
import { BatchCancelProps, BatchCancel } from '../../operations/BatchCancel'
import { ShowContent } from '../ShowContent'
import { AsyncBatchCancel } from '../../operations/AsyncBatchCancel'
import { CommonApplyResultContext } from '../../hooks/commonApplyResultContext'
import { TableBottomCountUnitEnum } from '../../constants/tableBottomCountUnit'
import { WmBatchCancel } from '../../operations/WmBatchCancel'
import { WmBatchApprove } from '../../operations/WmBatchApprove'

export type BatchActionsProps<T> = {
  operations: BatchAction[]
  canCancelRecords: T[]
  canApproveRecords: T[]
  choosedRecords: T[]
  onBatchCancelConfirm?: BatchCancelProps<T>['onConfirm']
  onBatchApproveConfirm?: BatchApproveProps<T>['onConfirm']
  getAsyncBatchListCount?: (
    poiBrandIds: T[]
  ) => Promise<PoiListDismissCountRes | undefined>
  onBatchCancelCount?: (
    choosedRecords: T[]
  ) => Promise<PoiListDismissCountRes | undefined>
  isSku?: boolean
}

export function BatchActions<T>(props: BatchActionsProps<T>) {
  const {
    canApproveRecords,
    operations = [],
    canCancelRecords,
    choosedRecords,
    onBatchCancelConfirm,
    onBatchApproveConfirm,
    getAsyncBatchListCount,
    onBatchCancelCount,
    isSku = false,
  } = props

  const showOperations = (curOpt: BatchAction) => {
    return operations.includes(curOpt)
  }

  const { tabRef } = useContext(CommonApplyResultContext)

  return (
    <div className="batch-actions">
      {operations.length > 0 ? (
        <div className="batch-actions-tips">
          <div>
            已选 {choosedRecords.length} 个
            {TableBottomCountUnitEnum[tabRef.current?.presentTab]}
          </div>
          <div className="batch-actions-tips-line" />
        </div>
      ) : (
        <></>
      )}
      <ShowContent whenShow={[showOperations(BatchAction.Dismiss)]}>
        {/* 批量清退 */}
        {isSku ? (
          <WmBatchCancel
            canCancelRecords={canCancelRecords}
            onConfirm={onBatchCancelConfirm}
            getCount={onBatchCancelCount}
          />
        ) : (
          <BatchCancel
            canCancelRecords={canCancelRecords}
            onConfirm={onBatchCancelConfirm}
            getCount={onBatchCancelCount}
          />
        )}
      </ShowContent>
      <ShowContent whenShow={[showOperations(BatchAction.Approve)]}>
        {isSku ? (
          <WmBatchApprove
            canApproveRecords={canApproveRecords}
            onConfirm={onBatchApproveConfirm}
          />
        ) : (
          <BatchApprove
            canApproveRecords={canApproveRecords}
            onConfirm={onBatchApproveConfirm}
          />
        )}
      </ShowContent>
      <ShowContent whenShow={[showOperations(BatchAction.AsyncDismiss)]}>
        <AsyncBatchCancel
          canCancelRecords={canApproveRecords}
          onConfirm={onBatchCancelConfirm}
          getCount={getAsyncBatchListCount}
        />
      </ShowContent>
    </div>
  )
}
