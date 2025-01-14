import { nodeUtil, UI_COMPONENTS } from '@easy-page/antd-ui'
import { get } from 'lodash'

export const needCheckGray = nodeUtil.createField(
  'needCheckGray',
  '是否需要灰度鉴权',
  {
    value: false,
    postprocess({ value }) {
      return {
        'config.needCheckGray': value,
      }
    },
    preprocess({ defaultValues }) {
      return get(defaultValues, 'config.needCheckGray') ?? false
    },
  },
  {
    ui: UI_COMPONENTS.SWITCH,
  }
)
