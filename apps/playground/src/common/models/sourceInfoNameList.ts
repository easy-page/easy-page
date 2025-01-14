import { JhdTypeItem } from '@/common/apis'
import { ListModel } from './base/list'
import { Empty } from '@easy-page/antd-ui'
import { ResourceTemplate } from '../apis/getSourceInfoList'

class SourceNameModel extends ListModel<ResourceTemplate, Empty> {
  getSourceNameConfig(id: string) {
    const option = this.listInfo?.data?.find(
      (x) => x.resourceMaterialTemplateId === id
    )
    if (!option) {
      return []
    }
    return option.resourceMaterialList || []
  }
}

export const sourceNameListModel = new SourceNameModel({
  defaultFilters: {},
  disablePage: true,
})
