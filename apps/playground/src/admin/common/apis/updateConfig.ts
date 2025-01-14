import { adminPostReq, RequestHandler } from '@/common'

import { CreateConfigParams } from './createConfig'
export type UpdateConfigParams = CreateConfigParams & {
  updator: string
  changedKeys: string[]
  id: number
}

export const updateConfig: RequestHandler<UpdateConfigParams, {}> = (
  params
) => {
  return adminPostReq('/zspt-admin-api/update-act-config', {
    ...params,
    config: JSON.stringify(params.config),
    crudConfig: JSON.stringify(params.crudConfig),
  })
}
