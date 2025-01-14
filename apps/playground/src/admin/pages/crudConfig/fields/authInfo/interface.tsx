import { ConfigType } from '@/common'
import {
  AuthFromBackendResEnum,
  AuthUrl,
  AuthSence,
  AuthTypeEnum,
  CheckSubsidyItem,
  GrayRuleCode,
} from '@/common'

export type AuthInfoFormState = {
  /** type =  AuthFromBackEnd 必需要配置（必选）*/
  auths: AuthFromBackendResEnum[]
  /** type =  AuthFromBackEnd  需要配置（可选）*/
  authUrl?: AuthUrl
  /** type =  AuthFromBackEnd 需要配置（必选）*/
  sence: AuthSence
  ruleCode: GrayRuleCode[]
  checkItems: CheckSubsidyItem[]
  resourceIdList: AuthTypeEnum[]
}

export type AuthInfoFromProps = {
  type: ConfigType
}
