import { ConfigListInfo, getConfigList } from '../apis/getConfigList'
import { ConfigPublishStatus } from '../constants'
import { toNumber } from '../libs'
import { ListModel } from './base/list'

const DEFAULT_PLAN_LIST_FILTERS = {
  name: '',
  id: '',
  publishStauts: ConfigPublishStatus.Published,
}

type ConfigListFilterType = {
  name?: string
  id?: string
  publishStauts?: ConfigPublishStatus
}

const DEFAULT_PAGE_SIZE = 1000

export const configListModel = new ListModel<
  ConfigListInfo,
  ConfigListFilterType
>({
  defaultFilters: DEFAULT_PLAN_LIST_FILTERS,
  defaultPageSize: DEFAULT_PAGE_SIZE,
})

export const loadConfigList = () => {
  return configListModel.loadListWithPage(async (filters) => {
    const res = await getConfigList({
      ...filters,
      id: filters.id ? toNumber(filters.id) : undefined,
    })
    return {
      data: res.data?.configs || [],
      total: res.data?.total || 0,
      error: !res.success,
      msg: res.msg,
    }
  })
}
