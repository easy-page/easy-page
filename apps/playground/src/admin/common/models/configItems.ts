import { ListModel } from '@/common/models/base/list'
import { Empty } from '@easy-page/antd-ui'
import { ConfigItem, getConfigItems } from '../apis/getConfigItems'

export const configItemsModel = new ListModel<ConfigItem, Empty>({
  defaultFilters: {},
  disablePage: true,
})

export const loadConfigItems = () => {
  return configItemsModel.loadList(async () => {
    const res = await getConfigItems({})
    return {
      data: res.data?.configs || [],
      error: !res.success,
      msg: res.msg,
    }
  })
}
