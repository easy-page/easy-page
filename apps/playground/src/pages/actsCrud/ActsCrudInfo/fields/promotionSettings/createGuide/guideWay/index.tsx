import { nodeUtil } from '@easy-page/antd-ui'
import { chooseGuideWay } from './fields'
import { CreateProductTypeEnum } from '@/common'

export const guideWay = chooseGuideWay().appendChildren([
  nodeUtil.createNode(`${CreateProductTypeEnum.ByUpc}`, {
    name: '通过UPC引导',
  }),

  nodeUtil.createNode(`${CreateProductTypeEnum.ByStandard}`, {
    name: '通过标品编码引导',
  }),
])
