import { ListModel } from './base/list'
import { Empty } from '@easy-page/antd-ui'
import { ActItemInfo, getCreateActItemInfos, GetCreateActItemsParams } from '../apis/getCreateActItems'

export const actTemplateListModel = new ListModel<ActItemInfo, Empty>({
  defaultFilters: {},
  disablePage: true
})


export const loadActTemplateListToModel = (params: GetCreateActItemsParams) => {
  return actTemplateListModel.loadList(async () => {
    const res = await getCreateActItemInfos(params);
    return {
      data: res?.data,
      total: res?.data?.length,
      error: !res.success,
      msg: res.msg
    };
  })
}
