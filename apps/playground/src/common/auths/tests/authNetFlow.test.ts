import { describe, expect, test, vi } from 'vitest'
import { PlanInfo } from '@/common/apis'
import {
  MccKeysEnum,
  FlowResourceStateEnum,
  AuthUrl,
  OperationEnum,
} from '../../../common/constants'
import { NetFlowGrayListAll, OperaitonContext } from '../planAndActAuths'
import { authNetFlow } from '../authNetFlow'

vi.mock('@mtfe/uoc-city-selecter/CitySelecterInput', () => ({}))
vi.mock('@/common/components/base/TableNew', () => ({}))
// vi.mock('@roo/roo/core', () => ({

// }));
// vi.mock('@roo/roo/Tabs', async () => {
//   return {
//     default: {}
//   }
// });
// vi.mock('@roo/roo/AutoComplete', () => ({

// }));
// vi.mock('@roo/roo/Tooltip', () => ({

// }));
// vi.mock('@roo/roo/Toast', () => ({

// }));

describe('authNetFlow', () => {
  test('should allow if netFlowGraylist is NetFlowGrayListAll', async () => {
    const mockContext: OperaitonContext<PlanInfo> = {
      configs: {} as any,
      mccConfig: {
        [MccKeysEnum.NetFlowGrayList]: NetFlowGrayListAll,
      },
      record: {} as PlanInfo,
      operation: OperationEnum.Modify,
      userInfo: { mis: 'user1' },
      authUrl: AuthUrl.PlanAuth,
    }

    const result = await authNetFlow(mockContext)

    expect(result.allow).toBe(true)
    expect(result.continueNextResult).toBe('allow')
  })

  test('should allow if user is in netFlowGraylist', async () => {
    const mockContext: OperaitonContext<PlanInfo> = {
      mccConfig: {
        [MccKeysEnum.NetFlowGrayList]: 'user1,user2,user3',
      },
      configs: {} as any,
      record: {} as PlanInfo,
      operation: OperationEnum.Modify,
      userInfo: { mis: 'user1' },
      authUrl: AuthUrl.PlanAuth,
    }

    const result = await authNetFlow(mockContext)

    expect(result.allow).toBe(true)
    expect(result.continueNextResult).toBe('allow')
  })

  test('should not allow if netFlowActivityWithdrawStatus is not Nonentity', async () => {
    const mockContext: OperaitonContext<PlanInfo> = {
      mccConfig: {
        [MccKeysEnum.NetFlowGrayList]: 'user1,user2,user3',
      },
      configs: {} as any,
      record: {
        netFlowActivityWithdrawStatus: FlowResourceStateEnum.Irrevocably,
      } as PlanInfo,
      operation: OperationEnum.Modify,
      userInfo: { mis: 'user4' },
      authUrl: AuthUrl.PlanAuth,
    }

    const result = await authNetFlow(mockContext)

    expect(result.allow).toBe(false)
    expect(result.msg).toBe('无权限操作')
    expect(result.continueNextResult).toBe('allow')
  })

  test('should not allow if user is not in netFlowGraylist and netFlowActivityWithdrawStatus is Nonentity', async () => {
    const mockContext: OperaitonContext<PlanInfo> = {
      mccConfig: {
        [MccKeysEnum.NetFlowGrayList]: 'user1,user2,user3',
      },
      configs: {} as any,
      record: {
        netFlowActivityWithdrawStatus: FlowResourceStateEnum.Nonentity,
      } as PlanInfo,
      operation: OperationEnum.Modify,
      userInfo: { mis: 'user4' },
      authUrl: AuthUrl.PlanAuth,
    }

    const result = await authNetFlow(mockContext)

    expect(result.allow).toBe(true)
    expect(result.continueNextResult).toBe('allow')
  })
})
