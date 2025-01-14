import { AuthSence } from '@/common/auths'
import {
  ConfigPublishStatus,
  AuthFromBackendResEnum,
  AuthUrl,
  GrayRuleCode,
  CheckSubsidyItem,
  AuthTypeEnum,
  AuthHandlersEnum,
  ActTypeEnum,
  AuthPlanOption,
  AuthActOption,
  PlanStatusEnum,
  PlanSubTabResources,
  ActivityStatusEnum,
  ActSubTabResources,
  TemplateIdInfo,
  ZsptRolesEnum,
  BizLineEnum,
  IsConfigTemplate,
  ConfigType,
  ConfigEnv,
  ConfigBizline,
} from '@/common/constants'
import {
  RequestHandler,
  RequestResult,
  adminPostReq,
  isLocal,
  toJson,
  getBizLine,
} from '@/common/libs'
import { CrudConfig } from './curdConfig'
import { CategoryCode } from '../getFactors'

export type GetConfigListParams = {
  pageNo: number
  pageSize: number
  name?: string
  id?: number
  filterWithWhiteList?: boolean
  publishStauts?: ConfigPublishStatus
}

export type AuthFromBackendConfig = {
  /** type =  AuthFromBackEnd 必需要配置（必选）*/
  auths: AuthFromBackendResEnum[]
  /** type =  AuthFromBackEnd  需要配置（可选）*/
  authUrl?: AuthUrl
  /** type =  AuthFromBackEnd 需要配置（必选）*/
  sence: AuthSence
}

export type AuthActGrayConfig = {
  ruleCode: GrayRuleCode[]
}

export type AuthSubsidyConfig = {
  checkItems: CheckSubsidyItem[]
  resourceIdList: AuthTypeEnum[]
}

export type AuthInfo<Config = Record<string, any>> = {
  authHandlerType: AuthHandlersEnum
  config?: Config
}

export type OperationShowConfig<Status, Tab> = {
  /** 是否展示 */
  show: boolean
  /** 基于部分状态展示 */
  showWithStatus?: Status[]
  /** 列表所属子 Tab，如：我的 */
  tab?: Tab[]
}

export type FactorConfig = {
  defaultValue: any
  defaultChoosed: boolean
}

export type FactorInfoConfig = {
  categories: CategoryCode[]
  factorCodes: string[]
  /** 报名后，是否可编辑因子 */
  canEditQualifyAfterApply?: boolean
  /** key是factorCode，value是因子配置 */
  factorConfigs: Record<string, FactorConfig>
}

export type ConfigInfo = {
  /** 对应：ActTypeEnum Or ActTemplate，cli 创建时，自动在：ActTypeEnum 增加枚举 */
  actType?: ActTypeEnum
  /** 对应：PlanTypeEnum Or PlanTemplate，cli 创建时，自动在：PlanTypeEnum 增加枚举 */
  planType?: number

  /** 补贴资源权限 ID */
  resourceIdList: AuthTypeEnum[]

  /** 补贴承担方查询 */
  bgBuList: AuthTypeEnum[]
  /** 活动列表拷贝鉴权 */
  actCopyAuths?: AuthInfo[]
  /** 活动列表编辑按钮设置鉴权 */
  actEditAuths?: AuthInfo[]
  /** 活动列表邀请设置鉴权 */
  actInviteSettingsAuths?: AuthInfo[]
  /** 活动发送邀请鉴权 */
  actSendInviteAuths?: AuthInfo[]
  /** 活动撤回鉴权 */
  actWithdrawAuths?: AuthInfo[]

  /** 合作运营确认按钮鉴权 */
  actPoiConfirmAuths?: AuthInfo[]

  /** 方案编辑权限 */
  planEditBtnAuths?: AuthInfo[]

  /** 方案复制权限 */
  planCopyBtnAuths?: AuthInfo[]

  /** 方案或者活动授权选项 */
  authOptionsInfo?: Array<AuthPlanOption> | Array<AuthActOption>

  /**
   * 展示发布方案按钮
   * 是否展示发布方案按钮，默认不展示
   * - 虽然发布发布方案和发送邀请是同一个请求，但是神会员里名称都不一样
   * - 算作另一个按钮
   */
  showPublishPlanBtn?: OperationShowConfig<PlanStatusEnum, PlanSubTabResources>

  /** 展示方案发送邀请按钮 */
  showPlanSendInviteBtn?: OperationShowConfig<
    PlanStatusEnum,
    PlanSubTabResources
  >

  /** 展示加入方案按钮 */
  showJoinPlanBtn?: OperationShowConfig<PlanStatusEnum, PlanSubTabResources>

  /** 展示方案报名结果页按钮 */
  showPlanApplyResultBtn?: OperationShowConfig<
    PlanStatusEnum,
    PlanSubTabResources
  >

  /** 展示方案撤回按钮 */
  showPlanWithdrawBtn?: OperationShowConfig<PlanStatusEnum, PlanSubTabResources>

  /** 展示复制方案按钮 */
  showPlanCopyBtn?: OperationShowConfig<PlanStatusEnum, PlanSubTabResources>

  /** 展示编辑方案按钮 */
  showPlanEditBtn?: OperationShowConfig<PlanStatusEnum, PlanSubTabResources>

  /** 展示活动复制按钮 */
  showActCopyBtn?: OperationShowConfig<ActivityStatusEnum, ActSubTabResources>

  /** 展示活动编辑按钮 */
  showActEditBtn?: OperationShowConfig<ActivityStatusEnum, ActSubTabResources>

  /** 使用默认的方案发送邀请动作 */
  usePlanSendInviteDefaultAction?: boolean

  /** 使用默认的方案撤回动作 */
  usePlanWithdrawDefaultAction?: boolean

  /** 使用默认的方案查看动作 */
  usePlanViewDefaultAction?: boolean

  /** 展示活动邀请设置按钮 */
  showActInviteSettingsBtn?: OperationShowConfig<
    ActivityStatusEnum,
    ActSubTabResources
  >
  /** 展示活动进度按钮 */
  showActProgressBtn?: OperationShowConfig<
    ActivityStatusEnum,
    ActSubTabResources
  >
  /** 展示合作运营确认按钮 */
  showActPoiConfirmBtn?: OperationShowConfig<
    ActivityStatusEnum,
    ActSubTabResources
  >
  /** 展示确认协议按钮 */
  showConfirmAgreementBtn?: OperationShowConfig<
    ActivityStatusEnum,
    ActSubTabResources
  >
  /** 展示确认商品 */
  showConfirmSkuBtn?: OperationShowConfig<
    ActivityStatusEnum,
    ActSubTabResources
  >

  /** 是否需要灰度鉴权，默认不需要 */
  needCheckGray?: boolean

  /** 活动模版信息配置 */
  templateInfo: Omit<TemplateIdInfo, 'bizLine'>

  /** 是否迁移至新框架，暂时的配置，默认 false */
  useNewZsptFramework?: boolean

  /** 活动创建页面中需要的因子配置 */
  actFactorInfo?: FactorInfoConfig

  /** 申请权限时候，此活动默认申请的角色 */
  applyDefaultRole: ZsptRolesEnum

  /** 报名结果是否使用新页面 */
  useNewFrameworkApplyResPage?: boolean

  /** 邀请设置里，选择操作是否禁用不限制选项 */
  disableNoLimitOption?: boolean

  /** 邀请设置里，通过商家品牌邀请是否禁用不限制选项 */
  disableMerchantBrandOption?: boolean

  /** 邀请设置里，如果是通过商家品牌邀请的情况下，是否展示录入方式 */
  showInputWayOfInviteSettingsByMerchantOp?: boolean
}

