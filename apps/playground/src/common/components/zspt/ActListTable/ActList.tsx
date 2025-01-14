import { getBizLine, toNumber } from '@/common/libs'
import { actListModel, loadActListToModel } from '@/common/models'
import { mccModel } from '@/common/models'
import { userModel } from '@/common/models'
import { Table } from 'antd'
import { observer } from 'mobx-react'
import { useEffect } from 'react'
import {
  ActListColumnId,
  ActListScene,
  ActSubTabResources,
  OPERATION_COL_KEY,
} from '@/common/constants'
import { getTablePageinationConfig } from '@/common/utils'
import { actListColumns } from '../columns'
import { configListModel } from '@/common/models/configList'

const ROW_IDS = [...Object.values(ActListColumnId), OPERATION_COL_KEY].filter(
  (e) => ![ActListColumnId.ActStatsInfo].includes(e as ActListColumnId)
)

export type ActListTableProps = {
  subPlanId: number
  /** 变化之后，会重新查询 */
  choosePlanId?: number
  rowIds?: string[]
}

/**
 * - 用于方案编辑页面活动列表
 * - 用于查看方案页活动列表
 */
export const ActListTable = observer(
  ({ subPlanId, choosePlanId, rowIds = ROW_IDS }: ActListTableProps) => {
    const { data, pageNo, pageSize, total, loading } = actListModel.getList()
    const { data: userInfo } = userModel.getData() || {}
    const { data: mccConfig } = mccModel.getData() || {}
    const { data: configs } = configListModel.getList()
    useEffect(() => {
      if (subPlanId && subPlanId === choosePlanId) {
        loadActListToModel({
          groupId: subPlanId,
          bizLine: getBizLine(),
          filterType: ActSubTabResources.All,
        })
      } }, [subPlanId, pageNo, pageSize, choosePlanId])

    const columns = actListColumns.getColumns({
      sence: ActListScene.CrudPlan,
      ids: rowIds,
      context: {
        userInfo,
        mccConfig,
        configs,
      },
    })

    return (
      <Table
        columns={columns}
        dataSource={subPlanId ? data: []}
        bordered
        loading={loading}
        scroll={{
          y: 550,
          x: 1100,
        }}
        pagination={getTablePageinationConfig({
          pageNo,
          pagination: {
            pageSize,
          },
          total: subPlanId ? total : 0,
          model: actListModel,
        })}
      />
    )
  }
)
