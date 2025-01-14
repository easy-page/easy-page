import { SaveReturnActInfo } from './actInfoRes'
import { ActBasicInfo } from './activityBasicInfo'
import { ActivityInfo } from './activityInfo'
import { IActRuleList } from './actRuleList'
import { IApplyControl } from './applyControl'
import { IBudget } from './budget'
import { IInvitation } from './invitation'
import { NcContentList } from './ncContentList'
import { ProductSelection } from './productSelection'
import { RiskControlResult } from './riskControlResult'
import { ISubActivity } from './subAct'
import { IWorkflow } from './workflow'

export * from './budget'
export * from './content4Shy'
export * from './customSubsidyCondition'
export * from './subsidyRatePoi2Agent'
export * from './qualify'
export * from './actInfoRes'
export * from './activityBasicInfo'
export * from './actRuleList'
export * from './applyControl'
export * from './budget'
export * from './content4Shy'
export * from './customSubsidyCondition'
export * from './invitation'
export * from './ncContentList'
export * from './productSelection'
export * from './productSubsidy'
export * from './promotionRuleInfo'
export * from './promotionTime'
export * from './qualify'
export * from './riskControlResult'
export * from './subAct'
export * from './subsidy'
export * from './subsidyRatePoi2Agent'
export * from './workflow'
export * from './activityInfo'
export * from './subsidyOfFront'
export * from './PoiBuildProduct'

export type ActFullInfo = ActBasicInfo & {
  activity: ActivityInfo
  workflow: IWorkflow
  subActivity: ISubActivity[]
  budgetControl: IBudget[]
  applyControl: IApplyControl
  budgetApplyReason?: string // 预算申请理由
  invitation: IInvitation
  actRule?: IActRuleList<ProductSelection>
  ncConetntList?: NcContentList
}

export type SaveActParams = ActFullInfo

export type SaveActRes = {
  riskControlResult: RiskControlResult
  activity: SaveReturnActInfo
}
