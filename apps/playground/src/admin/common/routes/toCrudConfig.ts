import { appendParamsToUrl, ConfigType, OperationType } from '@/common'
import { ToPageHandler } from '@/common/routes/interface'
import { UrlEnum } from './routes'

export enum CrudConfigParamsEnum {
  Id = 'id',
  OperationType = 'operationType',
  Type = 'type',
}

export type CrudConfigParams = {
  id?: string
  operationType: OperationType
  type?: ConfigType
}

export const toCrudConfig: ToPageHandler<CrudConfigParams> = (
  params,
  target
) => {
  window.open(appendParamsToUrl(UrlEnum.CrudConfig, params), target)
}
