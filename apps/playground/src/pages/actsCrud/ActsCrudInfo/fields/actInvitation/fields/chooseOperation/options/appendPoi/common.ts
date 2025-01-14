import { nodeUtil } from '@easy-page/antd-ui'
import { ActionTypeEnum } from '@/common/constants'
import { commonLimitOption } from '../limit'

export const appendPoi = () =>
  nodeUtil.extends(commonLimitOption(), {
    id: `${ActionTypeEnum.Add}`,
    name: '追加商家',
  })
