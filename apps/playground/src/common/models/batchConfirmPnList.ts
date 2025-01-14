import { GetPnListParams, IsMisOrgPn, PnInfo, getPnList } from '../apis'
import { ChargeSideEnum } from '../constants'
import { ListModel } from './base/list'

export const batchConfirmPnListModel = new ListModel<PnInfo, {}>({
  defaultFilters: {},

  defaultPageNo: 0,
  defaultPageSize: 300,
})

export const loadBatchConfirmPnListToModel = ({
  period,
}: Pick<GetPnListParams, 'period'>) => {
  return batchConfirmPnListModel.loadListWithPage(async (filters) => {
    const { pageNo, pageSize } = filters
    const res = await getPnList({
      ...filters,
      period,
      bgBuList: [ChargeSideEnum.MeiTuanShanGou],
      isInMisOrg: IsMisOrgPn.Yes,
      page: {
        currentPage: pageNo,
        pageSize: pageSize,
      },
    })
    console.log('res',res);
    
    const data = res.data || []
    return {
      data,
      total: data.length,
      error: !res.success,
      msg: res.msg,
    }
  })
}
