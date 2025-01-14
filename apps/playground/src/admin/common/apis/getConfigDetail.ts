import { adminPostReq, RequestHandler, RequestResult, toJson } from '@/common'
import { ConfigListInfo, ConfigInfo } from '@/common/apis/getConfigList'
import { CrudConfig } from '@/common/apis/getConfigList/curdConfig'

export const getConfigDetail: RequestHandler<
  { id: number },
  ConfigListInfo
> = async (params) => {
  const res: RequestResult<ConfigListInfo<string, string>> = await adminPostReq(
    `/zspt-admin-api/get-act-conf-by-id`,
    params
  )

  return {
    ...res,
    data: {
      ...(res.data || {}),
      config: toJson(res.data?.config, {
        defaultValue: {},
      }) as ConfigInfo,
      crudConfig: toJson(res.data?.crudConfig, {
        defaultValue: {},
      }) as CrudConfig,
    } as ConfigListInfo,
  }
}
