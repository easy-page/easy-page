import { Table } from 'antd'
import { observer } from 'mobx-react'
import { SkuActApplyListScene, skuActApplyListColumns } from './columns'
import {
  OPERATION_COL_KEY,
  PoiApplyListItem,
  getTablePageinationConfig,
} from '@/common'
import { useContext, useMemo, useState } from 'react'
import { userModel } from '@/common/models'
import { BatchAction } from '../../constants'
import { BatchActions, BatchActionsProps } from '../BatchOperations'
import { TopOperations, TopOperationsProps } from '../TopOperations'
import { ListModel } from '@/common/models/base/list'
import { CommonApplyResultContext } from '../../hooks/commonApplyResultContext'
import { configListModel } from '@/common/models/configList'

export type PageInfo = {
  currentPage: number
  pageSize: number
}

export type SkuActApplyListProps<T> = {
  operations: BatchAction[]
  operationsProps?: Pick<
    TopOperationsProps,
    | 'onListApproveConfirm'
    | 'onListDismissConfirm'
    | 'onListDownloadConfirm'
    | 'onListDismissCount'
    | 'onListApproveCount'
    | 'listDismissCustomHandler'
    | 'batchCancelCustomHandler'
  > &
    Pick<
      BatchActionsProps<T>,
      | 'onBatchApproveConfirm'
      | 'onBatchCancelConfirm'
      | 'getAsyncBatchListCount'
      | 'onBatchCancelCount'
    >
  operationTips?: React.ReactNode
  batchDismiss?: React.ReactNode
  disableSelect?: boolean
  getCanCancelRecords?: (choosedRecords: T[]) => T[]
  getCanApproveRecords?: (choosedRecords: T[]) => T[]
  listModel: ListModel<T, any>
  loadListData: (props: Record<string, any>) => void
  sence: SkuActApplyListScene
  columnIds: string[]
}

export const CommonSkuActApplyList = observer(function <T>({
  operations,
  operationsProps,
  operationTips,
  batchDismiss,
  disableSelect,
  getCanApproveRecords,
  getCanCancelRecords,
  listModel,
  sence,
  columnIds,
}: SkuActApplyListProps<T>) {
  const { data: userInfo } = userModel.getData()
  const {
    data: skuApplyList,
    loading,
    total,
    pageNo,
    pageSize,
  } = listModel.getList()

  const filters = listModel.getCacheFilters()
  const [choosedRecords, setChoosedRecords] = useState<T[]>([])

  const { tabRef } = useContext(CommonApplyResultContext)

  const columns = useMemo(() => {
    return skuActApplyListColumns.getColumns({
      sence,
      ids: [...columnIds, OPERATION_COL_KEY],
      context: {
        userInfo,
        setTab: tabRef.current?.setTab,
      },
    })
  }, [userInfo])

  console.log('columns:', columns)

  return (
    <div className="flex flex-col">
      <TopOperations
        tips={operationTips}
        filterRules={filters}
        batchDismiss={batchDismiss}
        operations={operations}
        {...(operationsProps || {})}
        disableListDismissWithoutFilter={true}
      />
      <Table
        loading={loading}
        bordered
        columns={columns}
        rowKey={'id'}
        rowSelection={
          disableSelect
            ? undefined
            : {
                selectedRowKeys: choosedRecords.map(
                  (e) => (e as { id: string }).id
                ),
                onChange(selectedRowKeys, selectedRows, info) {
                  setChoosedRecords(selectedRows as T[])
                },
              }
        }
        scroll={{ x: 1100, y: 600 }}
        footer={() => {
          return disableSelect ? (
            <></>
          ) : (
            <BatchActions
              isSku
              choosedRecords={choosedRecords}
              canCancelRecords={getCanCancelRecords(choosedRecords)}
              canApproveRecords={getCanApproveRecords(choosedRecords)}
              operations={operations}
              {...(operationsProps || {})}
            />
          )
        }}
        pagination={getTablePageinationConfig({
          pageNo,
          pagination: {
            pageSize,
          },
          total,
          model: listModel,
        })}
        dataSource={skuApplyList}
      ></Table>
    </div>
  )
})
