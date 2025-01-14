import {
  configListModel,
  loadConfigListToModel,
  LogListColumnId,
} from '@/admin/common'
import { loadLogListToModel, logListModel } from '@/admin/common/models/logs'
import {
  BaseContainer,
  getTablePageinationConfig,
  OPERATION_COL_KEY,
  OperationType,
  userModel,
  ZsptButton,
} from '@/common'
import { observer } from 'mobx-react'
import { useEffect, useMemo, useState } from 'react'
import { logListColumns, LogListSence } from './columns'
import { LogFilter } from './filters'
import { Table } from 'antd'
import { ConfigLogInfoType } from '@/admin/common/apis/getLogList'
import { CrudLog } from './curd'

export type OpLogsParams = {}

export const OpLogs = observer(() => {
  const { data: userInfo } = userModel.getData()
  const { data, pageNo, pageSize, total, loading, error } =
    logListModel.getList()

  const {
    data: configs,
    loading: configLoading,
    error: configError,
  } = configListModel.getList()
  useEffect(() => {
    loadLogListToModel()
  }, [pageNo, pageSize])

  useEffect(() => {
    configListModel.changePage({ pageSize: 10000, pageNo: 1 })
    loadConfigListToModel()
  }, [])

  const fullColumns = useMemo(() => {
    return [...Object.values(LogListColumnId), OPERATION_COL_KEY]
  }, [])

  const [showDrawer, setShowDrawer] = useState<{
    record?: ConfigLogInfoType
    operationType: OperationType
  } | null>()

  const columns = logListColumns.getColumns({
    /** 表明使用场景，不同的场景，对于同一个字段的展示可能有差别 */
    sence: LogListSence.LogList,
    /** 选择这个场景要展示的字段 */
    ids: fullColumns,
    /** 给每个表格字段传递表格相关上下文 */
    context: {
      configs,
      userInfo: userInfo,
      showDrawer(record, operationType) {
        setShowDrawer({ record, operationType })
      },
    },
  })
  console.log('datadata:', data)
  return (
    <div className="relative min-w-[1100px] p-8">
      <LogFilter configs={configs} />
      <BaseContainer
        error={error || configError}
        loading={loading || configLoading}
      >
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
            model: logListModel,
          })}
        />
        <CrudLog
          record={showDrawer?.record}
          key={showDrawer?.record?.id}
          onClose={() => {
            setShowDrawer(null)
          }}
        />
      </BaseContainer>
    </div>
  )
})
