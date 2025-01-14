import { Table } from 'antd'
import { DiffColumnInfo } from './interface'
import { ConfigListInfo } from '@/common/apis/getConfigList'
import { ConfigId, ConfigIdText } from '@/admin/common/constant/configDiff'
import { useMemo } from 'react'

export type DiffConfigFieldInfoProps = {
  data: ConfigListInfo[]
  fields: DiffColumnInfo
  fieldId: ConfigId
}

export const DiffConfigFieldInfo = ({
  fields,
  fieldId,
  data,
}: DiffConfigFieldInfoProps) => {
  const dataSource = useMemo(() => {
    if (!fieldId) {
      return []
    }
    return data.map((each) => {
      return {
        properties: each.name,
        content: fieldId,
        config: each,
      }
    })
  }, [fieldId, data])
  return (
    <Table
      scroll={{
        y: 700,
      }}
      columns={[
        {
          dataIndex: 'properties',
          title: '配置项',
          width: 200,
        },
        {
          dataIndex: 'content',
          title: '配置内容',
          render: (val, record) => {
            console.log('fieldId:', fieldId)
            return fields[fieldId](record?.config)
          },
        },
      ]}
      bordered
      dataSource={dataSource}
      pagination={false}
    ></Table>
  )
}
