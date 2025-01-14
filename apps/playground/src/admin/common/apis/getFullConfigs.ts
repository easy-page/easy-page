import {
  ConfigInfo,
  ConfigListInfo,
  ConfigListRes,
} from '@/common/apis/getConfigList'
import { CrudConfig } from '@/common/apis/getConfigList/curdConfig'
import {
  adminPostReq,
  RequestHandler,
  RequestResult,
  toJson,
} from '../../../common/libs'

export type GetConfigItemParams = {}

export type GetConfigItemRes = {
  configs: ConfigListInfo<ConfigInfo, CrudConfig, string[]>[]
}

export const getFullConfigs: RequestHandler<
  GetConfigItemParams,
  GetConfigItemRes
> = async (params) => {
  const result: RequestResult<ConfigListRes<string, string, string>> =
    await adminPostReq('/zspt-admin-api/get-all-full-configs', params)
  if (!result || !result.success) {
    return result as any as RequestResult<
      ConfigListRes<ConfigInfo, CrudConfig, string[]>
    >
  }
  return {
    ...result,
    data: {
      total: result.data?.total || 0,
      configs: (result.data?.configs || []).map(
        (e) =>
          ({
            ...e,
            config: toJson(e.config, {
              defaultValue: {},
            }) as ConfigInfo,
            crudConfig: toJson(e.crudConfig, {
              defaultValue: {},
            }) as CrudConfig,
            whiteList: (e.whiteList || '').split(',').filter((x) => Boolean(x)),
          } as ConfigListInfo<ConfigInfo, CrudConfig, string[]>)
      ),
    },
  }
}
