import {
  ActConrirmSubTabResources,
  ActSubTabResources,
  PlanAndActParamsEnum,
  PlanAndActTabResources,
  PlanSubTabResources,
} from '@/common/constants'
import { ToPageHandler } from '../interface'
import { UrlEnum } from '../urls'
import { appendParamsToUrl } from '../utils/appendParamsToUrl'
import { openInUocEntry } from '@/common/libs'

/** 存放页面路由参数类型定义 */
export type PlanAndActListParams = {
  [PlanAndActParamsEnum.ListTab]: PlanAndActTabResources
  [PlanAndActParamsEnum.PlanFilterType]?: PlanSubTabResources
  [PlanAndActParamsEnum.ActFilterType]?: ActSubTabResources
  /** 兼容历史活动，同：ActFilterType */
  [PlanAndActParamsEnum.FilterType]?: ActSubTabResources
  [PlanAndActParamsEnum.Bizline]: string
  [PlanAndActParamsEnum.ConfirmSubTab]?: ActConrirmSubTabResources
  [PlanAndActParamsEnum.ActivityId]?: string
}

export const toPlanAndActList: ToPageHandler<PlanAndActListParams> = (
  params,
  target
) => {
  openInUocEntry(appendParamsToUrl(UrlEnum.PlanAndAct, params), target)
}
