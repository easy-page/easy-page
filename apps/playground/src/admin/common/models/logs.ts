import { ListModel } from '@/common/models/base/list'
import {
  ConfigLogInfoType,
  getLogList,
  GetLogListParams,
} from '../apis/getLogList'

export type LogListFilter = Pick<
  GetLogListParams,
  'opType' | 'operator' | 'recordIds'
>

export const DEFAULT_LOG_LIST_FILTERS = {
  opType: undefined,
  operator: '',
  recordIds: [],
}

export const logListModel = new ListModel<ConfigLogInfoType, LogListFilter>({
  defaultFilters: DEFAULT_LOG_LIST_FILTERS,
  defaultPageSize: 20,
})

export const loadLogListToModel = (options?: { resetPage?: boolean }) => {
  if (options?.resetPage) {
    const { pageSize } = logListModel.pageInfo
    logListModel.changePage({ pageNo: 1, pageSize })
    return
  }
  return logListModel.loadListWithPage(async (filters) => {
    const res = await getLogList({
      ...filters,
    })
    return {
      data: res.data?.logs || [],
      total: res.data?.total || 0,
      error: !res.success,
      msg: res.msg,
    }
  })
}
