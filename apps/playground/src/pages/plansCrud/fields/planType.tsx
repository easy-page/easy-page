import { nodeUtil } from '@easy-page/antd-ui'
import { PlanTypeEnum, configListModel, getPlanType } from '@/common'
import { getPlanConfig } from '@/common/configs'

export const planType = nodeUtil.createCustomField<PlanTypeEnum>(
  'planType',
  '方案类型',
  ({ value }) => {
    const { data: allConfigs } = configListModel.getList() || {}
    const config = getPlanConfig({ planType: value, configs: allConfigs })
    return <div>{config.name}</div>
  },
  {
    value: PlanTypeEnum.ShenHuiYuan,
    preprocess() {
      return getPlanType()
    },
    postprocess() {
      return {
        planType: getPlanType(),
      }
    },
  }
)
