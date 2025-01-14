import { describe, expect, beforeEach, test, vi } from 'vitest'
import { RoleManager } from './manager'
import { UserInfo } from '../apis'
import { BizLineEnum, EnvEnum, ZsptRoleIds, ZsptRolesEnum } from '../constants'

// 模拟的用户信息
const prodUserInfo: UserInfo = {
  roles: [
    {
      id: 10077692,
      name: 'WaimaiDo',
    },
    {
      id: 10023340,
      name: 'Admin',
    },
  ], // 假设用户有两个角色，id 分别为 1 和 2
  mis: 'pikun',
}

const devUserInfo: UserInfo = {
  roles: [
    {
      id: 10052530,
      name: 'WaimaiDo',
    },
    {
      id: 10006239,
      name: 'Admin',
    },
  ], // 假设用户有两个角色，id 分别为 1 和 2
  mis: 'pikun',
}

// 模拟的资源映射
const resourceMap: Record<ZsptRolesEnum, string[]> = {
  [ZsptRolesEnum.Admin]: ['resource1', 'resource2'],
  [ZsptRolesEnum.WaiMaiDo]: ['resource2', 'resource3'],
} as Record<ZsptRolesEnum, string[]>

describe('RoleManager', () => {
  let manager: RoleManager

  beforeEach(() => {
    manager = new RoleManager()
  })

  describe('getRoleIds', () => {
    test('should return role ids from user info', () => {
      const roleIds = manager.getRoleIds(devUserInfo)
      expect(roleIds).toEqual([
        ZsptRoleIds.WaimaiDo.test,
        ZsptRoleIds.Admin.test,
      ])
    })

    test('should return empty array if no user info provided', () => {
      const roleIds = manager.getRoleIds()
      expect(roleIds).toEqual([])
    })
  })

  describe('getRoleIdOfCurEnv', () => {
    test('should return role id for online environment', () => {
      // 使用原型链来间接访问和修改私有方法
      const spy = vi
        .spyOn<any, any>(RoleManager.prototype, 'getEnv')
        .mockReturnValue(EnvEnum.Online)

      const roleId = manager.getRoleIdOfCurEnv(ZsptRolesEnum.Admin)

      expect(roleId).toBe(ZsptRoleIds.Admin.prod)
      expect(spy).toHaveBeenCalled()
      spy.mockRestore()
    })

    test('should return role id for test environment', () => {
      const spy = vi
        .spyOn<any, any>(RoleManager.prototype, 'getEnv')
        .mockReturnValue(EnvEnum.Test)

      const roleId = manager.getRoleIdOfCurEnv(ZsptRolesEnum.Admin)

      expect(roleId).toBe(ZsptRoleIds.Admin.test)
      expect(spy).toHaveBeenCalled()
      spy.mockRestore()
    })
  })

  describe('getRoles', () => {
    test('should return roles based on user info and test environment', () => {
      const spy = vi
        .spyOn<any, any>(RoleManager.prototype, 'getEnv')
        .mockReturnValue(EnvEnum.Test)
      const roles = manager.getRoles({ userInfo: devUserInfo })
      expect(roles).toEqual([ZsptRolesEnum.WaiMaiDo, ZsptRolesEnum.Admin])
      expect(spy).toHaveBeenCalled()
      spy.mockRestore()
    })
    test('should return roles based on user info and prod environment', () => {
      const spy = vi
        .spyOn<any, any>(RoleManager.prototype, 'getEnv')
        .mockReturnValue(EnvEnum.Online)
      const roles = manager.getRoles({ userInfo: prodUserInfo })
      expect(roles).toEqual([ZsptRolesEnum.WaiMaiDo, ZsptRolesEnum.Admin])
      expect(spy).toHaveBeenCalled()
      spy.mockRestore()
    })

    test('should return roles based on user info and test environment with bizline', () => {
      const spy = vi
        .spyOn<any, any>(RoleManager.prototype, 'getEnv')
        .mockReturnValue(EnvEnum.Test)
      const roles = manager.getRoles({
        userInfo: devUserInfo,
        bizLine: BizLineEnum.ShanGou,
      })
      expect(roles).toEqual([ZsptRolesEnum.Admin])
      expect(spy).toHaveBeenCalled()
      spy.mockRestore()
    })
    test('should return roles based on user info and prod environment with bizline', () => {
      const spy = vi
        .spyOn<any, any>(RoleManager.prototype, 'getEnv')
        .mockReturnValue(EnvEnum.Online)
      const roles = manager.getRoles({
        userInfo: prodUserInfo,
        bizLine: BizLineEnum.WaiMai,
      })
      expect(roles).toEqual([ZsptRolesEnum.WaiMaiDo])
      expect(spy).toHaveBeenCalled()
      spy.mockRestore()
    })
  })

  describe('getResources', () => {
    test('should return resources for user roles', () => {
      const spy = vi
        .spyOn<any, any>(RoleManager.prototype, 'getEnv')
        .mockReturnValue(EnvEnum.Online)
      const resources = manager.getResources(resourceMap, {
        userInfo: {
          roles: [
            {
              id: 10023340,
              name: 'Admin',
            },
          ],
          mis: 'piun',
        },
      })

      expect(resources).toEqual(['resource1', 'resource2'])
      expect(spy).toHaveBeenCalled()
      spy.mockRestore()
    })

    test('should return empty array if no user roles provided', () => {
      const resources = manager.getResources(resourceMap)
      expect(resources).toEqual([])
    })

    test('should return empty array if user roles have no corresponding resources', () => {
      const resources = manager.getResources(resourceMap, { roles: [] } as any)

      expect(resources).toEqual([])
    })

    test('should return unique resources if user has multiple roles', () => {
      const spy = vi
        .spyOn<any, any>(RoleManager.prototype, 'getEnv')
        .mockReturnValue(EnvEnum.Online)
      const resources = manager.getResources(resourceMap, {
        userInfo: prodUserInfo,
      })

      expect(resources).toEqual(['resource2', 'resource3', 'resource1'])
      expect(spy).toHaveBeenCalled()
      spy.mockRestore()
    })
  })
})
