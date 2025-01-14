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
import {
  getBrandSelectList,
  SingleBrandSelectOption,
} from '../apis/getBrandSelectList'

export const brandSelectListModel = new ListModel<SingleBrandSelectOption, {}>({
  defaultFilters: {},
  defaultPageSize: 20,
})

export const loadBrandSelectListToModel = () => {
  return brandSelectListModel.loadList(async () => {
    const res = await getBrandSelectList({})

    return {
      data: res.data || [],
      total: (res?.data || []).length || 0,
      error: !res.success,
      msg: res.msg,
    }
  })
}
