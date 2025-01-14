import { brandId } from './../../pages/actApplyResult/ActApplyResultInfo/common/components/Filters/fields/brandId'
import { activityConfirmStatus } from './../fields/actList/activityConfirmStatus'
import { ListModel } from './base/list'
import {
  getKaConfirmActList,
  GetKaConfirmActListParams,
  SingleKaConfirmActInfo,
} from '../apis/getKaConfirmActList'
import { getQueryNumber } from '../libs'
import { PageInfo } from '@easy-page/antd-ui'

const defaultConfirmStatus = getQueryNumber('confirmStatus')
const defaultConfirmStartTime = getQueryNumber('confirmStartTime')
const defaultConfirmEndTime = getQueryNumber('confirmEndTime')

export const DEFAULT_KA_CONFIRM_LIST_FILTERS: Omit<
  GetKaConfirmActListParams,
  'currentPage' | 'pageSize'
> = {
  activityIds: '', // 活动ID
  activityName: '', // 支持模糊查询
  activityTime: [], // 活动时间
  confirmTime: [defaultConfirmStartTime, defaultConfirmEndTime], // 合作运营确认时间
  // 补贴提报状态仅适用单品牌
  confirmStatus: defaultConfirmStatus
    ? [getQueryNumber('confirmStatus')]
    : undefined, // 补贴提报状态，-1全部 1待确认 2审批中 3确认参加 4确认不参加，详见枚举confirmStatus
  activityConfirmStatus: getQueryNumber('activityConfirmStatus') || -1, // 活动确认状态，-1全部 1待确认 2审批中 3确认参加 4确认不参加，详见枚举confirmStatus
}

export const kaConfirmResultListModel = new ListModel<
  SingleKaConfirmActInfo,
  Omit<GetKaConfirmActListParams, 'currentPage' | 'pageSize'>
>({
  defaultFilters: DEFAULT_KA_CONFIRM_LIST_FILTERS,
  defaultPageSize: 20,
})

export const loadKaConfirmResultActListToModel = ({ brandId }) => {
  return kaConfirmResultListModel.loadList(async (filters) => {
    const res = await getKaConfirmActList({
      ...filters,
      brandId,
    } as any)

    return {
      data: res.data.items || [],
      total: res.data.total || 0,
      error: !res.success,
      msg: res.msg,
    }
  })
}
