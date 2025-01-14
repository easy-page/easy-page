import { adminPostReq, RequestHandler } from '@/common'

export type DeleteConfigParams = {
  id: number
}

export const deleteConfig: RequestHandler<DeleteConfigParams, {}> = (
  params
) => {
  return adminPostReq('/zspt-admin-api/delete-act-config', params)
}
