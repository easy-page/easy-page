import {
  ConfigBizline,
  ConfigEnv,
  ConfigType,
  IsConfigTemplate,
} from '../../../common/constants'
import { adminPostReq, RequestHandler } from '../../../common/libs'

export type GetConfigItemParams = {}
export type ConfigItem = {
  id: number
  name: string
  icon: string
  desc: string
  bizLine: ConfigBizline
  isTemplate: IsConfigTemplate
  env: ConfigEnv
  type: ConfigType
}

export type GetConfigItemRes = {
  configs: ConfigItem[]
}

export const getConfigItems: RequestHandler<
  GetConfigItemParams,
  GetConfigItemRes
> = (params) => {
  return adminPostReq('/zspt-admin-api/get-all-configs', params)
}
