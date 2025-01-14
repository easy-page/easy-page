import { BizLineEnum, PlanTypeEnum } from '@/common/constants'
import { ToPageHandler } from '../../interface'
import { appendParamsToUrl } from '../../utils'
import { openInUocEntry } from '@/common/libs'
import { UrlEnum } from '../../urls'

export type PlanApplyResultParams = {
  planType: PlanTypeEnum
  planId: number
  bizLine: BizLineEnum
}

export const toOldPlanApplyResult: ToPageHandler<PlanApplyResultParams> = (
  params,
  target
) => {
  openInUocEntry(
    appendParamsToUrl(UrlEnum.OldPlanApplyResult, {
      ...params,
      in_uoc_sys: true,
    }),
    target
  )
}
