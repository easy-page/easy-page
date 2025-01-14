import { SubsidyLevelEnum, SubsidyRule } from '@/common/apis'
import { Table } from 'antd'

import {
  MerchantMaxSubsidyColumnId,
  MerchantMaxSubsidyScene,
  merchantMaxSubsidyColumns,
} from './columns'
import { preprocessExpandMerchantMaxSubsidy } from './preprocessMechantMaxSubsidy'
import { SubsidyConditionKeyEnum } from '@/common/constants'

export type MerchantMaxSubsidyTableProps = {
  rules?: SubsidyRule[]
  highlightPrice?: boolean
  scene?: MerchantMaxSubsidyScene
  subsidyConditionKey?: SubsidyConditionKeyEnum
  subsidyScene?: SubsidyLevelEnum
}

export const MerchantMaxSubsidyTable = ({
  rules = [],
  highlightPrice,
  scene = MerchantMaxSubsidyScene.PlanView,
  subsidyConditionKey,
  subsidyScene
}: MerchantMaxSubsidyTableProps) => {
  const data =
    preprocessExpandMerchantMaxSubsidy({
      subsidyRule: rules,
      subsidyConditionKey: subsidyConditionKey,
      subsidyScene: subsidyScene
    }) || []

  const columns = merchantMaxSubsidyColumns.getColumns({
    sence: scene,
    ids: [
      MerchantMaxSubsidyColumnId.QuanqianPrice,
      MerchantMaxSubsidyColumnId.MerchantRequestPrice,
    ],
    context: {
      highlightPrice,
    },
  })
  return (
    <Table
      pagination={false}
      columns={columns as any}
      dataSource={data}
      bordered
    ></Table>
  )
}

export * from './preprocessMechantMaxSubsidy'
