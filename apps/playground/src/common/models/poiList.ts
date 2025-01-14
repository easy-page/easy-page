import { PoiInfo, QueryPoiListParams, queryPoiList } from "../apis";
import { ListModel } from "./base/list";

export type PoiFilter = Pick<QueryPoiListParams, 'poiBrandId' | 'poiId'>

export const poiListModel = new ListModel<PoiInfo, PoiFilter>({
  defaultFilters: {

  },
  defaultPageSize: 20
})

export const loadPoiListToModel = (actId: number) => {
  return poiListModel.loadListWithPage(async (filters) => {
    const { pageNo, pageSize } = filters;
    const res = await queryPoiList({
      ...filters,
      activityId: actId,
      currentPage: pageNo,
      pageSize: pageSize
    });
    return {
      data: res?.data?.items,
      total: res?.data?.total,
      error: !res.success,
      msg: res.msg
    };
  })
}
