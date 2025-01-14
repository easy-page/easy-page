import { GetPnListParams, IsMisOrgPn, PnInfo, getPnList } from '../apis'
import { ListModel } from './base/list'

export type PnFilter = {
  period: number
}

export const pnListModel = new ListModel<PnInfo, PnFilter>({
  defaultFilters: {
    period: new Date().getTime() / 1000,
  },

  defaultPageNo: 0,
  defaultPageSize: 300,
})

export const loadActPnListToModel = ({
  bgBuList,
  period,
}: Pick<GetPnListParams, 'bgBuList' | 'period'>) => {
  return pnListModel.loadListWithPage(async (filters) => {
    const { pageNo, pageSize } = filters
    const res = await getPnList({
      ...filters,
      bgBuList,
      period: period || filters.period,
      isInMisOrg: IsMisOrgPn.No,
      page: {
        currentPage: pageNo,
        pageSize: pageSize,
      },
    })
    const data = res.data || []
    return {
      data,
      total: data.length,
      error: !res.success,
      msg: res.msg,
    }
  })
}