export type ConfigListInfo<
  Config = ConfigInfo,
  ActConfig = CrudConfig,
  WhiteList = string[],
  BizLine = BizLineEnum
> = {
  id: number
  name: string
  icon?: string
  desc: string
  bizLine: BizLine
  type: ConfigType
  owner: string
  managers: string
  creator: string
  updator: string
  createdAt: number
  updatedAt: number
  config: Config
  publishStatus: ConfigPublishStatus
  env: ConfigEnv
  crudConfig: ActConfig
  whiteList: WhiteList
  isTemplate: IsConfigTemplate
}

export type ConfigListRes<
  Config = ConfigInfo,
  ActConfig = CrudConfig,
  WhiteList = string,
  BizLine = BizLineEnum
> = {
  configs: ConfigListInfo<Config, ActConfig, WhiteList, BizLine>[]
  total: number
}

/**
 * - 因为 go 的特殊机制，使用 0 会有很多麻烦，因此在这里坐下转换处理
 */
export const convertBizline = (bizLine: ConfigBizline): BizLineEnum => {
  if (bizLine === ConfigBizline.Waimai) {
    return BizLineEnum.WaiMai
  }
  return (bizLine || BizLineEnum.ShanGou) as BizLineEnum
}

const filterDevConfigs = (
  result: ConfigListInfo<ConfigInfo, CrudConfig, string[], BizLineEnum>[]
) => {
  if (!isLocal()) {
    return result
  }
  const localConfigs = result
    // .filter((x) => x.env === ConfigEnv.DEV)
    .map((e) => e.config.actType)
  return result.filter((x) => {
    if (localConfigs.includes(x.config.actType)) {
      // 如果是本地调试，且存在 dev 的配置，则用 dev 的，否则用非 dev 环境的
      return false
    }
    return true
  })
}

const prepareConfigs = (
  configs: ConfigListInfo<string, string, string, ConfigBizline>[]
) => {
  const result = configs.map(
    (e) =>
      ({
        ...e,
        config: toJson(e.config, {
          defaultValue: {},
        }) as ConfigInfo,
        bizLine: convertBizline(e.bizLine),
        crudConfig: toJson(e.crudConfig, {
          defaultValue: {},
        }) as CrudConfig,
        whiteList: (e.whiteList || '').split(',').filter((x) => Boolean(x)),
      } as ConfigListInfo<ConfigInfo, CrudConfig, string[]>)
  )
  // return filterDevConfigs(result)
  return result
}

export const getConfigList: RequestHandler<
  GetConfigListParams,
  ConfigListRes<ConfigInfo, CrudConfig, string[]>
> = async (params) => {
  const result: RequestResult<
    ConfigListRes<string, string, string, ConfigBizline>
  > = await adminPostReq('/zspt-admin-api/zspt/search-act', {
    ...params,
    publishStatus: ConfigPublishStatus.Published,
  })
  if (!result || !result.success) {
    return result as any as RequestResult<
      ConfigListRes<ConfigInfo, CrudConfig, string[]>
    >
  }
  const currentBizLineConfig =
    (result.data?.configs || []).filter(
      (x) => convertBizline(x.bizLine) === getBizLine()
    ) || []

  return {
    ...result,
    data: {
      total: result.data?.total || 0,
      configs: prepareConfigs(currentBizLineConfig),
    },
  }
}
