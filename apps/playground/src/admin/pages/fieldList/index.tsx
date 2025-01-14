import {
  FieldListColumnId,
  fieldListModel,
  loadFieldListToModel,
} from '@/admin/common'
import {
  getTablePageinationConfig,
  OPERATION_COL_KEY,
  OperationType,
  userModel,
  ZsptButton,
} from '@/common'
import { observer } from 'mobx-react'
import { useEffect, useMemo, useState } from 'react'
import { Table } from 'antd'
import { FieldFilter } from './filters'
import { fieldListColumns, FieldSence } from './columns'
import { CrudField } from './curd'

export type ConfigListProps = {}

export const FieldList = observer(() => {
  const { data: userInfo } = userModel.getData()
  const { data, pageNo, pageSize, total, loading } = fieldListModel.getList()
  console.log('data:11111', data)
  useEffect(() => {
    loadFieldListToModel()
  }, [pageNo, pageSize])

  const fullColumns = useMemo(() => {
    return [...Object.values(FieldListColumnId), OPERATION_COL_KEY]
  }, [])

  const [showDrawer, setShowDrawer] = useState<{
    id?: number
    operationType: OperationType
  } | null>()

  const columns = fieldListColumns.getColumns({
    /** 表明使用场景，不同的场景，对于同一个字段的展示可能有差别 */
    sence: FieldSence.Field,
    /** 选择这个场景要展示的字段 */
    ids: fullColumns,
    /** 给每个表格字段传递表格相关上下文 */
    context: {
      userInfo: userInfo,
      showCrudDrawer(id, operationType) {
        setShowDrawer({ id, operationType })
      },
    },
  })

  return (
    <div className="relative min-w-[1100px]">
      <FieldFilter />
      <div className="flex flex-row items-center justify-between mb-2">
        <div className="flex flex-row items-center text-sm"></div>
        <div>
          <ZsptButton
            type="primary"
            onClick={() => {
              setShowDrawer({ operationType: OperationType.CREATE })
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
          model: fieldListModel,
        })}
      />
      <CrudField
        id={showDrawer?.id}
        onOpen={() => {
          setShowDrawer({
            operationType: OperationType.CREATE,
          })
        }}
        operationType={showDrawer?.operationType}
        onClose={() => {
          setShowDrawer(null)
        }}
      />
    </div>
  )
})
