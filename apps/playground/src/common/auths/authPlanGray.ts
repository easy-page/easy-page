import { checkOpGray } from '../apis'
import { GrayRuleCode, PlanTypeEnum } from '../constants'
import { AuthHandler } from './planAndActAuths'

/**
 * 灰度权限检查: https://km.sankuai.com/collabpage/2360488711
 * @param param0
 */
export const authPlanGray: <
  T extends {
    creator: string
    planType: PlanTypeEnum
    id: number
  }
>(options: {
  ruleCodes: GrayRuleCode[]
}) => AuthHandler<T> =
  ({ ruleCodes }) =>
  async ({ record }) => {
    const result = await checkOpGray({
      ruleCodes,
      extend: {
        planId: `${record.id}`,
      },
    })
    return {
      allow: result.success,
      msg: result.msg,
      continueNextResult: 'allow',
    }
  }
