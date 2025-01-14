import { ConfigListInfo } from '@/common/apis/getConfigList'
import { ConfigEnv, EnvEnum, PlanTypeEnum } from '@/common/constants'
import { ConfigFullInfo } from './getActConfigs'
import { getEnv } from '@/common/libs'

export const getPlanConfig = ({
  planType,
  configs,
}: {
  planType: PlanTypeEnum
  configs: ConfigListInfo[]
}): ConfigFullInfo => {
  const currentEnv = getEnv()
  const fullConfig = configs.find((e) => {
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
    bizLine: fullConfig.bizLine,
    name: fullConfig.name,
  }
}
