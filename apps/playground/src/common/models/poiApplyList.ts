import {
  PoiApplyListItem,
  QueryPoiApplyListParams,
  queryPoiApplyList,
} from '../apis'
import { ALL, BizLineEnum } from '@/common/constants'
import { ListModel } from './base/list'

export type PoiApplyListFilter = Omit<
  QueryPoiApplyListParams,
  'currentPage' | 'pageSize'
>

export const poiApplyListModel = new ListModel<
  PoiApplyListItem,
  PoiApplyListFilter
>({
  defaultFilters: {
    // scene: '-1' as any,
  },
  defaultPageSize: 20,
})

export const loadPoiApplyListToModel = ({
  bizLine,
  activityId,
}: {
  bizLine: BizLineEnum
  activityId: number
}) => {
  return poiApplyListModel.loadListWithPage(async (filters) => {
    const { pageNo, pageSize } = filters
    console.log('filtersfilters:', filters)
    const res = await queryPoiApplyList({
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
