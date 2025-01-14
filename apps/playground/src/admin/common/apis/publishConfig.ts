import { adminPostReq, RequestHandler } from '@/common'

export type PublishConfigParams = {
  updator: string
  id: number
}
export const publishConfig: RequestHandler<PublishConfigParams, {}> = (
  params
) => {
  return adminPostReq('/zspt-admin-api//publish-config', params)
}
