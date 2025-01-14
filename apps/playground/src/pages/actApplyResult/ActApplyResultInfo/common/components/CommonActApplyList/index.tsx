import { Table, Switch } from 'antd'
import { observer } from 'mobx-react'
import {
  PoiActApplyListScene,
  getPoiActApplyListColumns,
  poiActApplyListColumns,
} from './columns'
import { PoiActApplyListColumnId } from './columnIds'
import {
  ActTypeEnum,
  OPERATION_COL_KEY,
  PoiApplyListItem,
  getTablePageinationConfig,
  useParamsInfo,
} from '@/common'
import { useContext, useMemo, useState } from 'react'
import { userModel } from '@/common/models'
import { poiApplyListModel } from '@/common/models'
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

export type PoiActApplyListProps<T> = {
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
  sence: PoiActApplyListScene
  columnIds: string[]
}

export const CommonActApplyList = observer(function <T>({
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
}: PoiActApplyListProps<T>) {
  const { data: userInfo } = userModel.getData()
  const {
    data: poiApplyList,
    loading,
    total,
    pageNo,
    pageSize,
  } = listModel.getList()
  const { params } = useParamsInfo<any>()
  console.log('params胡雪测试:', params)
  const filters = listModel.getCacheFilters()
  const [choosedRecords, setChoosedRecords] = useState<T[]>([])
  const [showExtraColumn, setShowExtraColumn] = useState(true)

  const { tabRef } = useContext(CommonApplyResultContext)

  const excludeIds: PoiActApplyListColumnId[] = [
    PoiActApplyListColumnId.PoiBrandId,
    PoiActApplyListColumnId.PoiBrandName,
  ]

  const getPoiApplyListColums = (showExtraColumn: boolean) => {
    if (showExtraColumn) {
      return [...columnIds, OPERATION_COL_KEY]
    }
    return getPoiActApplyListColumns({
      excludes: excludeIds,
      columnIds,
    })
  }

  const columns = useMemo(() => {
    return poiActApplyListColumns.getColumns({
      sence,
      ids: getPoiApplyListColums(showExtraColumn),
      context: {
        userInfo,
        setTab: tabRef.current?.setTab,
      },
    })
  }, [userInfo])

  console.log('columns:', columns)
  return (
    <div className="flex flex-col">
      <div className="flex   flex-row items-center justify-between mb-2">
        {params?.promotionType === ActTypeEnum.SG_SHEN_QUAN ? (
          <div className="flex w-1/4 flex-row items-center text-sm">
            <div className="font-bold">数据展示设置：</div>
            <div className="flex flex-row items-center ">
              展示更多
              <Switch
                className="ml-2"
                size="small"
                checked={showExtraColumn}
                onChange={(e) => setShowExtraColumn(e)}
              />
            </div>
          </div>
        ) : (
          <></>
        )}
        <TopOperations
          tips={operationTips}
          filterRules={filters}
          batchDismiss={batchDismiss}
          operations={operations}
          {...(operationsProps || {})}
        />
      </div>
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
        dataSource={poiApplyList}
      ></Table>
    </div>
  )
})
