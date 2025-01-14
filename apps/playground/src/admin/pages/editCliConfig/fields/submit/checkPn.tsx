import { nodeUtil, UI_COMPONENTS } from '@easy-page/antd-ui'
import { get } from 'lodash'

export const checkPn = nodeUtil.createField(
  'needPnCheck',
  '是否校验非本组 PN',
  {
    value: true,
    postprocess({ value }) {
      return {
        'crudConfig.needPnCheck': value,
      }
    },
    preprocess({ defaultValues }) {
      return get(defaultValues, 'fullConfig.crudConfig.needPnCheck') ?? false
    },
  },
  {
    ui: UI_COMPONENTS.SWITCH,
    formItem: {
      // labelCol: { span: 8 },
    },
  }
)
