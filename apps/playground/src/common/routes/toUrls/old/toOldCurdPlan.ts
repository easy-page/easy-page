import { BizLineEnum, OperationType, PlanTypeEnum } from '@/common/constants'
import { openInUocEntry } from '@/common/libs'
import { ToPageHandler } from '../../interface'
import { appendParamsToUrl } from '../../utils'
import { UrlEnum } from '../../urls'

export enum CrudPlanParamsEnum {
  BizLine = 'bizLine',
  PlanId = 'planId',
  OperationType = 'operationType',
  PlanType = 'planType',
}

export type CrudPlanParams = {
  [CrudPlanParamsEnum.BizLine]: BizLineEnum
  [CrudPlanParamsEnum.OperationType]: OperationType
  [CrudPlanParamsEnum.PlanId]?: string // 创建的时候没有 planId，修改的时候有
  [CrudPlanParamsEnum.PlanType]?: PlanTypeEnum
}

export const toOldCrudPlan: ToPageHandler<CrudPlanParams> = (
  params,
  target
) => {
  openInUocEntry(
    appendParamsToUrl(UrlEnum.OldCrudPlan, { ...params, in_uoc_sys: true }),
    target
  )
}
