import { ActTypeEnum } from '@/common/constants/actTemplateIds'
import { ToPageHandler } from '../interface'
import { UrlEnum } from '../urls'
import { appendParamsToUrl } from '../utils/appendParamsToUrl'
import { BizLineEnum } from '@/common/constants'
import { openInUocEntry } from '@/common/libs'

export enum ActApplyResultParamsEnum {
  PromotionType = 'promotionType',
  ActId = 'activityId',
  GroupId = 'groupId',
  PlanId = 'planId',
  Bizline = 'bizLine',
}

export type ActApplyResultParams = {
  promotionType: ActTypeEnum
  activityId: string
  planId: string
  groupId: string
  bizLine: BizLineEnum
}

export const toActApplyResult: ToPageHandler<ActApplyResultParams> = (
  params,
  target
) => {
  openInUocEntry(appendParamsToUrl(UrlEnum.ActApplyResult, params), target)
}
