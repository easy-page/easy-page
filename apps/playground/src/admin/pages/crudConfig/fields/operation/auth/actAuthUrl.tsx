import { AuthUrl } from '@/common'
import { nodeUtil } from '@easy-page/antd-ui'

export const actAuthUrl = nodeUtil.createField('authUrl', '鉴权接口路径', {
  value: AuthUrl.ActAuth,
  postprocess({ value }) {
    return {
      authUrl: value,
    }
  },
})
