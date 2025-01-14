import {
  BizLineEnum,
  getTablePageinationConfig,
  actListModel,
  OPERATION_COL_KEY,
  getQueryNumber,
} from '@/common'
import { Button, Switch, Table } from 'antd'
import { observer } from 'mobx-react'
import { useEffect, useMemo, useState } from 'react'
import {
  brandStatListModel,
  loadBrandStatListToModel,
} from '@/common/models/brandStatList'
import {
  BrandStatColumns,
  brandStatListColumns,
  BrandStatListScene,
} from './columns'
import { ConfirmBrandListFilter } from './components/filters'
import { SingleBrandStatInfo } from '@/common/apis/getBrandStatList'
import { BatchConfirmBrandButton } from './components/batchConfirmButton'
import { loadBrandSelectListToModel } from '@/common/models/brandSelectList'
import { grayConfigModel } from '@/common/models/grayConfig'

export const ConfirmBrandList = observer(() => {
  const { data, pageNo, pageSize, total, loading } =
    brandStatListModel.getList()

  const [choosedRecords, setChoosedRecords] = useState<
    Array<SingleBrandStatInfo>
  >([])

  useEffect(() => {
    loadBrandStatListToModel()
  }, [pageNo, pageSize])

  const columns = brandStatListColumns.getColumns({
    sence: BrandStatListScene.BrandConfirm,
    ids: [
      BrandStatColumns.BrandId,
      BrandStatColumns.BrandName,
      BrandStatColumns.AmountInConfirmPeriod,
      BrandStatColumns.AmountTobeConfirm,
      BrandStatColumns.AmountToBeginConfirm,
      BrandStatColumns.ConfirmTableOpetation,
    ],
    context: {},
  })

  const {
    data: { batchConfirm4ButtonGray = '0' },
  } = grayConfigModel.getData()

  return (
    <>
      <ConfirmBrandListFilter />
      {String(batchConfirm4ButtonGray) === '1' ? (
        <div>
          <BatchConfirmBrandButton selectRecords={choosedRecords} />
        </div>
      ) : (
        <></>
      )}

      <Table
        columns={columns}
        rowKey={'brandId'}
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys: choosedRecords.map((e) => e['brandId']),
          onChange(selectedRowKeys, selectedRows, info) {
            setChoosedRecords(selectedRows)
          },
          // selections: [Table.SELECTION_ALL],
        }}
        dataSource={data}
        loading={loading}
        scroll={{
          // y: 'calc(100vh - 420px)',
          x: 1000,
        }}
        pagination={false}
      />
    </>
  )
})
