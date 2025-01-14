import { TemplateIdInfo } from '@/common'
import { getActConfig } from '@/common/configs'
import { configListModel } from '@/common/models/configList'
import { nodeUtil } from '@easy-page/antd-ui'
import { get } from 'lodash'

export const promotionTypeOfSettings = () =>
  nodeUtil.createCustomField(
    'promotionType',
    '促销类型',
    ({ value }) => {
      const { data: configs } = configListModel.getList()
      const config =
        getActConfig({ configs, templateId: value })?.templateInfo ||
        ({} as TemplateIdInfo)
      return <div>{config.name}</div>
    },
    {
      value: -1,
      preprocess({ defaultValues }) {
        const templateId = get(defaultValues, 'templateId')
        return templateId
      },
    }
  )
