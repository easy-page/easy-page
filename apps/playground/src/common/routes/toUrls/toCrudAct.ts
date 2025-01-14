import { UrlEnum } from '../urls'
import { ToPageHandler } from '../interface'
import { appendParamsToUrl } from '../utils/appendParamsToUrl'
import { BizLineEnum, OperationType } from '@/common/constants'
import { ActTypeEnum } from '@/common/constants/actTemplateIds'
import { openInUocEntry } from '@/common/libs'

export enum CurdActParamsEnum {
  ActType = 'actType',
  OperationType = 'operationType',
  BizLine = 'bizLine',
  ActId = 'actId',
  PlanId = 'planId',
  GroupId = 'groupId',
}

export type CrudActParams = {
  actType: ActTypeEnum
  operationType: OperationType
  bizLine: string
  /** 编辑时需要 */
  actId?: string
  /** 编辑时需要 */
  planId?: string
  /** 编辑时需要 */
  groupId?: string
}

export const toCrudAct: ToPageHandler<CrudActParams> = (params, target) => {
  // window.open(appendParamsToUrl(UrlEnum.CrudAct, params))
  openInUocEntry(appendParamsToUrl(UrlEnum.CrudAct, params), target)
}
