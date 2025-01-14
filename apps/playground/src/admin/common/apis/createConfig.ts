import {
  adminPostReq,
  ConfigBizline,
  ConfigEnv,
  ConfigPublishStatus,
  ConfigType,
  RequestHandler,
} from '@/common'

import { CrudConfig } from '@/common/apis/getConfigList/curdConfig'
import { ConfigInfo } from '@/common/apis/getConfigList'

export type CreateConfigParams = {
  name: string
  icon?: string
  desc: string
  bizLine: ConfigBizline
  type: ConfigType
  owner: string
  managers: string
  creator: string
  config: ConfigInfo // Config
  crudConfig: CrudConfig // ActConfig
  whiteList: string
  env: ConfigEnv
}

export const createConfig: RequestHandler<CreateConfigParams, {}> = (
  params
) => {
  return adminPostReq('/zspt-admin-api/create-act-config', {
    ...params,
    config: JSON.stringify(params.config),
    crudConfig: JSON.stringify(params.crudConfig),
    publishStatus: ConfigPublishStatus.ToPublish,
  })
}
