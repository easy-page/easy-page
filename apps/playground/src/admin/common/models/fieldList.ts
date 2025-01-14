import { ListModel } from '@/common/models/base/list'
import { getFieldList, GetFieldListParams } from '../apis/getFieldList'
import { FieldConfig } from '@/common/constants/fieldMaps/interface'

export type FieldListFilter = Pick<
  GetFieldListParams,
  'belong' | 'fieldName' | 'fieldIds'
>

export const DEFAULT_FIELD_LIST_FILTERS = {
  belong: undefined,
  fieldName: '',
  fieldIds: [],
}

export const fieldListModel = new ListModel<FieldConfig, FieldListFilter>({
  defaultFilters: DEFAULT_FIELD_LIST_FILTERS,
  defaultPageSize: 20,
})

export const loadFieldListToModel = (options?: { resetPage?: boolean }) => {
  if (options?.resetPage) {
    const { pageSize } = fieldListModel.pageInfo
    fieldListModel.changePage({ pageNo: 1, pageSize })
    return
  }
  return fieldListModel.loadListWithPage(async (filters) => {
    const res = await getFieldList({
      ...filters,
    })
    return {
      data: res.data?.data || [],
      total: res.data?.total || 0,
      error: !res.success,
      msg: res.msg,
    }
  })
}
