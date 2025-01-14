import { ListModel } from '@/common/models/base/list'
import {
  FactorInfo,
  getFactorList,
  GetFactorListParams,
} from '../apis/getFactorList'

export type FactorListFilter = Pick<
  GetFactorListParams,
  'factorName' | 'factorCode'
>

export const DEFAULT_FACTOR_LIST_FILTERS = {
  factorName: '',
  factorCode: '',
}

export const factorListModel = new ListModel<FactorInfo, FactorListFilter>({
  defaultFilters: DEFAULT_FACTOR_LIST_FILTERS,
  defaultPageSize: 200,
})

export const loadFactorListToModel = () => {
  return factorListModel.loadListWithPage(async (filters) => {
    const res = await getFactorList({
      ...filters,
    })
    return {
      data: res.data?.items || [],
      total: res.data?.total || 0,
      error: !res.success,
      msg: res.msg,
    }
  })
}
