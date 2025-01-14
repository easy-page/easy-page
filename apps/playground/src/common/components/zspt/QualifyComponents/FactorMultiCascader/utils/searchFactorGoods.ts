import { ListModel } from '@/common/models/base/list'
import { Empty } from '@easy-page/antd-ui'
import {
  SearchFactorInfo,
  SearchFactorGoodsParams,
  searchFactorGoods,
} from './searchFactorGoodsApi'

export const factorGoodListModel = new ListModel<SearchFactorInfo, Empty>({
  defaultFilters: {},
  disablePage: true,
})

export const loadFactorGoodsToModel = (params: SearchFactorGoodsParams) => {
  return factorGoodListModel.loadList(async () => {
    const res = await searchFactorGoods(params)
    return {
      data: res?.data,
      total: res?.data?.length,
      error: !res.success,
      msg: res.msg,
    }
  })
}
