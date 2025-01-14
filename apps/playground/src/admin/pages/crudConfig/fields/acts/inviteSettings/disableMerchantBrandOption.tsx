import { nodeUtil, UI_COMPONENTS } from '@easy-page/antd-ui'
import { get } from 'lodash'

export const disableMerchantBrandOption = nodeUtil.createField(
  'disableMerchantBrandOption',
  '禁用「通过商家品牌邀请」选项',
  {
    value: false,
    postprocess({ value }) {
      return {
        'config.disableMerchantBrandOption': value,
      }
    },
    preprocess({ defaultValues }) {
      return get(defaultValues, 'config.disableMerchantBrandOption') ?? false
    },
  },
  {
    ui: UI_COMPONENTS.SWITCH,
    formItem: {
      customExtra: () => (
        <div className="text-red-400">
          如果此选项为 true, 则禁用「通过商家品牌邀请」选项，用于【邀请设置】
        </div>
      ),
    },
  }
)
