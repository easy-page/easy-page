import { getQueryString, getTablePageinationConfig, toJson } from '@/common'
import { Button, message, Switch, Table } from 'antd'
import { observer } from 'mobx-react'
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react'
import {
  BatchConfirmActColumns,
  batchConfirmActListColumns,
  BatchConfirmActListScene,
} from './columns'
import {
  getBatchConfirmActList,
  SingleBatchConfirmAct,
} from '@/common/apis/getBatchConfirmActList'
import {
  batchConfirmActListModel,
  loadbatchConfirmActListToModel,
} from '@/common/models/batchConfirmActList'
import { BatchConfirmActFilter } from './components/filters'

type ConfirmActListProps = {
  choosedRecords: Array<SingleBatchConfirmAct>
  setChoosedRecords: (arr: Array<SingleBatchConfirmAct>) => void
}

export const ConfirmActList = observer((props: ConfirmActListProps) => {
  const { data, pageNo, pageSize, total, loading } =
    batchConfirmActListModel.getList()

  const { choosedRecords, setChoosedRecords } = props

  const brandIdsStr = getQueryString('brandIds')
  const confirm4Batch = getQueryString('confirm4Batch')

  const brandIds = toJson(brandIdsStr, {
    defaultValue: [],
  })
  const isBtachConfirm = confirm4Batch === 'true'

  const [isSelectingAll, setIsSelectingAll] = useState(false)

  useEffect(() => {
    loadbatchConfirmActListToModel({ brandIds })
  }, [pageNo, pageSize])

  const columns = batchConfirmActListColumns.getColumns({
    sence: BatchConfirmActListScene.BatchConfirmAct,
    ids: [
      BatchConfirmActColumns.Id,
      BatchConfirmActColumns.ActName,
      BatchConfirmActColumns.ActTime,
      BatchConfirmActColumns.CouponRule,
      BatchConfirmActColumns.BrandSubsidy,
      BatchConfirmActColumns.SendChannel,
      BatchConfirmActColumns.BdConfirmTime,
      ...(!isBtachConfirm ? [BatchConfirmActColumns.ConfirmStatusDesc] : []),
      BatchConfirmActColumns.Ctime,
      BatchConfirmActColumns.Operation,
    ],
    context: {},
  })

  const flatChoosedRecord = (
    choosedRecordsOfPage: Array<SingleBatchConfirmAct>,
    totalRecordsOfPage: Array<SingleBatchConfirmAct>
  ) => {
    // 当页未被选中的数据
    const unchoosedRecordsOfPage = totalRecordsOfPage.filter(
      (item) => !choosedRecordsOfPage.find((each) => each['id'] === item['id'])
    )

    const computedChoosedRecords = [...choosedRecords]

    //遍历当页选中的数据，如果不在选中列表中，则push
    choosedRecordsOfPage.map((item) => {
      if (!computedChoosedRecords.find((each) => each['id'] === item['id'])) {
        computedChoosedRecords.push(item)
      }
    })

    // 便利当页未被选中的数据，如果在选中列表中，则剔除
    unchoosedRecordsOfPage.map((item) => {
      const index = computedChoosedRecords.findIndex(
        (each) => each['id'] === item['id']
      )
      if (index !== -1) {
        computedChoosedRecords.splice(index, 1)
      }
    })

    return computedChoosedRecords
  }

  return (
    <>
      <BatchConfirmActFilter />
      <Table
        columns={columns}
        rowKey={'id'}
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys: choosedRecords.map((e) => e.id),
          onChange(selectedRowKeys, selectedRows, info) {
            const newTotalRecords = flatChoosedRecord(selectedRows, data)
            if (newTotalRecords.length > 500) {
              message.error('最多支持同时选中500条数据')
            } else {
              setChoosedRecords(newTotalRecords)
            }
          },
          selections: [
            {
              key: 'choosePage',
              text: '全选本页',
              onSelect: () => {
                setChoosedRecords(data)
              },
            },
            {
              key: 'chooseAll',
              text: '全选所有(筛选条件下所有)',
              onSelect: async () => {
                const filters = batchConfirmActListModel.getFilters()
                setIsSelectingAll(true)
                const res = await getBatchConfirmActList({
                  ...filters,
                  brandIds,
                  getAll: true,
                } as any)
                if (res.success) {
                  const { total } = res.data
                  if (total > 600) {
                    message.error('超过600条数据，请分批次选择')
                  } else {
                    setChoosedRecords(res.data.items)
                  }
                }
                setIsSelectingAll(false)
              },
            },
          ],
        }}
        dataSource={data}
        loading={loading || isSelectingAll}
        scroll={{
          y: 300,
          x: 1000,
        }}
        pagination={getTablePageinationConfig({
          pageNo,
          pagination: {
            pageSize,
            pageSizeOptions: [20, 30, 50],
          },
          total,
          model: batchConfirmActListModel,
        })}
      />
    </>
  )
})
