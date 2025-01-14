import { featchPostJson } from './request.mts'
import { ConfigListInfo } from '../../../../common/apis/getConfigList/index.ts'

export const getAllActConfig = async (): Promise<{
  configs: ConfigListInfo[]
}> => {
  try {
    const res = await featchPostJson<{ configs: ConfigListInfo[] }>(
      'https://uoc.tsp.test.sankuai.com/zspt-admin-api/cli/search-act',
      {
        name: '',
        pageSize: 20,
        pageNo: 1,
      }
    )

    return res
  } catch (err) {
    console.log(err)
    return {
      configs: [],
    }
  }
}
