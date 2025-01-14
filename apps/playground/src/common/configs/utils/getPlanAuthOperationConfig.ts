import { OperaitonContext } from '@/common/auths'
import { ConfigFullInfo, getActConfig } from './getActConfigs'
import { AnyNodeInfoType } from '@easy-page/antd-ui'
import {
  AuthActOption,
  AuthPlanOption,
  AuthPlanOptionText,
} from '@/common/constants'
import { sgSendInviteAuth } from '@/common/fields/common/authOperation/sgSendInviteAuth'
import { withdrawPlan } from '@/common/fields/common/authOperation/withdrawPlan'
import { editAuth, sendInviteAuth } from '@/common/fields/common/authOperation'
import { getPlanConfig } from './getPlanConfigs'
import { PlanInfo } from '@/common/apis'

export type AuthPlanOperationInfo = {
  title: string
  node: AnyNodeInfoType
}

export const AuthPlanNodeMap: Record<AuthPlanOption, AnyNodeInfoType> = {
  [AuthPlanOption.AuthEdit]: editAuth,
  [AuthPlanOption.AuthSendInvite]: sgSendInviteAuth,
  [AuthPlanOption.Authwithdraw]: withdrawPlan,
  [AuthPlanOption.AuthPublishPlan]: sendInviteAuth,
}

export const getPlanAuthOperationConfig =
  (
    getConfig: (fullConfig: ConfigFullInfo) => ConfigFullInfo['authOptionsInfo']
  ) =>
  ({
    record,
    configs,
  }: OperaitonContext<
    PlanInfo,
    string,
    Record<string, any>
  > & {}): AuthPlanOperationInfo[] => {
    const fullConfig = getPlanConfig({ configs, planType: record.planType })
    const config = getConfig(fullConfig) as AuthActOption[]
    // const authConfig = config
    return config.map((e) => {
      return {
        title: AuthPlanOptionText[e],
        node: AuthPlanNodeMap[e],
      }
    })
  }
