import { openInUocEntry } from '@/common/libs'
import { ToPageHandler } from '../interface'
import { UrlEnum } from '../urls'
import { appendParamsToUrl } from '../utils/appendParamsToUrl'

export enum PlanDetailParamsEnum {
  PlanId = 'planId',
  Bizline = 'bizLine',
  GroupId = 'groupId',
  PlanType = 'planType',
}

export type PlanDetailParams = {
  planId: number
  bizLine: number
  groupId?: string
  planType: number
}

export const toPlanDetailPage: ToPageHandler<PlanDetailParams> = (
  params,
  target
) => {
  openInUocEntry(appendParamsToUrl(UrlEnum.PlanDetail, params), target)
}
