import { nodeUtil, UI_COMPONENTS } from '@easy-page/antd-ui'
import { get } from 'lodash'

export const useNewZsptFramework = nodeUtil.createField(
  'useNewZsptFramework',
  '是否使用新框架',
  {
    value: true,
    postprocess({ value }) {
      return {
        'config.useNewZsptFramework': value,
      }
    },
    preprocess({ defaultValues }) {
      return get(defaultValues, 'config.useNewZsptFramework') ?? false
    },
  },
  {
    ui: UI_COMPONENTS.SWITCH,
  }
)
