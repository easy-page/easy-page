import React, { useEffect, useMemo, useRef, useState } from 'react'

import { Select, Table, Tabs } from 'antd'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from 'recharts'
import TabPane from 'antd/es/tabs/TabPane'
import { ActTotalInfo, ZsptDatas } from '@/admin/common/apis/getZsptDatas'
import { getQueryString } from '@/common'
import { ActStatisticsPage } from './ActStatisticPage'

interface Props {
  data: ZsptDatas
}

export const ZsptCharts: React.FC<Props> = ({ data }) => {
  const {
    allActsDatas = {},
    actsDatas = [],
    allPlansDatas = {},
    plansData = [],
    actsDatasByYears = [],
  } = data

  const isQa = getQueryString('isQa') === 'yes'
  const [selectedActs, setSelectedActs] = useState<string[]>([])
  const [selectedActsInData, setSelectedActsInData] = useState<string[]>([])

  const computedActsDatas = useMemo(() => {
    if (selectedActsInData.length === 0) return actsDatas
    return actsDatas.filter((item) => selectedActsInData.includes(item.actName))
  }, [actsDatas, selectedActsInData])

  const actOptions = useMemo(() => {
    const uniqueActs = Array.from(
      new Set(actsDatasByYears.map((act) => act.actName))
    )
    return uniqueActs.map((act) => ({ value: act, label: act }))
  }, [actsDatasByYears])

  const filteredData = useMemo(() => {
    if (selectedActs.length === 0) {
      return actsDatasByYears
    }
    return actsDatasByYears.filter((act) => selectedActs.includes(act.actName))
  }, [selectedActs, actsDatasByYears])

  const handleActChange = (values: string[]) => {
    setSelectedActs(values)
  }

  const handleActDataChange = (values: string[]) => {
    setSelectedActsInData(values)
  }

  const actTotalColumns = isQa
    ? [{ title: '活动总数', dataIndex: 'totalCount', key: 'totalCount' }]
    : [
        { title: '活动总数', dataIndex: 'totalCount', key: 'totalCount' },
        { title: '运营总数', dataIndex: 'creatorCount', key: 'creatorCount' },
      ]

  const planTotalColumns = isQa
    ? [{ title: '方案总数', dataIndex: 'totalCount', key: 'totalCount' }]
    : [
        { title: '方案总数', dataIndex: 'totalCount', key: 'totalCount' },
        { title: '运营总数', dataIndex: 'creatorCount', key: 'creatorCount' },
      ]

  const actColumns = [
    { title: '活动名称', dataIndex: 'actName', key: 'actName' },
    { title: '业务线名', dataIndex: 'bizLineName', key: 'bizLineName' },

    { title: '总数', dataIndex: 'totalCount', key: 'totalCount' },
  ]

  if (!isQa) {
    actColumns.push({
      title: '运营总数',
      dataIndex: 'creatorCount',
      key: 'creatorCount',
    })
  }

  const planColumns = [
    { title: '业务线名', dataIndex: 'bizLineName', key: 'bizLineName' },
    { title: '方案类型', dataIndex: 'planName', key: 'planName' },
    { title: '总数', dataIndex: 'totalCount', key: 'totalCount' },
  ]

  if (!isQa) {
    planColumns.push({
      title: '运营总数',
      dataIndex: 'creatorCount',
      key: 'creatorCount',
    })
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  const [tab, setTab] = useState('acts')
  return (
    <div className="p-4">
      <Tabs
        activeKey={tab}
        onChange={(val) => {
          setTab(val)
        }}
      >
        <TabPane key={'apply'} id="apply" className="pb-4" tab="报名率">
          <ActStatisticsPage />
        </TabPane>
        <TabPane key={'acts'} id="acts" className="pb-4" tab="活动数据">
          <div className="p-2">
            <h3 className="mb-2">招商活动数据汇总</h3>
            <Table
              columns={actTotalColumns}
              dataSource={[allActsDatas]}
              pagination={false}
              className="w-[300px]"
              bordered
              rowKey="totalCount"
            />
          </div>
          <div className="p-2">
            <h3 className="mb-2">活动详情</h3>
            <Select
              mode="multiple"
              style={{ width: '100%', marginBottom: 16 }}
              placeholder="选择活动（可多选）"
              onChange={handleActDataChange}
              options={actOptions}
            />
            <Table
              columns={actColumns}
              dataSource={computedActsDatas}
              bordered
              pagination={false}
              scroll={{ y: 400 }}
              rowKey="totalCount"
            />
          </div>
          <div className="p-2">
            <h3 className="mb-2">活动趋势</h3>
            <Select
              mode="multiple"
              style={{ width: '100%', marginBottom: 16 }}
              placeholder="选择活动（可多选）"
              onChange={handleActChange}
              options={actOptions}
            />
            <ActsYearlyChart data={filteredData} />
          </div>
          <h3 className="mb-2">活动占比</h3>
          <ResponsiveContainer className={'mt-2'} width="50%" height={500}>
            <PieChart>
              <Pie
                data={actsDatas}
                dataKey="totalCount"
                nameKey="actName"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {actsDatas.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </TabPane>
        {isQa ? (
          <></>
        ) : (
          <TabPane key={'plans'} id="plans" tab="方案数据">
            <div className="p-2">
              <h3 className="mb-2">方案数据汇总</h3>
              <Table
                columns={planTotalColumns}
                dataSource={[allPlansDatas]}
                className="w-[300px]"
                pagination={false}
                rowKey="totalCount"
                bordered
              />
            </div>
            <div className="p-2">
              <h3 className="mb-2">方案详情</h3>
              <Table
                columns={planColumns}
                dataSource={plansData}
                pagination={false}
                rowKey="totalCount"
              />
            </div>
            <h3 className="mb-2">方案占比</h3>
            <ResponsiveContainer width="50%" height={500}>
              <PieChart>
                <Pie
                  data={plansData}
                  dataKey="totalCount"
                  nameKey="planName"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {plansData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </TabPane>
        )}
      </Tabs>
    </div>
  )
}

interface ActsYearlyChartProps {
  data: ActTotalInfo[]
}

const ActsYearlyChart: React.FC<ActsYearlyChartProps> = ({ data }) => {
  // 处理数据
  const actNames = Array.from(new Set(data.map((item) => item.actName)))
  const months = Array.from(new Set(data.map((item) => item.month))).sort()
  console.table(data)
  const chartData = useMemo(() => {
    return months.map((month) => {
      const monthData: { [key: string]: number | string } = { month }
      actNames.forEach((name) => {
        const item = data.find((d) => d.actName === name && d.month === month)
        monthData[name] = item ? item.totalCount : 0
      })
      return monthData
    })
  }, [data])

  const COLORS = [
    '#8884d8',
    '#82ca9d',
    '#ffc658',
    '#ff7300',
    '#0088FE',
    '#00C49F',
  ]

  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          {actNames.map((name, index) => (
            <Line
              key={name}
              type="monotone"
              dataKey={name}
              stroke={COLORS[index % COLORS.length]}
              activeDot={{ r: 8 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
