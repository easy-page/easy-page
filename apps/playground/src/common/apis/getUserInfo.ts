

import { JudgeType, checkArrayInclusion } from '@/common/libs'
import { RequestHandler, postReq } from '@/common/libs'
import { ZsptRolesEnum } from '../constants'


export interface Role {
  id: number
  name: string
}
export interface UserInfo {
  roles?: Array<Role>
  mis: string
}



export const getUserInfo: RequestHandler<any, UserInfo> = async () => {
  const result = await postReq('/api/zspt/operation/common/getUserInfo', {})
  return result
}

/**
 *
 * @param roles
 * @param userInfo
 * @param type OR 表示只要有其中某个角色即为 true，AND 表示需要都有
 * @returns
 */
export const hasRole = (roles: ZsptRolesEnum[], userInfo: UserInfo, type: JudgeType = 'OR') => {
  const userRoleIds = (userInfo.roles || []).map(e => e.id)
  return checkArrayInclusion(userRoleIds, roles, type)
}
