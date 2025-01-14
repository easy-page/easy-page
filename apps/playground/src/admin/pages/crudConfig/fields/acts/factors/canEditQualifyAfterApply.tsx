import { nodeUtil, UI_COMPONENTS } from '@easy-page/antd-ui'
import { get } from 'lodash'

export const canEditQualifyAfterApply = nodeUtil.createField(
  'canEditQualifyAfterApply',
  '报名后，是否可编辑因子',
  {
    value: false,
    postprocess({ value }) {
      return {
        'config.actFactorInfo.canEditQualifyAfterApply': value,
      }
    },
    preprocess({ defaultValues }) {
      return (
        get(defaultValues, 'config.actFactorInfo.canEditQualifyAfterApply') ??
        false
      )
    },
  },
  {
    ui: UI_COMPONENTS.SWITCH,
    formItem: {
      customExtra: () => (
        <div className="text-red-400">
          如果此选项为 true, 则允许在报名后编辑因子。
        </div>
      ),
    },
  }
)
