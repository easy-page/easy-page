import { nodeUtil, UI_COMPONENTS } from '@easy-page/antd-ui'
import { get } from 'lodash'

export const useNewFrameworkApplyResPage = nodeUtil.createField(
  'useNewFrameworkApplyResPage',
  '是否使用新的报名结果页面',
  {
    value: true,
    postprocess({ value }) {
      return {
        'config.useNewFrameworkApplyResPage': value,
      }
    },
    preprocess({ defaultValues }) {
      return get(defaultValues, 'config.useNewFrameworkApplyResPage') ?? false
    },
  },
  {
    ui: UI_COMPONENTS.SWITCH,
  }
)
