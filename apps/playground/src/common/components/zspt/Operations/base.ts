import {
  OperaitonContext,
  AuthHandlerRes,
  AuthHandlerType,
} from '@/common/auths/planAndActAuths'
import { AuthUrl, OperationEnum } from '@/common/constants'

import { message } from 'antd'

export type Operation<
  T = Record<string, any>,
  Sence = string,
  Context = Record<string, any>
> = {
  show: (context: OperaitonContext<T, Sence, Context>) => boolean
  id: OperationEnum
  label: string | React.FC<{ row: T }>
  /**
   * - 鉴权时从 authResult 里取的 key 和操作不一定对应
   * - 邀请设置就是用的 Edit 的 key
   *  */
  authOperationKey?: OperationEnum
  action: (context: OperaitonContext<T, Sence, Context>) => void
  authUrl?: AuthUrl // 如果全局没有的话，就看操作上这个 authUrl
  /** 按照数组内顺序执行校验，禁止后取消执行 */
  auth: AuthHandlerType<T, Record<string, any>, Sence>
}

export const execAuth = async <T = Record<string, any>, Sence = string>(
  context: OperaitonContext<T, Sence>,
  auths: AuthHandlerType<T, Record<string, any>, Sence>
): Promise<Omit<AuthHandlerRes, 'continueNextResult'>> => {
  const _auths = typeof auths === 'function' ? auths(context) : auths
  if (_auths.length === 0) {
    return Promise.resolve({ allow: true })
  }
  const result: Omit<AuthHandlerRes, 'continueNextResult'> = {
    allow: false,
  }

  for (const auth of _auths) {
    const execRes = await auth(context as any)
    if (execRes) {
      result.allow = execRes.allow
      result.disableErrorToast = execRes.disableErrorToast
      if (execRes.msg) {
        result.msg = execRes.msg
      }
    }

    if (execRes === null || !execRes) {
      continue
    }

    /**
     * - 当执行结果为 allow：true 时候，如果：continueNextResult 也为 allow 时，则需要继续执行权限校验，否则跳出
     * - 当执行结果为 allow：false 时候，如果：continueNextResult 也为 deny 时，则需要继续执行权限校验，否则跳出
     */
    if (
      (execRes.allow && execRes.continueNextResult !== 'allow') ||
      (!execRes.allow && execRes.continueNextResult !== 'deny')
    ) {
      // 执行权限鉴权结束，结束前看一下结果，如果结果是：不允许，则弹出提示消息。
      break
    }
  }
  if (!result.allow && !result.disableErrorToast) {
    message.error(result.msg || '无权限操作')
  }
  return result
}
