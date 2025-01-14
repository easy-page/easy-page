import {
  AdminOpType,
  adminPostReq,
  ConfigEnv,
  RequestHandler,
  RequestResult,
  toJson,
} from '@/common'
import { ConfigInfo } from '@/common/apis/getConfigList'

export type ConfigLogInfo<After, Before> = {
  id: number
  RecordId: number
  before: Before
  after: After
  opType: AdminOpType
  operator: string
  createdAt: number
}

export type AfterConfig<Config = Partial<ConfigInfo>, WhiteList = string[]> = {
  config: Config
  whiteList?: WhiteList
  env?: ConfigEnv
}

export type BeforeConfig<Config = Partial<ConfigInfo>, WhiteList = string[]> = {
  config: Config
  env?: ConfigEnv
  whiteList: WhiteList
}
export type GetLogListParams = {
  pageNo: number
  pageSize: number
  operator?: string
  opType?: AdminOpType
  recordIds?: number[]
}

export type ConfigLogInfoType = ConfigLogInfo<BeforeConfig, AfterConfig>

export type GetLogListRes<
  Before = BeforeConfig<Partial<ConfigInfo>, string[]>,
  After = AfterConfig<Partial<ConfigInfo>, string[]>
> = {
  logs: ConfigLogInfo<Before, After>[]
  total: number
}

export const getLogList: RequestHandler<
  GetLogListParams,
  GetLogListRes
> = async (params) => {
  const result: RequestResult<GetLogListRes<string, string>> =
    await adminPostReq('/zspt-admin-api/get-logs', params)
  if (!result || !result.success) {
    return result as any as RequestResult<GetLogListRes>
  }

  return {
    ...result,
    data: {
      total: result.data?.total || 0,
      logs: (result.data?.logs || []).map((e) => {
        const before = toJson(e.before, {
          defaultValue: {},
        }) as BeforeConfig<string, string>
        const after = toJson(e.after, {
          defaultValue: {},
        }) as AfterConfig<string, string>

        return {
          ...e,
          before: {
            ...before,
            config: toJson(before.config, { defaultValue: {} }),
            whiteList: before.whiteList
              ? (before.whiteList || '').split(',').filter((x) => Boolean(x))
              : undefined,
          },
          after: {
            ...after,
            config: after.config,
            whiteList: after.whiteList
              ? (after.whiteList || '').split(',').filter((x) => Boolean(x))
              : undefined,
          },
        }
      }),
    } as GetLogListRes,
  }
}
