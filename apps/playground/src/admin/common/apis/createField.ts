import { adminPostReq, RequestHandler } from '@/common'

import { getConfigEnv } from '../utils/getConfigEnv'
export type CreateFieldParams = Omit<
  any,
  'id' | 'creator' | 'createdAt' | 'updatedAt'
>

export const createField: RequestHandler<CreateFieldParams, {}> = (params) => {
  return adminPostReq('/zspt-admin-api/fieldconfig', {
    ...params,
    env: getConfigEnv(),
  })
}
