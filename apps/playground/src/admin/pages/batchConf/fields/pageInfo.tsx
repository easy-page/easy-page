import { AnyNodesInfoType, PageUtil } from '@easy-page/antd-ui'

export const getBatchConfigFilterPageInfo = (nodes: AnyNodesInfoType) => {
  const pu = new PageUtil({ pageId: 'batch-filters-config' })
  pu.addFields(nodes)
  return pu.getPageInfo()
}
