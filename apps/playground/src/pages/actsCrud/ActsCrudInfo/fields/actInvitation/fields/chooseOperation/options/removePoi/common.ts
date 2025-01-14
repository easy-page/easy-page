import { nodeUtil } from '@easy-page/antd-ui'
import { ActionTypeEnum } from '@/common/constants'
import { commonLimitOption } from '../limit'

export const removePoi = () =>
  nodeUtil.extends(commonLimitOption(), {
    id: `${ActionTypeEnum.Remove}`,
    name: '删除商家',
  })
