import { nodeUtil } from '@easy-page/antd-ui'
import { ActTimeLimit } from '../constant'

export const actTimeLimitOption = () =>
  nodeUtil.createNode(`${ActTimeLimit.Limit}`, {
    name: '限制',
  })
