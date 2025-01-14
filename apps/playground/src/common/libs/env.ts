import { EnvEnum } from '../constants'

export const isLocal = () => {
  return /127\.0\.0\.1|localhost/.test(window.location.host)
}

export const getEnv = () => {
  // test 环境
  if (/127\.0\.0\.1|localhost|\.test\./.test(window.location.host)) {
    return EnvEnum.Test
  }

  // st 环境
  if (/\.st\./.test(window.location.host)) {
    return EnvEnum.St
  }

  // prod 环境
  return EnvEnum.Online
}
