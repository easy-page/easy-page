import {
  ConfigEnv,
  ConfigPublishStatus,
  UserInfo,
  ZsptRolesEnum,
} from '@/common'
import { ToolbarProps } from '@/common/fields'

export interface ConfigFormState {
  name: string
  icon?: string
  desc: string
  bizLine: string
  type: string
  isTemplate: string
  fileName?: string
  actPrefix?: string
  actType: string
  planType: string
  owner: string
  managers: string[]
  publishStatus: ConfigPublishStatus
  env: ConfigEnv
  applyDefaultRole: ZsptRolesEnum
  useNewZsptFramework: boolean
  'templateInfo.prod': number
  'templateInfo.test': number
  'templateInfo.name': string
  factorConfigs: string
}
export type ConfigFormProps = ToolbarProps & {
  userInfo: UserInfo
}
