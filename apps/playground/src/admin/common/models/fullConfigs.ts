import { ListModel } from '@/common/models/base/list'
import { Empty } from '@easy-page/antd-ui'
import { getFullConfigs } from '../apis/getFullConfigs'
import { ConfigListInfo } from '@/common/apis/getConfigList'

export const fullConfigsModel = new ListModel<ConfigListInfo, Empty>({
  defaultFilters: {},
  disablePage: true,
})

export const loadFullConfigs = () => {
  return fullConfigsModel.loadList(async () => {
    const res = await getFullConfigs({})
    return {
      data: res.data?.configs || [],
      error: !res.success,
      msg: res.msg,
    }
  })
}
