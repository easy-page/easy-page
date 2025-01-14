import { nodeUtil } from '@easy-page/antd-ui'
import { InviteWay } from '../../../../../interface'

export const commonByConditionFilterOfSettings = nodeUtil.createNode<any>(
  InviteWay.ByFilter,
  {
    name: '根据条件筛选商家',
  },
  {
    radio: { disabled: true },
  }
)
