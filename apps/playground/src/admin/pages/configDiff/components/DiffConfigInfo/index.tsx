import { Table } from 'antd'
import { DiffColumnInfo } from './interface'
import { ConfigInfo, ConfigListInfo } from '@/common/apis/getConfigList'
import { ConfigId, ConfigIdText } from '@/admin/common/constant/configDiff'
import { useMemo } from 'react'
import { deepCompareConfig } from '@/admin/pages/crudConfig/utils/getChanges'
import classNames from 'classnames'
import './index.less'

export type DiffConfigInfoProps = {
  data: ConfigListInfo[]
  fields: DiffColumnInfo
  actIds: number[]
  /** 需要展示的 key */
  filterFields?: string[]
  /** 是否只展示单个记录 */
  onlyOneRecord?: boolean
}

export const DiffConfigInfo = ({
  fields,
  actIds = [],
  data,
  onlyOneRecord,
  filterFields,
}: DiffConfigInfoProps) => {
  const actConfigs = useMemo(() => {
    return data.filter((x) => actIds.includes(x.id))
  }, [actIds, data])

  console.log('diff config datas:', data, actIds)

  const dataSource = useMemo(() => {
    const ids = Object.keys(ConfigIdText).map((e) => ({
      properties: ConfigIdText[e],
      content: e,
    }))
    if (!filterFields) {
      return ids
    }
    return ids.filter((x) => filterFields.includes(x.content))
  }, [filterFields])

  const fisrtConfig = actConfigs[0]
  const secConfig = actConfigs[1]
  const columns = useMemo(() => {
    const diffInfos = deepCompareConfig(
      fisrtConfig?.config || ({} as ConfigInfo),
      secConfig?.config || ({} as ConfigInfo)
    )
    console.log('diffInfosdiffInfos:', diffInfos)
    const baseColumns = [
      {
        dataIndex: 'properties',
        title: '配置项',
        width: 200,
        render: (val, record) => {
          const hasChanged = diffInfos.changedKeys?.includes(record.content)
          return {
            props: {
              className: 'relative',
            },
            children: (
              <div>
                {hasChanged ? (
                  <div
                    className={classNames({
                      'ribbon-5': hasChanged,
                    })}
                  >
                    <span>差异</span>
                  </div>
                ) : (
                  <></>
                )}
                {val}
              </div>
            ),
          }
        },
      },
      {
        dataIndex: 'content',
        title: fisrtConfig?.name,
        width: 400,
        render: (val) => {
          return fields[val](fisrtConfig)
        },
      },
    ]
    if (secConfig) {
      baseColumns.push({
        dataIndex: 'content',
        title: secConfig?.name,
        width: 400,
        render: (val) => {
          return fields[val](secConfig)
        },
      })
    }
    return baseColumns
  }, [fisrtConfig, secConfig, fields])

  if (actConfigs.length < 2 && !onlyOneRecord) {
    return <div>请选择要对比的两个活动</div>
  }

  return (
    <Table
      scroll={{
        y: 700,
      }}
      columns={columns}
      bordered
      dataSource={dataSource}
      pagination={false}
    ></Table>
  )
}
