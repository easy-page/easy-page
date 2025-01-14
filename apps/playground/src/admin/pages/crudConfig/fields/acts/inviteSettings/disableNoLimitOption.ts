import { nodeUtil, UI_COMPONENTS } from '@easy-page/antd-ui'
import { get } from 'lodash'

export const disableNoLimitOption = nodeUtil.createField(
  'disableNoLimitOption',
  '禁用「选择操作-不限制」选项',
  {
    value: false,
    postprocess({ value }) {
      return {
        'config.disableNoLimitOption': value,
      }
    },
    preprocess({ defaultValues }) {
      return get(defaultValues, 'config.disableNoLimitOption') ?? false
    },
  },
  {
    ui: UI_COMPONENTS.SWITCH,
    formItem: {
      extra: '如果为 true，则禁用「选择操作-不限制」选项禁用。用于【邀请设置】',
    },
  }
)
