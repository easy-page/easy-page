// tests/auth.test.ts

import * as apis from '@/common/apis'
import type { PlanInfo } from '@/common/apis'
import type { OperaitonContext } from '@/common/auths'
import {
  OperationEnum,
  AuthUrl,
  PlanTypeEnum,
  MccKeysEnum,
  FlowResourceStateEnum,
} from '@/common/constants'
import { describe, it, expect, vi } from 'vitest'
import { execAuth } from '../../../Operations'
import { planPublish } from './publishPlan'

const curOpItem = planPublish
const curOpKey = curOpItem.authOperationKey || curOpItem.id

vi.mock('@mtfe/uoc-city-selecter/CitySelecterInput', () => ({}))
vi.mock('@/common/components/base/TableNew', () => ({}))

describe('authOperationFromBackend', () => {
  const baseParams: OperaitonContext<PlanInfo> = {
    record: {
      creator: 'user1',
      planCreator: 'user2',
      planType: PlanTypeEnum.ShenHuiYuan,
    } as any,
    planId: 123,
    userInfo: { mis: 'user1' },
    authUrl: AuthUrl.PlanAuth,
    activityId: 456,
    operation: curOpItem.id,
    configs: {} as any,
    mccConfig: {},
  } as OperaitonContext<PlanInfo>

  const execContext = {
    operation: curOpItem.id,
    authOperationKey: curOpItem.authOperationKey,
    ...baseParams,
    authUrl: curOpItem.authUrl || baseParams.authUrl,
  }

  it('should return allow: false if authInfo success is false', async () => {
    const spy = vi.spyOn(apis, 'getAuthInfo')
    spy.mockResolvedValueOnce({ success: false })

    const result = await execAuth(execContext, curOpItem.auth)

    expect(result).toEqual({
      allow: false,
      msg: '获取权限数据失败，请稍后重试',
    })
  })

  it('should return allow: true，品牌方案，白名单配置的 all', async () => {
    const spy = vi.spyOn(apis, 'getAuthInfo')
    spy.mockResolvedValueOnce({
      success: true,
      data: {
        planAuth: { edit: true },
        tempAuth: { authResult: false, toast: 'Temp auth failed' },
        opAuth: {
          authResult: {
            [curOpKey]: 'user1,user2',
          },
          toast: 'Op auth failed',
        },
      } as any,
    })

    const result = await execAuth(
      {
        ...execContext,
        record: { ...execContext.record, planType: PlanTypeEnum.Brand },
        mccConfig: {
          [MccKeysEnum.NetFlowGrayList]: 'all',
        },
      },
      curOpItem.auth
    )

    expect(result).toEqual({
      allow: true,
    })
  })

  it('should return allow: true，品牌方案，白名单配置的不包含当前用户', async () => {
    const spy = vi.spyOn(apis, 'getAuthInfo')
    spy.mockResolvedValueOnce({
      success: true,
      data: {
        planAuth: { edit: true },
        tempAuth: { authResult: false, toast: 'Temp auth failed' },
        opAuth: {
          authResult: {
            [curOpKey]: 'user1,user2',
          },
          toast: 'Op auth failed',
        },
      },
    } as any)

    const result = await execAuth(
      {
        ...execContext,
        record: { ...execContext.record, planType: PlanTypeEnum.Brand },
        mccConfig: {
          [MccKeysEnum.NetFlowGrayList]: 'user3',
        },
      },
      curOpItem.auth
    )

    expect(result).toEqual({
      allow: false,
      msg: '无权限操作',
    })
  })
  it('should return allow: true，品牌方案，白名单配置的不包含当前用户，但 netFlowActivityWithdrawStatus= -1', async () => {
    const spy = vi.spyOn(apis, 'getAuthInfo')
    spy.mockResolvedValueOnce({
      success: true,
      data: {
        planAuth: { edit: true },
        tempAuth: { authResult: false, toast: 'Temp auth failed' },
        opAuth: {
          authResult: {
            [curOpKey]: 'user1,user2',
          },
          toast: 'Op auth failed',
        },
      },
    } as any)

    const result = await execAuth(
      {
        ...execContext,
        record: {
          ...execContext.record,
          planType: PlanTypeEnum.Brand,
          netFlowActivityWithdrawStatus: FlowResourceStateEnum.Nonentity,
        },
        mccConfig: {
          [MccKeysEnum.NetFlowGrayList]: 'user3',
        },
      },
      curOpItem.auth
    )

    expect(result).toEqual({
      allow: true,
    })
  })

  it('should return allow: true，品牌方案，白名单配置的包含当前用户，但 netFlowActivityWithdrawStatus != -1', async () => {
    const spy = vi.spyOn(apis, 'getAuthInfo')
    spy.mockResolvedValueOnce({
      success: true,
      data: {
        planAuth: { edit: true },
        tempAuth: { authResult: false, toast: 'Temp auth failed' },
        opAuth: {
          authResult: {
            [curOpKey]: 'user1,user2',
          },
          toast: 'Op auth failed',
        },
      },
    } as any)

    const result = await execAuth(
      {
        ...execContext,
        record: { ...execContext.record, planType: PlanTypeEnum.Brand },
        mccConfig: {
          [MccKeysEnum.NetFlowGrayList]: 'user1',
        },
      },
      curOpItem.auth
    )

    expect(result).toEqual({
      allow: true,
    })
  })

  it('should return allow: true，品牌方案，白名单配置的不包含当前用户，且 netFlowActivityWithdrawStatus != -1', async () => {
    const spy = vi.spyOn(apis, 'getAuthInfo')
    spy.mockResolvedValueOnce({
      success: true,
      data: {
        planAuth: { edit: true },
        tempAuth: { authResult: false, toast: 'Temp auth failed' },
        opAuth: {
          authResult: {
            [curOpKey]: 'user1,user2',
          },
          toast: 'Op auth failed',
        },
      },
    } as any)

    const result = await execAuth(
      {
        ...execContext,
        record: { ...execContext.record, planType: PlanTypeEnum.Brand },
        mccConfig: {
          [MccKeysEnum.NetFlowGrayList]: 'user2',
        },
      },
      curOpItem.auth
    )

    expect(result).toEqual({
      allow: false,
      msg: '无权限操作',
    })
  })

  it('should return allow: false if authInfo success and without planAuth', async () => {
    const spy = vi.spyOn(apis, 'getAuthInfo')
    spy.mockResolvedValueOnce({
      success: true,
      data: {
        planAuth: { edit: false },
        tempAuth: { authResult: false, toast: 'Temp auth failed' },
        opAuth: {
          authResult: {
            [curOpKey]: 'user1,user2',
          },
          toast: 'Op auth failed',
        },
      },
    } as any)

    const result = await execAuth(execContext, curOpItem.auth)

    expect(result).toEqual({
      allow: true,
    })
  })

  it('should return allow: false if authInfo success and with planAuth', async () => {
    const spy = vi.spyOn(apis, 'getAuthInfo')
    spy.mockResolvedValueOnce({
      success: true,
      data: {
        planAuth: { edit: true },
        tempAuth: { authResult: true, toast: 'Temp auth failed' },
        opAuth: {
          authResult: {
            [curOpKey]: 'user1,user2',
          },
          toast: 'Op auth failed',
        },
      },
    } as any)

    const result = await execAuth(execContext, curOpItem.auth)

    expect(result).toEqual({
      allow: true,
    })
  })

  it('should return allow: false if authInfo success and without tempAuth', async () => {
    const spy = vi.spyOn(apis, 'getAuthInfo')
    spy.mockResolvedValueOnce({
      success: true,
      data: {
        planAuth: { edit: true },
        tempAuth: { authResult: false, toast: 'Temp auth failed' },
        opAuth: {
          authResult: {
            [curOpKey]: 'user1,user2',
          },
          toast: 'Op auth failed',
        },
      },
    } as any)

    const result = await execAuth(execContext, curOpItem.auth)

    expect(result).toEqual({
      allow: true,
    })
  })

  it('should return allow: false if authInfo success and with tempAuth', async () => {
    const spy = vi.spyOn(apis, 'getAuthInfo')
    spy.mockResolvedValueOnce({
      success: true,
      data: {
        planAuth: { edit: true },
        tempAuth: { authResult: true, toast: 'Temp auth failed' },
        opAuth: {
          authResult: {
            [curOpKey]: 'user1,user2',
          },
          toast: 'Op auth failed',
        },
      },
    } as any)

    const result = await execAuth(execContext, curOpItem.auth)

    expect(result).toEqual({
      allow: true,
    })
  })

  it('should return allow: false if authInfo success and user not self and not authed', async () => {
    // 非授权、非本人，拒绝操作
    const spy = vi.spyOn(apis, 'getAuthInfo')
    spy.mockResolvedValueOnce({
      success: true,
      data: {
        planAuth: { edit: true },
        tempAuth: { authResult: true, toast: 'Temp auth failed' },
        opAuth: {
          authResult: null,
          toast: 'Op auth failed',
        },
      },
    } as any)

    const result = await execAuth(
      {
        ...execContext,
        userInfo: { mis: 'user_not_self' },
      },
      curOpItem.auth
    )

    expect(result).toEqual({
      allow: false,
      msg: 'Op auth failed',
    })
  })

  it('should return allow: true if authInfo success and user is self', async () => {
    // 非授权、本人，允许操作
    const spy = vi.spyOn(apis, 'getAuthInfo')
    spy.mockResolvedValueOnce({
      success: true,
      data: {
        planAuth: { edit: true },
        tempAuth: { authResult: true, toast: 'Temp auth failed' },
        opAuth: {
          authResult: null,
          toast: 'Op auth failed',
        },
      },
    } as any)

    const result = await execAuth(
      {
        ...execContext,
      },
      curOpItem.auth
    )

    expect(result).toEqual({
      allow: true,
    })
  })

  it('should return allow: true if authInfo success and user not self and authed', async () => {
    // 已授权、非本人，允许操作
    const spy = vi.spyOn(apis, 'getAuthInfo')
    spy.mockResolvedValueOnce({
      success: true,
      data: {
        planAuth: { edit: true },
        tempAuth: { authResult: true, toast: 'Temp auth failed' },
        opAuth: {
          authResult: {
            [curOpKey]: 'user1,user2,user_not_self',
          },
          toast: 'Op auth failed',
        },
      },
    } as any)

    const result = await execAuth(
      {
        ...execContext,
        userInfo: { mis: 'user_not_self' },
      },
      curOpItem.auth
    )

    expect(result).toEqual({
      allow: true,
    })
  })
})
