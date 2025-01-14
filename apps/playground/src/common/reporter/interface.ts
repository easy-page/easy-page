import { PlanTypeEnum } from '../constants'
import { BizLineEnum } from '@/common/constants'

export type SavePlanSuccessInfo = {
  planType: PlanTypeEnum // PlanType 的文本
  bizline: BizLineEnum
}

export type SaveActEventParams = {
  bizLine: number
  success: boolean
  msg?: string
  traceid?: string
  actType: string
}

export type SavePlanEventParams = {
  bizLine: number
  success: boolean
  planType: PlanTypeEnum
  msg?: string
  traceid?: string
}
