import { JhdTypeItem } from '@/common/apis'
import { ListModel } from './base/list'
import { Empty } from '@easy-page/antd-ui'

export const collectStoreListModel = new ListModel<JhdTypeItem, Empty>({
  defaultFilters: {},
  disablePage: true,
})
