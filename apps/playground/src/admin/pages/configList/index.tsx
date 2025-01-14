import {
  ConfigListColumnId,
  configListModel,
  loadConfigListToModel,
} from '@/admin/common'
import {
  BizLineEnum,
  getTablePageinationConfig,
  getUserInfo,
  OPERATION_COL_KEY,
  OperationType,
  userModel,
  ZsptButton,
  ZsptTab,
} from '@/common'
import { observer } from 'mobx-react'
import { useEffect, useMemo, useState } from 'react'
import { configListColumns, ConfigSence } from './columns'
import { Table } from 'antd'
import { ConfigFilter } from './filters'
import { CreateConfig } from './createConfig'
import { toConfigDiff } from '@/admin/common/routes'
import { toBatchConfig } from '@/admin/common/routes'
import { toLogList } from '@/admin/common/routes/toLogList'
import { toPreviewRecord } from '@/admin/common/routes/toPreviewRecord'
import { toZsptData } from '@/admin/common/routes/toZsptData'

export type ConfigListProps = {}

export const ConfigList = observer(() => {
  const { data: userInfo } = userModel.getData()

  const { data, pageNo, pageSize, total, loading } = configListModel.getList()
  useEffect(() => {
    loadConfigListToModel()
  }, [pageNo, pageSize])

  const fullColumns = useMemo(() => {
    return [...Object.values(ConfigListColumnId), OPERATION_COL_KEY]
  }, [])

  const columns = configListColumns.getColumns({
    /** 表明使用场景，不同的场景，对于同一个字段的展示可能有差别 */
    sence: ConfigSence.Config,
    /** 选择这个场景要展示的字段 */
    ids: fullColumns,
    /** 给每个表格字段传递表格相关上下文 */
    context: {
      userInfo,
    },
  })

  const [openCreate, setOpenCreate] = useState(false)

  return (
    <div className="relative min-w-[1100px]">
      <ConfigFilter />
      <div className="flex flex-row items-center justify-between mb-2">
        <div className="flex flex-row items-center text-sm"></div>
        <div className="flex flex-row items-center">
          <ZsptButton
            className="mr-2"
            onClick={() => {
              toZsptData({}, '_blank')
            }}
          >
            招商数据
          </ZsptButton>
          <ZsptButton
            className="mr-2"
            onClick={() => {
              toZsptData(
                {
                  isQa: 'yes',
                },
                '_blank'
              )
            }}
          >
            招商数据ST
          </ZsptButton>
          <ZsptButton
            className="mr-2"
            onClick={() => {
              toPreviewRecord(
                {
                  operationType: OperationType.CREATE,
                },
                '_blank'
              )
            }}
          >
            预览
          </ZsptButton>
          <ZsptButton
            className="mr-2"
            onClick={() => {
              toConfigDiff({}, '_blank')
            }}
          >
            配置对比
          </ZsptButton>
          <ZsptButton
            className="mr-2"
            onClick={() => {
              toBatchConfig({}, '_blank')
            }}
          >
            批量设置
          </ZsptButton>
          <ZsptButton
            className="mr-2"
            onClick={() => {
              toLogList({}, '_blank')
            }}
          >
            操作日志
          </ZsptButton>
          <ZsptButton
            type="primary"
            onClick={() => {
              // toCrudConfig(
              //   {
              //     operationType: OperationType.CREATE,
              //   },
              //   '_blank'
              // )
              setOpenCreate(true)
            }}
          >
            新建
          </ZsptButton>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        scroll={{
          // y: 'calc(100vh - 380px)',
          x: 1000,
        }}
        pagination={getTablePageinationConfig({
          pageNo,
          pagination: {
            pageSize,
          },
          total,
          model: configListModel,
        })}
      />
      <CreateConfig open={openCreate} setOpen={setOpenCreate} />
    </div>
  )
})
