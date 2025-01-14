import { nodeUtil } from '@easy-page/antd-ui'
import { get } from 'lodash'

export const actType = nodeUtil.createField(
  'actType',
  '活动类型',
  {
    value: '',
    required: true,
    postprocess({ value }) {
      return {
        'config.actType': value,
      }
    },

    preprocess({ defaultValues }) {
      return get(defaultValues, 'config.actType') || ''
    },
    validate: ({ value }) => {
      if (!value) {
        return { success: false, errorMsg: '请输入' }
      }
      return { success: true }
    },
  },
  {
    input: {
      placeholder: '请输入',
    },
    formItem: {
      extra:
        '同之前的 ActTypeEnum 枚举值，表明某一个活动，如：shen_hui_yuan、single_brand_coupon_unite 等',
    },
  }
)
