import { ListModel } from './base/list'
import {
  getBrandStatList,
  GetBrandStatListParams,
  SingleBrandStatInfo,
} from '../apis/getBrandStatList'
import {
  getBatchConfirmActList,
  GetBatchConfirmActListParams,
  SingleBatchConfirmAct,
} from '../apis/getBatchConfirmActList'
import { getQueryString, toJson } from '../libs'
import { ConfirmStatusEnum } from '../constants'

export const DEFAULT_CONFIRM_LIST_FILTERS: Omit<
  GetBatchConfirmActListParams,
  'currentPage' | 'pageSize'
> = {
  brandIds: [], // 业务品牌ID，必填
  getAll: false, // 0-否，1-是，获取全部，仅用于全选所有场景，此时分页信息无效
  activityIds: '', // 活动ID
  activityName: '', // 支持模糊查询
  activityTime: [], // 活动时间
  confirmTime: [], // 合作运营确认时间
  confirmStatus: [ConfirmStatusEnum.UnConfirm], // 补贴提报状态，-1全部 1待确认 2审批中 3确认参加 4确认不参加，详见枚举confirmStatus
}

export const batchConfirmActListModel = new ListModel<
  SingleBatchConfirmAct,
  Omit<GetBatchConfirmActListParams, 'currentPage' | 'pageSize'>
>({
  defaultFilters: DEFAULT_CONFIRM_LIST_FILTERS,
  defaultPageSize: 20,
})

export const loadbatchConfirmActListToModel = ({
  brandIds,
  getAll = false,
}: {
  brandIds: string[]
  getAll?: boolean
}) => {
  return batchConfirmActListModel.loadList(async (filters) => {
    const res = await getBatchConfirmActList({
      ...filters,
      brandIds,
      getAll,
    } as any)

    return {
      data: res.data.items || [],
      total: res.data.total || 0,
      error: !res.success,
      msg: res.msg,
    }
  })
}
