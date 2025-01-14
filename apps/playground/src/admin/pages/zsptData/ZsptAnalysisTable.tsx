import React from 'react'
import { Table } from 'antd'
import { ActStaticInfo } from '@/admin/common/models/actStatics'
import { BIZ_TYPE_MAP, toNumber } from '@/common'

interface SummaryData {
  applyCount: number
  invitePoiCount: number
  applyGoodCount: number
  applyRate: number
  actCounts: number
}

interface ActStatisticsTableProps {
  data: ActStaticInfo[]
  loading: boolean
}

export const ActStatisticsTable: React.FC<ActStatisticsTableProps> = ({
  data,
  loading,
}) => {
  // 计算汇总数据
  const summaryData: SummaryData = data.reduce(
    (acc, curr) => ({
      applyCount: acc.applyCount + curr.applyCount,
      invitePoiCount: acc.invitePoiCount + curr.invitePoiCount,
      applyGoodCount: acc.applyGoodCount + curr.applyGoodCount,
      applyRate: acc.applyRate + curr.applyRate,
      actCounts: acc.actCounts + curr.actCounts,
    }),
    {
      applyCount: 0,
      invitePoiCount: 0,
      applyGoodCount: 0,
      applyRate: 0,
      actCounts: 0,
    }
  )

  // 计算平均报名率
  summaryData.applyRate = toNumber(
    (summaryData.applyRate / data.length).toFixed(2)
  )

  const summaryColumns = [
    { title: '已报名门店数', dataIndex: 'applyCount', key: 'applyCount' },
    {
      title: '已邀请门店数',
      dataIndex: 'invitePoiCount',
      key: 'invitePoiCount',
    },
    {
      title: '已报名商品数',
      dataIndex: 'applyGoodCount',
      key: 'applyGoodCount',
    },
    {
      title: '平均报名率',
      dataIndex: 'applyRate',
      key: 'applyRate',
      render: (value: number) => `${(value * 100).toFixed(2)}%`,
    },
    { title: '总活动数量', dataIndex: 'actCounts', key: 'actCounts' },
  ]

  const detailColumns = [
    { title: '模板ID', dataIndex: 'templateId', key: 'templateId' },
    { title: '模板名称', dataIndex: 'templateName', key: 'templateName' },
    { title: '已报名门店数', dataIndex: 'applyCount', key: 'applyCount' },
    {
      title: '已邀请门店数',
      dataIndex: 'invitePoiCount',
      key: 'invitePoiCount',
    },
    {
      title: '已报名商品数',
      dataIndex: 'applyGoodCount',
      key: 'applyGoodCount',
    },
    {
      title: '报名率',
      dataIndex: 'applyRate',
      key: 'applyRate',
      render: (value: number) => `${(value * 100).toFixed(2)}%`,
    },
    { title: '活动数量', dataIndex: 'actCounts', key: 'actCounts' },
    {
      title: '业务线',
      dataIndex: 'bizLine',
      key: 'bizLine',
      render: (value: number) => BIZ_TYPE_MAP[value],
    },
  ]

  return (
    <>
      <div className="mb-4">
        <h2 className="mb-2">汇总统计</h2>
        <Table
          dataSource={[summaryData]}
          columns={summaryColumns}
          pagination={false}
          loading={loading}
          className="w-[700px]"
          rowKey={() => 'summary'}
        />
      </div>

      <h2 className="mb-2">详细统计</h2>
      <Table
        dataSource={data}
        columns={detailColumns}
        loading={loading}
        pagination={{ pageSize: 10 }}
        rowKey="templateId"
      />
    </>
  )
}
