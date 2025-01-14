import { ConfigEnv } from '@/common/constants'

export const getConfigEnv = () => {
  // test 环境
  if (/127\.0\.0\.1|localhost|\.test\./.test(window.location.host)) {
    return ConfigEnv.TEST
  }

  // st 环境
  if (/\.st\./.test(window.location.host)) {
    return ConfigEnv.ST
  }

  // prod 环境
  return ConfigEnv.Prod
}
