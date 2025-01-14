import { nodeUtil } from '@easy-page/antd-ui'
import { checkNumberInvalid, handleIdsValue, validateIdFilter } from '@/common'

const MAX_ID_LENGTH = 100

export const inviteBrandIds = nodeUtil.createField(
  'brandIds',
  '业务品牌id',
  {
    value: '',
    validate: ({ value }) => {
      return validateIdFilter(value, MAX_ID_LENGTH, {
        errorMsg: '仅支持输入数字和逗号，多个逗号不可连续出现',
        regexStr: /^\d+(?:[,，]\d+)*[,，]?$/,
      })
    },
    postprocess({ value }) {
      return {
        brandIds: handleIdsValue(value),
      }
    },
    // preprocess({ defaultValues }) {
    //   return Array.isArray(defaultValues[id])
    //     ? defaultValues[id].join(',')
    //     : ''
    // },
  },
  {
    input: {
      placeholder: `最多${MAX_ID_LENGTH}个Id，逗号分隔`,
      allowClear: true,
    },
  }
)
