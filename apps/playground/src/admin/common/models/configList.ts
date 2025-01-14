import { ListModel } from '@/common/models/base/list'
import { getConfigList } from '../apis/getConfigList'
import { ConfigPublishStatus, toNumber } from '@/common'
import { ConfigListInfo } from '@/common/apis/getConfigList'

export type ConfigListFilter = {
  name?: string // 活动名称, 支持模糊查询
  id?: string
  publishStatus?: ConfigPublishStatus
}

export const DEFAULT_CONFIG_LIST_FILTERS = {
  name: '',
  id: '',
}

export const configListModel = new ListModel<ConfigListInfo, ConfigListFilter>({
  defaultFilters: DEFAULT_CONFIG_LIST_FILTERS,
  defaultPageSize: 2000,
})

export const loadConfigListToModel = (options?: { resetPage?: boolean }) => {
  if (options?.resetPage) {
    const { pageSize } = configListModel.pageInfo
    configListModel.changePage({ pageNo: 1, pageSize })
    return
  }
  return configListModel.loadListWithPage(async (filters) => {
    const { name, id } = filters

    const res = await getConfigList({
      ...filters,
      name,
      id: id ? toNumber(id) : undefined,
    })
    console.log('resresres:', res)
    return {
      data: res.data?.configs || [],
      total: res.data?.total || 0,
      error: !res.success,
      msg: res.msg,
    }
  })
}
