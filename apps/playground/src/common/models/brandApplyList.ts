import {
  BrandApplyListItem,
  QueryPoiApplyListParams,
  queryBrandApplyList,
} from '../apis'
import { BizLineEnum } from '@/common/constants'
import { ListModel } from './base/list'

export type BrandApplyListFilter = Omit<
  QueryPoiApplyListParams,
  'currentPage' | 'pageSize'
>

export const brandApplyListModel = new ListModel<
  BrandApplyListItem,
  BrandApplyListFilter
>({
  defaultFilters: {},
  defaultPageSize: 20,
})

export const loadBrandApplyListToModel = ({
  bizLine,
  activityId,
}: {
  bizLine: BizLineEnum
  activityId: number
}) => {
  return brandApplyListModel.loadListWithPage(async (filters) => {
    const { pageNo, pageSize } = filters
    const res = await queryBrandApplyList({
      ...filters,
      actId: activityId,
      currentPage: pageNo,
      pageSize: pageSize,
    })
    return {
      data: res?.data?.items,
      total: res?.data?.total,
      error: !res.success,
      msg: res.msg,
    }
  })
}
