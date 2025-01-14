import { nodeUtil } from '@easy-page/antd-ui'
import { ActionTypeEnum } from '@/common/constants'
import { commonLimitOption } from '../limit'

export const replaceAll = () =>
  nodeUtil.extends(commonLimitOption(), {
    id: `${ActionTypeEnum.Replace}`,
    name: '整体替换',
  })
