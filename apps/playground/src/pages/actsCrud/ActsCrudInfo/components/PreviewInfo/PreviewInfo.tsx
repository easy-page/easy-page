import { ActFullInfo, FactorInfo } from '@/common'
import { Table } from 'antd'
import { PreviewColumnInfo } from './interface'

export type PreviewInfoProps = {
  data: ActFullInfo
  fields: PreviewColumnInfo[]
  factors: FactorInfo
}

export const PreviewInfo = ({ fields, data, factors }: PreviewInfoProps) => {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="mb-2">请先检查活动配置信息：</div>
      <Table
        columns={[
          {
            dataIndex: 'properties',
            title: '配置项',
          },
          {
            dataIndex: 'content',
            title: '配置内容',
            render: (val) => {
              if (typeof val === 'string') {
                return <div>{val}</div>
              }
              return val
            },
          },
        ]}
        bordered
        dataSource={fields.map((each) => ({
          properties: each.properties,
          content: each.content(data, { factors }),
        }))}
        pagination={false}
      ></Table>
    </div>
  )
}
