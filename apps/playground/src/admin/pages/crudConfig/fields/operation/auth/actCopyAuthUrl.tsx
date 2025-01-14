import { AuthUrl } from '@/common'
import { nodeUtil } from '@easy-page/antd-ui'

export const actCopyAuthUrl = nodeUtil.createCustomField(
  'authUrl',
  '鉴权接口路径',
  () => <>{AuthUrl.ActCheckAuth}</>,
  {
    value: AuthUrl.ActCheckAuth,
    postprocess() {
      return {
        authUrl: AuthUrl.ActCheckAuth,
      }
    },
  }
)
