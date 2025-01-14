import { ConfigInfo, ConfigListInfo } from '@/common/apis/getConfigList'
import {
  BizLineEnum,
  ConfigBizline,
  ConfigEnv,
  EnvEnum,
  PlanTypeEnum,
} from '@/common/constants'
import { getEnv } from '@/common/libs'

export type ConfigFullInfo = ConfigInfo & {
  bizLine: BizLineEnum
  name: string
  env: ConfigEnv
}

/**
 * - 因为 go 的特殊机制，使用 0 会有很多麻烦，因此在这里坐下转换处理
 */
const convertBizline = (bizLine: ConfigBizline): BizLineEnum => {
  if (bizLine === ConfigBizline.Waimai) {
    return BizLineEnum.WaiMai
  }
  return (bizLine ?? BizLineEnum.ShanGou) as BizLineEnum
}

export const getZpstAdminPlanConfig = ({
  planType,
  configs,
  bizLine,
}: {
  planType: PlanTypeEnum
  configs: ConfigListInfo[]
  bizLine: BizLineEnum
}): ConfigFullInfo => {
  const currentEnv = getEnv()
  const fullConfig = configs
    .filter((x) => {
      if (bizLine === undefined) {
        return true
      }
      return bizLine === convertBizline(x.bizLine as any)
    })
    .find((e) => {
      if (planType) {
        if (currentEnv === EnvEnum.Test) {
          return `${e.config.planType}` === `${planType}`
        }
        if (currentEnv === EnvEnum.St) {
          return (
            `${e.config.planType}` === `${planType}` && e.env === ConfigEnv.ST
          )
        }
        return (
          `${e.config.planType}` === `${planType}` && e.env === ConfigEnv.Prod
        )
      }
      return `${e.config.planType}` === `${planType}`
    })
  if (!fullConfig || !fullConfig.config) {
    throw Error(`未获取到方案配置「${fullConfig?.name}」，请联系相关同学`)
  }
  return {
    ...fullConfig.config,
    env: fullConfig.env,
    bizLine: fullConfig.bizLine,
    name: fullConfig.name,
  }
}
