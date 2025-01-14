import { ActInfo, ActListFilter, getActList } from '../apis'
import {
  ALL,
  ActSubTabResources,
  ActivityConfirmStatusEnum,
  BizLineEnum,
} from '@/common/constants'
import { ListModel } from './base/list'
import { getActFilterType, getActivityId } from '../routes'
import { getQueryNumber } from '../libs'

const getDefaultConfirmStatus = () => {
  const confirmSatus = getQueryNumber('confirmStatus')
  if (Object.values(ActivityConfirmStatusEnum).includes(confirmSatus)) {
    return confirmSatus
  }
  return ALL as any
}

const getDefaultFilterType = () => {
  const filterType = getActFilterType() || getQueryNumber('filterType')
  return filterType || ActSubTabResources.Mine
}

export const DEFAULT_ACT_LIST_FILTERS = {
  ctime: [undefined, undefined],
  kaConfirmTime: [undefined, undefined],
  filterType: getDefaultFilterType(),
  activityStatus: ALL as any,
  templateId: ALL,
  activityId: getActivityId(),
  activityConfirmStatus: getDefaultConfirmStatus(),
}
export const actListModel = new ListModel<ActInfo, ActListFilter>({
  defaultFilters: DEFAULT_ACT_LIST_FILTERS,
  defaultPageSize: 20,
})

export const loadActListToModel = ({
  planId,
  bizLine,
  resetPage,
  refresh,
  filterType: newFilterType,
  groupId,
}: {
  planId?: number
  filterType?: ActSubTabResources
  bizLine: BizLineEnum
  /** 是否重置为第一页 */
  resetPage?: boolean
  refresh?: boolean
  groupId?: number
}) => {
  if (resetPage) {
    const { pageSize } = actListModel.pageInfo
    actListModel.changePage({ pageNo: 1, pageSize })
    return
  }
  return actListModel.loadListWithPage(
    async (filters) => {
      const { pageNo } = filters
      const filterType = getActFilterType()
      const isConfirm = filterType === ActSubTabResources.Confirm
      const res = await getActList({
        ...filters,
        /**
         * 通过路径上的参数，解决初次进入加载问题
         * 如果传递了 filterType 就是用透传的
         *  */
        filterType: newFilterType || filterType || filters.filterType,
        ctime: (filters.ctime || []).filter((e) => Boolean(e)),
        kaConfirmTime: isConfirm
          ? (filters.kaConfirmTime || []).filter((e) => Boolean(e))
          : undefined,
        currentPage: pageNo,
        bizLine: bizLine ?? BizLineEnum.WaiMai,
        creator:
          filterType === ActSubTabResources.Mine ? undefined : filters.creator,
        planId: planId || filters?.planId,
        activityConfirmStatus: isConfirm ? filters.activityConfirmStatus : -1,
        groupId: groupId,
      } as any)
      return {
        data: res.data?.items || [],
        total: res.data?.total || 0,
        error: !res.success,
        msg: res.msg,
      }
    },
    {
      refresh,
    }
  )
}
