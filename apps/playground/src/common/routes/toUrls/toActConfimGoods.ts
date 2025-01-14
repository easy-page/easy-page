import { ActTypeEnum } from '@/common/constants/actTemplateIds'
import { BizLineEnum } from '@/common/constants'
import { openInUocEntry } from '@/common/libs'
import { ToPageHandler } from '../interface'
import { UrlEnum } from '../urls'
import { appendParamsToUrl } from '../utils/appendParamsToUrl'

export enum ActConfimGoodsParamsEnum {
  PromotionType = 'promotionType',
  ActId = 'activityId',
  GroupId = 'groupId',
  PlanId = 'planId',
  Bizline = 'bizLine',
}

export type ActConfimGoodsParams = {
  promotionType: ActTypeEnum
  activityId: string
  // planId: string
  // groupId: string
  // bizLine: BizLineEnum
}

export const toActConfimGoods: ToPageHandler<ActConfimGoodsParams> = (
  params,
  target
) => {
  openInUocEntry(appendParamsToUrl(UrlEnum.ActConfirmGoods, params), target)
}