import { ConfigInfo, ConfigListInfo } from '@/common/apis/getConfigList'
import {
  ActTypeEnum,
  BizLineEnum,
  ConfigEnv,
  EnvEnum,
} from '@/common/constants'
import { getEnv } from '@/common/libs'

export type ConfigFullInfo = ConfigInfo & {
  bizLine: BizLineEnum
  name: string
  env: ConfigEnv
}

export const getZsptActConfig = ({
  actType,
  templateId,
  configs,
}: {
  templateId?: number
  actType?: ActTypeEnum

  configs: ConfigListInfo[]
}): ConfigFullInfo => {
  const currentEnv = getEnv()
  const curEnv = currentEnv === EnvEnum.Test ? 'test' : 'prod'

  const fullConfig = configs.find((e) => {
    if (actType) {
      if (currentEnv === EnvEnum.Test) {
        return `${e.config.actType}` === `${actType}`
      }
      if (currentEnv === EnvEnum.St) {
        return `${e.config.actType}` === `${actType}` && e.env === ConfigEnv.ST
      }
      return `${e.config.actType}` === `${actType}` && e.env === ConfigEnv.Prod
    }
    return e.config.templateInfo?.[curEnv] === templateId
  })

  if (!fullConfig || !fullConfig.config) {
    console.warn(`未获取到活动配置，请联系相关同学: 活动类型：${actType}`)
    return {} as ConfigFullInfo
  }

  return {
    ...fullConfig.config,
    env: fullConfig?.env,
    bizLine: fullConfig.bizLine,
    name: fullConfig.name,
  }
}
