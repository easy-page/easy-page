import { BizLineEnum } from '@/common/constants'
import {
  QuerySkuApplyListParams,
  SkuApplyListItem,
  querySkuApplyList,
} from '@/common/apis/wmDiscount/querySkuApplyList'
import { ListModel } from '../base/list'

export type SkuApplyListFilter = Omit<
  QuerySkuApplyListParams,
  'currentPage' | 'pageSize'
>

export const skuApplyListModel = new ListModel<
  SkuApplyListItem,
  SkuApplyListFilter
>({
  defaultFilters: {
    subActIds: [],
  },
  defaultPageSize: 20,
})

export const loadSkuApplyListToModel = ({
  bizLine,
  activityId,
}: {
  bizLine: BizLineEnum
  activityId: number
}) => {
  return skuApplyListModel.loadListWithPage(async (filters) => {
    const { pageNo, pageSize } = filters
    const res = await querySkuApplyList({
      ...filters,
      actId: activityId,
      currentPage: pageNo,
      pageSize: pageSize,
    })
    return {
      data: (res?.data?.items || []).map((e) => ({ ...e, id: e.esId })),
      total: res?.data?.total,
      error: !res.success,
      msg: res.msg,
    }
  })
}
