import {
  getQueryNumber,
  getQueryString,
  getTablePageinationConfig,
  toJson,
} from '@/common'
import { Button, message, Switch, Table } from 'antd'
import { observer } from 'mobx-react'
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react'
import { KaConfirmResultFilter } from './components/filters'
import {
  kaConfirmResultColumns,
  KaConfirmResultColumnsEnum,
  KaConfirmResultSence,
} from './columns'
import {
  kaConfirmResultListModel,
  loadKaConfirmResultActListToModel,
} from '@/common/models/kaConfirmResultActList'

export const KaConfirmResult = observer(() => {
  const { data, pageNo, pageSize, total, loading } =
    kaConfirmResultListModel.getList()

  useEffect(() => {
    const brandId = getQueryNumber('brandId')
    loadKaConfirmResultActListToModel({ brandId })
  }, [pageNo, pageSize])

  const columns = kaConfirmResultColumns.getColumns({
    sence: KaConfirmResultSence.KaConfirmResult,
    ids: [
      KaConfirmResultColumnsEnum.Id,
      KaConfirmResultColumnsEnum.ActName,
      KaConfirmResultColumnsEnum.ActTime,
      KaConfirmResultColumnsEnum.CouponRule,
      // KaConfirmResultColumnsEnum.BrandSubsidy,
      KaConfirmResultColumnsEnum.SendChannel,
      KaConfirmResultColumnsEnum.BdConfirmTime,
      KaConfirmResultColumnsEnum.ConfirmStatusDesc,
      KaConfirmResultColumnsEnum.SubsidyRule,
      KaConfirmResultColumnsEnum.ActivityConfirmStatusDesc,
      KaConfirmResultColumnsEnum.Ctime,
      KaConfirmResultColumnsEnum.Operation,
    ],
    context: {},
  })

  return (
    <div className="p-6">
      <h3 className="mb-4">合作运营确认结果</h3>
      <KaConfirmResultFilter />
      <Table
        columns={columns}
        rowKey={'id'}
        dataSource={data}
        loading={loading}
        className="mt-4"
        scroll={{
          // y: 'calc(100vh - 420px)',
          x: 1200,
        }}
        pagination={getTablePageinationConfig({
          pageNo,
          pagination: {
            pageSize,
            pageSizeOptions: [20, 30, 50],
          },
          total,
          model: kaConfirmResultListModel,
        })}
      />
    </div>
  )
})
