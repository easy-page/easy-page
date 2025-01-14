import React, { useMemo } from 'react'
import { Form, Select, InputNumber, DatePicker, Button } from 'antd'
import dayjs from 'dayjs'
import { actStaticInfoModel } from '@/admin/common/models/actStatics'
import { observer } from 'mobx-react'
import { fullConfigsModel } from '@/admin/common/models/fullConfigs'
import { config } from 'process'
import { ConfigType, getEnv, IsConfigTemplate } from '@/common'

const { RangePicker } = DatePicker

const rangePresets: {
  label: string
  value: [dayjs.Dayjs, dayjs.Dayjs]
}[] = [
  { label: '最近2周', value: [dayjs().subtract(2, 'week'), dayjs()] },
  { label: '最近一个月', value: [dayjs().subtract(1, 'month'), dayjs()] },
  {
    label: '上一个月',
    value: [
      dayjs().subtract(1, 'month').startOf('month'),
      dayjs().subtract(1, 'month').endOf('month'),
    ],
  },
  {
    label: '上上个月',
    value: [
      dayjs().subtract(2, 'month').startOf('month'),
      dayjs().subtract(2, 'month').endOf('month'),
    ],
  },
]

export const ActStatisticsFilter: React.FC<{ onFilter: () => void }> = observer(
  ({ onFilter }) => {
    const [form] = Form.useForm()
    const { data: configs } = fullConfigsModel.getList()
    const templateIdOptions = useMemo(() => {
      return (configs || [])
        .filter(
          (x) =>
            x.isTemplate === IsConfigTemplate.No && x.type === ConfigType.Act
        )
        .map((config) => ({
          value:
            config.config?.templateInfo[getEnv() === 'test' ? 'test' : 'prod'],
          label: config.name,
        }))
    }, [configs])
    React.useEffect(() => {
      const filters = actStaticInfoModel.getFilters()
      form.setFieldsValue({
        templateIds: filters.templateIds,
        maxActCount: filters.maxActCount,
        maxReq: filters.maxReq,
        dateRange: [dayjs(filters.startTime), dayjs(filters.endTime)],
      })
    }, [])

    const onFinish = (values: any) => {
      const { templateIds, maxActCount, maxReq, dateRange } = values
      actStaticInfoModel.setFilters({
        templateIds,
        maxActCount,
        maxReq,
        startTime: dateRange[0].valueOf(),
        endTime: dateRange[1].valueOf(),
      })
      onFilter()
    }

    return (
      <Form form={form} onFinish={onFinish} layout="inline" className="mb-4">
        <Form.Item name="templateIds" label="模板ID">
          <Select
            mode="multiple"
            style={{ width: '200px' }}
            maxCount={5}
            options={templateIdOptions}
          />
        </Form.Item>
        <Form.Item name="maxActCount" label="最大活动数">
          <InputNumber min={1} max={100} />
        </Form.Item>
        <Form.Item name="maxReq" label="最大请求数">
          <InputNumber min={1} max={20} />
        </Form.Item>
        <Form.Item name="dateRange" label="时间范围">
          <RangePicker presets={rangePresets} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            筛选
          </Button>
        </Form.Item>
      </Form>
    )
  }
)
