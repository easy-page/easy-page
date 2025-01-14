import { PlanInfo, PlanListFilter, getPlanList } from '@/common/apis'
import { ListModel } from './base/list'
import { toNumber } from '../libs'
import { PlanSubTabResources, ALL } from '../constants'
import { getPlanFilterType } from '../routes'

const getDefaultFilterType = () => {
  const filterType = getPlanFilterType()
  return filterType || PlanSubTabResources.Mine
}

export const DEFAULT_PLAN_LIST_FILTERS = {
  ctime: [undefined, undefined],
  filterType: getDefaultFilterType(),
  planStatus: ALL as any,
  joinStatus: ALL as any,
  sendTime: [undefined, undefined],
}

export const planListModel = new ListModel<PlanInfo, PlanListFilter>({
  defaultFilters: DEFAULT_PLAN_LIST_FILTERS,
  defaultPageSize: 20,
})

/**
 * - 不设计到模型里的原因是不确定这里会不会基于上下文动态增加查询参数
 * - 因此可以定义完 model 后统一在这里定义一个查询函数，这样方便在任何地方调用
 */
export const loadPlanListToModel = (
  bizLine: number,
  options?: {
    resetPage?: boolean
  }
) => {
  if (options?.resetPage) {
    const { pageSize } = planListModel.pageInfo
    planListModel.changePage({ pageNo: 1, pageSize })
    return
  }
  return planListModel.loadListWithPage(async (filters) => {
    const { pageNo } = filters
    const filterType = getPlanFilterType() || filters.filterType

    const res = await getPlanList({
      ...filters,
      /** 通过路径上的参数，解决初次进入加载问题 */
      filterType: filterType,
      joinStatus:
        filterType === PlanSubTabResources.Confirm
          ? filters.joinStatus
          : undefined,
      creator:
        filterType === PlanSubTabResources.Mine ? undefined : filters.creator,
      ctime: (filters.ctime || []).filter((e) => Boolean(e)),
      sendTime: (filters.sendTime || []).filter((e) => Boolean(e)),
      currentPage: pageNo,
      bizLine: toNumber(bizLine as any),
    })
    return {
      data: res.data?.items || [],
      total: res.data?.total || 0,
      error: !res.success,
      msg: res.msg,
    }
  })
}
