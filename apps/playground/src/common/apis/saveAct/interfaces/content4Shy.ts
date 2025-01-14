import { SubsidyRule } from '../../savePlan'
import { StockRequestType } from './stockReq'
import { CustomSubsidyCondition } from './customSubsidyCondition'
import { SubsidyRatePoi2Agent } from './subsidyRatePoi2Agent'

// 神会员规则
export type Content4Shy = {
  /** 招商内容ID，编辑时必填 */
  id?: number
  subsidyRule: SubsidyRule[]
  /** 补贴条件多选框 */
  customSubsidyCondition: CustomSubsidyCondition
  subsidyRatePoi2Agent: SubsidyRatePoi2Agent
  stockRule: StockRequestType
}
