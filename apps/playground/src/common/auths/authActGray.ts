import { checkOpGray } from '../apis'
import { GrayRuleCode } from '../constants'
import { AuthHandler } from './planAndActAuths'

const toIdString = (id?: number) => {
  if (id === undefined) {
    return undefined
  }
  return `${id}`
}

/**
 * 灰度权限检查，暂时主要检查的是活动，只有对应活动才需要
 * @param param0
 */
export const authActGray: <
  T extends {
    creator: string
    templateId?: number
    id?: number
    activityId?: number
  }
>(options: {
  ruleCodes: GrayRuleCode[]
}) => AuthHandler<T> =
  ({ ruleCodes }) =>
  async ({ record }) => {
    
    const result = await checkOpGray({
      ruleCodes,
      extend: {
        actId: toIdString(record.id),
      },
    })
    return {
      allow: result.success,
      msg: result.msg,
      continueNextResult: 'allow',
    }
  }
