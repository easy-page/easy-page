import { adminPostReq, RequestHandler } from '@/common'
import { ConfigInfo } from '@/common/apis/getConfigList'
import { ConfigEnv } from 'vite'

export type BatchUpdateConfigParams = {
  /** 选择的活动 ID */
  choosedActs: number[]
  config: Partial<ConfigInfo>
  whiteList?: string
  env?: ConfigEnv
}

export type BatchUpdateConfigRes = {}

export const batchUpdateConfig: RequestHandler<
  BatchUpdateConfigParams,
  BatchUpdateConfigRes
> = (params) => {
  return adminPostReq('/zspt-admin-api/batch-update-config', params)
}
