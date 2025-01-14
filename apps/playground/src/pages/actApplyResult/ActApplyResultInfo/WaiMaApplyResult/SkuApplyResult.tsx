import { useContext, useMemo } from 'react'
import { Table } from 'antd'
import { observer } from 'mobx-react'
import { sourceApplyListModel, userModel } from '@/common'
import {
  ResourceActApplyListScene,
  ResourceSkuActApplyListColumnId,
  skuApplyListColumns,
} from './columnInfo'
import { CommonApplyResultContext } from '../common/hooks/commonApplyResultContext'

export type SkuApplyResultProps = {
  activityId: number
}

export const SkuApplyResult = observer(
  ({ activityId }: SkuApplyResultProps) => {
    const { tabRef } = useContext(CommonApplyResultContext)
    const { data: userInfo } = userModel.getData()
    const { data: SkuApplyList, loading } = sourceApplyListModel.getList() || {}

    const ids = useMemo(() => {
      const fullColumns = [...Object.values(ResourceSkuActApplyListColumnId)]

      return fullColumns
    }, [ResourceSkuActApplyListColumnId])

    const columns = useMemo(() => {
      return skuApplyListColumns.getColumns({
        sence: ResourceActApplyListScene.SkuApplyResult,
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
          rowKey={'skuUpdateTime'}
          scroll={{ x: 1100, y: 600 }}
          pagination={{ position: ['none', 'none'] }}
          dataSource={SkuApplyList || []}
        ></Table>
      </div>
    )
  }
)
