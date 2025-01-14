import { ListModel } from './base/list'
import { Empty } from '@easy-page/antd-ui'
import { StatusOption, getStatusFilterOptions } from '@/common/apis/getActApplyResStatusOptions'

export const statusOptionsModel = new ListModel<StatusOption, Empty>({
  defaultFilters: {},
  disablePage: true
})


export const loadActStatusOptionsToModel = () => {
  return statusOptionsModel.loadList(async () => {
    const res = await getStatusFilterOptions({
    });
    return {
      data: res?.data,
      total: res?.data?.length,
      error: !res.success,
      msg: res.msg
    };
  })
}
