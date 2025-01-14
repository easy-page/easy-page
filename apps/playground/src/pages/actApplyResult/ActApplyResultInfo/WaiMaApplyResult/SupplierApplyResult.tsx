import { useContext, useMemo } from 'react'
import { Table } from 'antd'
import { observer } from 'mobx-react'
import { OPERATION_COL_KEY, mccModel } from '@/common'
import { userModel, sourceApplyListModel } from '@/common/models'
import {
  ResourceActApplyListColumnId,
  ResourceActApplyListScene,
  supplierActApplyListColumns,
} from './columnInfo'
import { CommonApplyResultContext } from '../common/hooks/commonApplyResultContext'

export type PoiApplyResultProps = {
  activityId: number
}

export const SupplierApplyResult = observer(
  ({ activityId }: PoiApplyResultProps) => {
    const { data: userInfo } = userModel.getData()
    const { data: SupplierApplyList, loading } =
      sourceApplyListModel.getList() || {}

    const { tabRef } = useContext(CommonApplyResultContext)

    const ids = useMemo(() => {
      const fullColumns = [
        ...Object.values(ResourceActApplyListColumnId),
        OPERATION_COL_KEY,
      ]

      return fullColumns
    }, [ResourceActApplyListColumnId])

    const columns = useMemo(() => {
      return supplierActApplyListColumns.getColumns({
        sence: ResourceActApplyListScene.SupplierApplyResult,
        ids: [...ids],
        context: {
          userInfo,
          setTab: tabRef.current?.setTab,
        },
      })
    }, [ids, userInfo, tabRef])

    return (
      <div className="flex flex-col">
        <Table
          loading={loading}
          bordered
          columns={columns}
          rowKey={'id'}
          scroll={{ x: 1100, y: 600 }}
          pagination={{ position: ['none', 'none'] }}
          dataSource={SupplierApplyList || []}
        ></Table>
      </div>
    )
  }
)
