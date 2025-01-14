import { PlanJoinStatusEnum } from "@/common/constants"
import { BusinessPartitionItemArray } from "./BusinessPartition"
import { BudgetInfoType } from "./BudgetInfoType"
import { IGroupDetailAct } from "./ActDetail"

export type IGroup = {
  // 是否是新增分组(代码属性值)
  isNewGroup?: boolean
  // 分组ID, 编辑时必填
  id?: number | string
  // 分组名称
  name: string
  // 分组开始时间
  startTime: number
  // 分组结束时间
  endTime: number
  // 分组下的合作业务组
  businessPartition?: BusinessPartitionItemArray
  // 分组下的预算
  budgetInfo?: BudgetInfoType
  // 分组下提报活动ID
  actIds: number[]
  // 活动批次 ID
  batchId?: number
  // 规则文件信息
  fileInfo?: {
    fileUrl: string
    fileName: string
  }
  // 分组下提报活动详细信息
  act: IGroupDetailAct[]
  bpJoinStatus?: PlanJoinStatusEnum
  bpJoinStatusDesc?: string
}
