import { IContentRiskControlResult, ICostRiskControlResult } from "@/common/constants"

export type RiskControlResult = {
  contentRiskControlResult: IContentRiskControlResult
  contentRiskControlMsg: string
  costRiskControlResult: ICostRiskControlResult
  costRiskControlMsg: string
}