// tests/auth.test.ts

import { PlanInfo, getAuthInfo } from '@/common/apis'
import * as apis from '@/common/apis'
import {
  OperationEnum,
  AuthFromBackendResEnum,
  AuthUrl,
} from '@/common/constants'
import { describe, it, expect, vi } from 'vitest'
import { OperaitonContext } from '../planAndActAuths'
import {
  authOperationFromBackend,
  AuthSence,
} from '../authOperationFromBackend'

vi.mock('@mtfe/uoc-city-selecter/CitySelecterInput', () => ({}))
vi.mock('@/common/components/base/TableNew', () => ({}))

describe('authOperationFromBackend', () => {
  const mockAuthInfo = {
    success: true,
    data: {
      planAuth: { edit: true },
      tempAuth: { authResult: true, toast: 'Temp auth failed' },
      opAuth: {
        authResult: {
          modify: 'user1,user2',
        },
        toast: 'Op auth failed',
      },
    },
  }

  const baseParams: OperaitonContext<PlanInfo> = {
    record: { creator: 'user1', planCreator: 'user2' } as any,
    planId: 123,
    userInfo: { mis: 'user1' },
    authUrl: AuthUrl.PlanAuth,
    activityId: 456,
    operation: OperationEnum.Modify,
    mccConfig: {},
  } as any as OperaitonContext<PlanInfo>

  it('should return allow: false if authInfo success is false', async () => {
    const spy = vi.spyOn(apis, 'getAuthInfo')
    spy.mockResolvedValueOnce({ success: false })

    const authHandler = authOperationFromBackend(
      [AuthFromBackendResEnum.PlanAuth],
      {
        sence: AuthSence.PlanList,
      }
    )
    const result = await authHandler(baseParams)

    expect(result).toEqual({
      allow: false,
      msg: '获取权限数据失败，请稍后重试',
      continueNextResult: 'allow',
    })
  })

  it('should return allow: false if planAuth edit is false', async () => {
    const spy = vi.spyOn(apis, 'getAuthInfo')
    spy.mockResolvedValueOnce({
      success: true,
      data: { ...mockAuthInfo.data, planAuth: { edit: false } },
    } as any)

    const authHandler = authOperationFromBackend(
      [AuthFromBackendResEnum.PlanAuth],
      {
        sence: AuthSence.PlanList,
      }
    )
    const result = await authHandler(baseParams)

    expect(result).toEqual({
      allow: false,
      msg: '无方案编辑权限',
      continueNextResult: 'allow',
    })
  })

  it('should return allow: false if tempAuth authResult is false', async () => {
    const spy = vi.spyOn(apis, 'getAuthInfo')
    spy.mockResolvedValueOnce({
      success: true,
      data: {
        ...mockAuthInfo.data,
        tempAuth: { authResult: false, toast: 'No temp auth' },
      },
    } as any)

    const authHandler = authOperationFromBackend(
      [AuthFromBackendResEnum.TempAuth],
      {
        sence: AuthSence.PlanList,
      }
    )
    const result = await authHandler(baseParams)

    expect(result).toEqual({
      allow: false,
      msg: 'No temp auth',
      continueNextResult: 'allow',
    })
  })

  it('should return allow: true if user is creator', async () => {
    const spy = vi.spyOn(apis, 'getAuthInfo')
    spy.mockResolvedValueOnce(mockAuthInfo as any)

    const authHandler = authOperationFromBackend(
      [AuthFromBackendResEnum.Creator],
      {
        sence: AuthSence.PlanList,
      }
    )
    const result = await authHandler(baseParams)

    expect(result).toEqual({
      allow: true,
      continueNextResult: 'deny',
    })
  })

  it('should return allow: true if user is plan creator', async () => {
    const spy = vi.spyOn(apis, 'getAuthInfo')
    spy.mockResolvedValueOnce(mockAuthInfo as any)

    const authHandler = authOperationFromBackend(
      [AuthFromBackendResEnum.PlanCreator],
      {
        sence: AuthSence.PlanList,
      }
    )
    const result = await authHandler({
      ...baseParams,
      userInfo: { mis: 'user2' },
    })

    expect(result).toEqual({
      allow: true,
      continueNextResult: 'deny',
    })
  })

  it('should return allow: true if user is in opAuth whitelist', async () => {
    const spy = vi.spyOn(apis, 'getAuthInfo')
    spy.mockResolvedValueOnce(mockAuthInfo as any)

    const authHandler = authOperationFromBackend(
      [AuthFromBackendResEnum.OpWhiteList],
      {
        sence: AuthSence.PlanList,
      }
    )
    const result = await authHandler(baseParams)

    expect(result).toEqual({
      allow: true,
      continueNextResult: 'deny',
    })
  })

  it('should return allow: true if user is in opAuth whitelist and operation is inviteSettings', async () => {
    const mockAuthInfo = {
      success: true,
      data: {
        planAuth: { edit: true },
        tempAuth: { authResult: true, toast: 'Temp auth failed' },
        opAuth: {
          authResult: {
            modify: 'user1,user2',
          },
          toast: 'Op auth failed',
        },
      },
    }

    const spy = vi.spyOn(apis, 'getAuthInfo')
    spy.mockResolvedValueOnce(mockAuthInfo as any)

    const authHandler = authOperationFromBackend(
      [AuthFromBackendResEnum.OpWhiteList],
      {
        sence: AuthSence.PlanList,
      }
    )
    const result = await authHandler({
      ...baseParams,
      authOperationKey: OperationEnum.Modify,
      operation: OperationEnum.InviteSettings,
    })

    expect(result).toEqual({
      allow: true,
      continueNextResult: 'deny',
    })
  })

  it('should return allow: false if user is not in opAuth whitelist', async () => {
    const spy = vi.spyOn(apis, 'getAuthInfo')
    spy.mockResolvedValueOnce(mockAuthInfo as any)

    const authHandler = authOperationFromBackend(
      [AuthFromBackendResEnum.OpWhiteList],
      {
        sence: AuthSence.ActList,
      }
    )
    const result = await authHandler({
      ...baseParams,
      authUrl: AuthUrl.ActCheckAuth,
      userInfo: { mis: 'user3' },
    })

    expect(result).toEqual({
      allow: false,
      msg: 'Op auth failed',
      continueNextResult: 'deny',
    })
  })

  it('should return allow: true if no specific auth checks are required', async () => {
    const spy = vi.spyOn(apis, 'getAuthInfo')
    spy.mockResolvedValueOnce(mockAuthInfo as any)

    const authHandler = authOperationFromBackend([], {
      sence: AuthSence.PlanList,
    })
    const result = await authHandler(baseParams)

    expect(result).toEqual({
      allow: true,
      continueNextResult: 'allow',
    })
  })
})
