import {
  ConfigFullInfo,
  getActConfig,
} from '@/common/configs/utils/getActConfigs'
import { OperationShowConfig } from '@/common/apis/getConfigList'
import { OperaitonContext } from '@/common/auths'
import { PlanTypeEnum } from '@/common/constants'
import { getPlanConfig } from '@/common/configs'

const getShowWithStatus = ({
  record,
  config,
}: {
  record: { status: any }
  config: OperationShowConfig<any, any>
}) => {
  if (!config.showWithStatus || config.showWithStatus.length === 0) {
    // 不配置，默认允许
    return true
  }
  return config.showWithStatus.includes(record.status)
}

const getShowWithSubTab = ({
  subTab,
  config,
}: {
  subTab: any
  config: OperationShowConfig<any, any>
}) => {
  if (!config.tab || config.tab.length === 0) {
    // 不配置，默认允许
    return true
  }
  return config.tab.includes(subTab)
}

export const getShowConfig =
  (getConfig: (fullConfig: ConfigFullInfo) => OperationShowConfig<any, any>) =>
  ({
    record,
    configs,
    actSubTab,
    planSubTab,
  }: OperaitonContext<
    {
      templateId?: number
      planType?: PlanTypeEnum
      status: any
    },
    string,
    Record<string, any>
  > & {}) => {
    const isPlan = record.planType !== undefined
    const subTab = isPlan ? planSubTab : actSubTab
    const fullConfig = isPlan
      ? getPlanConfig({
          planType: record.planType,
          configs,
        })
      : getActConfig({ configs, templateId: record?.templateId })
    const config = getConfig(fullConfig)
    if(!config){
      console.warn('未获取到配置：', fullConfig, record, config)
    }
    if (!config?.show) {
      return false
    }
    const showWithStatus = getShowWithStatus({ record, config })
    const showWithSubtab = getShowWithSubTab({ subTab, config })
    return showWithStatus && showWithSubtab
  }
