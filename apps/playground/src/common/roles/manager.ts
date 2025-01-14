import type { UserInfo } from '../apis'
import {
  BizLineEnum,
  EnvEnum,
  ZsptRoleAndBizlineMap,
  ZsptRoleIds,
  ZsptRolesEnum,
} from '../constants'
import { getEnv } from '../libs'
export class RoleManager {
  public getRoleIds(userInfo?: UserInfo) {
    return (userInfo?.roles || []).map((e) => e.id)
  }

  public getRoleIdOfCurEnv(role: ZsptRolesEnum) {
    return ZsptRoleIds[role][this.getEnv()]
  }

  private getEnv() {
    if ([EnvEnum.Online, EnvEnum.St].includes(getEnv())) {
      return EnvEnum.Online
    }
    /** 目前角色信息只判断 2 个环境 */
    return EnvEnum.Test
  }

  /** 是否是系统管理员 */
  public isAdmin(userInfo?: UserInfo) {
    const roles = this.getRoles({ userInfo })
    return roles.includes(ZsptRolesEnum.Admin)
  }

  public getRoles({
    userInfo,
    bizLine,
  }: {
    userInfo?: UserInfo
    bizLine?: BizLineEnum
  }): ZsptRolesEnum[] {
    const result: ZsptRolesEnum[] = []
    const env = this.getEnv()
    const userRoleIds = this.getRoleIds(userInfo)
    Object.keys(ZsptRoleIds).map((role) => {
      const isCurrentBizlineRole =
        bizLine !== undefined
          ? (ZsptRoleAndBizlineMap[role] || []).includes(Number(bizLine))
          : true
      if (
        isCurrentBizlineRole &&
        userRoleIds.includes(ZsptRoleIds[role as ZsptRolesEnum][env])
      ) {
        result.push(role as ZsptRolesEnum)
      }
    })
    return result
  }

  /** 后端完全维护角色 + 资源后，这里将废弃 */
  getResources<T>(
    resourceMap: Record<ZsptRolesEnum, T[]>,
    options?: {
      userInfo?: UserInfo
      /** 按照给定数组排序，是资源选项全集的顺序 */
      sortArray?: T[]
      bizLine?: BizLineEnum
    }
  ): T[] {
    const { userInfo, sortArray = [], bizLine } = options || {}
    const roles = this.getRoles({ userInfo, bizLine })

    const result: Set<T> = new Set()
    roles.forEach((each) => {
      const items = resourceMap[each] || []

      console.log('roles', roles, items)

      items.forEach((e) => {
        result.add(e)
      })
    })
    if (!sortArray || sortArray.length === 0) {
      return Array.from(result)
    }
    const resArray = sortArray
      .map((e) => {
        if (result.has(e)) {
          return e
        }
        return undefined
      })
      .filter((e) => Boolean(e))

    return resArray
  }
}

export const roleManager = new RoleManager()
