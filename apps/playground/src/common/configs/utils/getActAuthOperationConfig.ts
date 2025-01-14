import { OperaitonContext } from '@/common/auths'
import { ConfigFullInfo, getActConfig } from './getActConfigs'
import { AnyNodeInfoType } from '@easy-page/antd-ui'
import {
  AuthActOption,
  AuthActOptionText,
  AuthPlanOption,
} from '@/common/constants'
import {
  actEditAndInviteSettingsAuth,
  cancelActAuth,
  sendActInviteAuth,
} from '@/common/fields/common/authOperation'
import { ActInfo } from '@/common/apis'

export type AuthActOperationInfo = {
  title: string
  node: AnyNodeInfoType
}

export const AuthActNodeMap: Record<AuthActOption, AnyNodeInfoType> = {
  [AuthPlanOption.AuthEdit]: actEditAndInviteSettingsAuth,
  [AuthPlanOption.AuthSendInvite]: sendActInviteAuth,
  [AuthPlanOption.Authwithdraw]: cancelActAuth,
}

export const getActAuthOperationConfig =
  (
    getConfig: (fullConfig: ConfigFullInfo) => ConfigFullInfo['authOptionsInfo']
  ) =>
  ({
    record,
    configs,
  }: OperaitonContext<
    ActInfo,
    string,
    Record<string, any>
  > & {}): AuthActOperationInfo[] => {
    const fullConfig = getActConfig({ configs, templateId: record.templateId })
    const config = getConfig(fullConfig) as AuthActOption[]
    // const authConfig = config
    return config.map((e) => {
      return {
        title: AuthActOptionText[e],
        node: AuthActNodeMap[e],
      }
    })
  }
