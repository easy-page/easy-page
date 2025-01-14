import { CityListItem, GetCityListParams, getCityList } from '@/common/apis'
import { ListModel } from './base/list'
import { Empty } from '@easy-page/antd-ui'

export const cityListModel = new ListModel<CityListItem, Empty>({
  defaultFilters: {},
  disablePage: true
})


export const loadCitiesOptionsToModel = (params: GetCityListParams) => {
  return cityListModel.loadList(async () => {
    const res = await getCityList(params);
    return {
      data: res?.data,
      total: res?.data?.length,
      error: !res.success,
      msg: res.msg
    };
  })
}
