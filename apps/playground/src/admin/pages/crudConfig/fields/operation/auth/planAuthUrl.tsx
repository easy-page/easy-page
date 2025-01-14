import { AuthUrl } from '@/common'
import { nodeUtil } from '@easy-page/antd-ui'

export const planAuthUrl = nodeUtil.createCustomField(
  'authUrl',
  '鉴权接口路径',
  () => <>{AuthUrl.PlanAuth}</>,
  {
    value: AuthUrl.PlanAuth,
    postprocess() {
      return {
        authUrl: AuthUrl.PlanAuth,
      }
    },
  }
)
