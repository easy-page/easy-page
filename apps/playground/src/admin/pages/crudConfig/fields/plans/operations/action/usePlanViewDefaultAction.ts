import { nodeUtil, UI_COMPONENTS } from '@easy-page/antd-ui'
import { get } from 'lodash'

export const usePlanViewDefaultAction = nodeUtil.createField(
  'usePlanViewDefaultAction',
  '使用默认的方案查看动作',
  {
    value: true,
    postprocess({ value }) {
      return {
        'config.usePlanViewDefaultAction': value,
      }
    },
    preprocess({ defaultValues }) {
      return get(defaultValues, 'config.usePlanViewDefaultAction') ?? true
    },
  },
  {
    ui: UI_COMPONENTS.SWITCH,
    formItem: {
      extra: '若为 true，则使用默认的方案查看动作，否则会提示需要定制处理',
    },
  }
)
