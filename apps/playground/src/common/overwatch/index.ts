import { useEffect } from "react"
import OverWatch from '@tangram/overwatch'
import { IOverWatchInfo } from "./type"
import { UserInfo } from "../apis/getUserInfo"
import { ClientAppKey, OverWatchEnv } from "./constant"
import { getEnv } from "../libs"
import { EnvEnum } from "../constants"

export const overWatchEnd = () =>
  new Promise(resolve => {
    try {
      window.zsptWatcher
        .end()
        .then(() => resolve(''))
        // 异常情况仍执行后续业务逻辑
        .catch(() => resolve(''))
    } catch (e) {
      // 异常情况仍执行后续业务逻辑
      resolve('')
    }
  })


/** 兼容历史的 env 配置 */
const getEnvMap = () => {
  const env = getEnv()
  if (env === EnvEnum.St) {
    return OverWatchEnv.st
  }
  if (env === EnvEnum.Online) {
    return OverWatchEnv.prod
  }
  return OverWatchEnv.test;
}

export const useOverWatch = (
  overWatchInfo: IOverWatchInfo,
  userInfo: UserInfo,
) => {

  useEffect(() => {
    if (!window.zsptWatcher && userInfo.mis) {
      window.zsptWatcher = new OverWatch({
        env: OverWatchEnv[getEnvMap()],
        projectId: ClientAppKey,
        misId: userInfo.mis,
        ...overWatchInfo
      })
    }

    // 启动监控
    window.zsptWatcher?.start()
    console.log('%c Line:51 🍡', 'color:#ea7e5c', 'start')

    return () => {
      // 组件被卸载时注销overWatch
      console.log('%c Line:55 🍫', 'color:#93c0a4', '被卸载了?')
      window.zsptWatcher?.release()
      window.zsptWatcher = null
    }
  }, [userInfo.mis])
}
