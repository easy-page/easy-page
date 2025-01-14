import {
  adminPostReq,
  ConfigBizline,
  RequestHandler,
  RequestResult,
  toJson,
} from '@/common'
import {
  ConfigInfo,
  ConfigListInfo,
  ConfigListRes,
  GetConfigListParams,
} from '@/common/apis/getConfigList'
import { CrudConfig } from '@/common/apis/getConfigList/curdConfig'
import { getZsptBizLine } from '../../utils/getZsptBizline'

export const getConfigList: RequestHandler<
  GetConfigListParams,
  ConfigListRes<ConfigInfo, CrudConfig, string[]>
> = async (params) => {
  const result: RequestResult<
    ConfigListRes<string, string, string, ConfigBizline>
  > = await adminPostReq('/zspt-admin-api/search-act', params)
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
            bizLine: getZsptBizLine(e.bizLine),
            crudConfig: toJson(e.crudConfig, {
              defaultValue: {},
            }) as CrudConfig,
            whiteList: (e.whiteList || '').split(',').filter((x) => Boolean(x)),
          } as ConfigListInfo<ConfigInfo, CrudConfig, string[]>)
      ),
    },
  }
}
