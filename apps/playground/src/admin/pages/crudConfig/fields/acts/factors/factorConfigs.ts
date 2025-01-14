/* eslint-disable no-useless-escape */
import { toJson } from '@/common'
import { nodeUtil, UI_COMPONENTS } from '@easy-page/antd-ui'
import { get } from 'lodash'

export const factorConfigs = nodeUtil.createField(
  'factorConfigs',
  '默认选中因子',
  {
    value: '',
    preprocess({ defaultValues }) {
      const choosed =
        JSON.stringify(
          get(defaultValues, 'config.actFactorInfo.factorConfigs')
        ) || ''

      return choosed
    },
    postprocess: ({ value }) => {
      return {
        'config.actFactorInfo.factorConfigs': toJson(value) || {},
      }
    },
  },
  {
    ui: UI_COMPONENTS.TEXTAREA,
    textArea: {
      placeholder: `
        {
            "sku_quality_score": {
                "defaultValue": "{\"feExtend\":\"{\\\"factorCategoryCode\\\":\\\"sku\\\",\\\"previewInfo\\\":\\\"商品质量-综合分:选择<font color='#FF4A47'>优质</font>商品\\\"}\",\"type\":\"exact_match\",\"value\":\"1\"}",
                "defaultChoosed": true
            }
        }

      `,
      rows: 15,
    },
  }
)
