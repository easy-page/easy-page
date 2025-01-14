import React from 'react'
import './index.less'
import { Modal, Table } from 'antd'
import { DotText } from '@/common/components'
import { ExitPoiApplyRes } from '@/common'
import { DismissActSkuRes } from '@/common/apis/batchDismiss'

export const showBatchCancelResult = (
  options: ExitPoiApplyRes,
  onConfirm: () => void
) => {
  if (!options) {
    return
  }
  const { title, failRecords } = options
  const failCount = failRecords.length

  Modal.confirm({
    title: '操作成功',
    centered: true,
    className: 'batch-tips',
    onOk: onConfirm,
    content: (
      <div className="">
        <div className="batch-tips-title">{title}</div>
        {failCount > 0 ? (
          <Table
            pagination={false}
            rowKey={'id'}
            columns={[
              {
                width: 100,
                dataIndex: 'poiId',
                title: '门店 ID',
              },
              {
                width: 100,
                dataIndex: 'poiName',
                title: '门店名称',
              },
              {
                width: 250,
                dataIndex: 'reason',
                title: '理由',
                render: (text) => (
                  <DotText line={1} className="w-[220px]">
                    {text}
                  </DotText>
                ),
              },
            ]}
            dataSource={failRecords}
          />
        ) : (
          <></>
        )}
      </div>
    ),
  })
}

export const showBatchCancelSkuResult = (
  options: DismissActSkuRes,
  onConfirm: () => void
) => {
  if (!options) {
    return
  }
  const { title, failRecords } = options
  const failCount = failRecords.length

  Modal.confirm({
    title: '操作成功',
    centered: true,
    className: 'batch-tips',
    onOk: onConfirm,
    content: (
      <div className="">
        <div className="batch-tips-title">{title}</div>
        {failCount > 0 ? (
          <Table
            pagination={false}
            rowKey={'id'}
            columns={[
              {
                width: 100,
                dataIndex: 'skuName',
                title: '商品名称',
              },
              {
                width: 100,
                dataIndex: 'skuId',
                title: '商品 ID',
              },
              {
                width: 250,
                dataIndex: 'reason',
                title: '理由',
                render: (text) => (
                  <DotText line={1} className="w-[220px]">
                    {text}
                  </DotText>
                ),
              },
            ]}
            dataSource={failRecords}
          />
        ) : (
          <></>
        )}
      </div>
    ),
  })
}
