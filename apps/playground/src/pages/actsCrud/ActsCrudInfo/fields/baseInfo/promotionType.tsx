import { getActConfig } from '@/common/configs'
import {
  EnvEnum,
  ActTypeEnum,
  ActivitySourceEnum,
  TemplateIdInfo,
} from '@/common/constants'
import { getEnv } from '@/common/libs'
import { configListModel } from '@/common/models/configList'
import { nodeUtil } from '@easy-page/antd-ui'

export const promotionType = (
  actType: ActTypeEnum,
  options?: {
    /** 创建活动来源 */
    source: ActivitySourceEnum
  }
) => {
  return nodeUtil.createCustomField(
    'promotionType',
    '促销类型',
    () => {
      const { data: configs } = configListModel.getList()
      const config =
        getActConfig({ configs, actType })?.templateInfo ||
        ({} as TemplateIdInfo)
      return <div>{config.name}</div>
    },
    {
      value: actType,
      postprocess: () => {
        const { data: configs } = configListModel.getList()
        const config =
          getActConfig({ configs, actType })?.templateInfo ||
          ({} as TemplateIdInfo)

        const isTest = getEnv() === EnvEnum.Test
        const templateId = isTest ? config.test : config.prod
        return {
          templateId: templateId,
          source: options?.source || ActivitySourceEnum.Activity,
          templateInfo: JSON.stringify({
            feProperties: {
              promotionTypeConfig: actType,
            },
          }),
        }
      },
    }
  )
}
