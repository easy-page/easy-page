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
import {
  getBrandStatList,
  GetBrandStatListParams,
  SingleBrandStatInfo,
} from '../apis/getBrandStatList'

export const DEFAULT_BRAND_LIST_FILTERS: GetBrandStatListParams = {
  brandIds: '',
  brandId: undefined,
}

export const brandStatListModel = new ListModel<
  SingleBrandStatInfo,
  GetBrandStatListParams
>({
  defaultFilters: DEFAULT_BRAND_LIST_FILTERS,
  defaultPageSize: 20,
})

export const loadBrandStatListToModel = () => {
  return brandStatListModel.loadList(async (filters) => {
    const res = await getBrandStatList({
      ...filters,
    } as any)

    return {
      data: res.data || [],
      total: (res.data || []).length || 0,
      error: !res.success,
      msg: res.msg,
    }
  })
}
