import { RequestHandler, adminGetReq } from '@/common/libs'

export const getAdminapiUserInfo: RequestHandler<any, any> = async () => {
  const result = await adminGetReq('/zspt-admin-api/get-user-mis', {})
  return result
}
