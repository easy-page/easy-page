import { nodeUtil } from '@easy-page/antd-ui'
import { ActTimeLimit } from '../constant'

export const actTimeNoLimitOption = () =>
  nodeUtil.createNode(`${ActTimeLimit.NoLimit}`, {
    name: '不限制',
  })
