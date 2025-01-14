import { nodeUtil } from '@easy-page/antd-ui'
import {
  checkNumberInvalid,
  getQueryString,
  handleIdsValue,
  validateIdFilter,
} from '@/common'

const MAX_ID_LENGTH = 100

export const brandId = nodeUtil.createField(
  'brandIds',
  '业务品牌id',
  {
    value: getQueryString('brandId'),
    // validate: ({ value }) => {
    //   return validateIdFilter(value, 1, {
    //     errorMsg: '仅支持输入数字和逗号，多个逗号不可连续出现',
    //     regexStr: /^\d+(?:[,，]\d+)*[,，]?$/,
    //   })
    // },
    // postprocess({ value }) {
    //   return {
    //     brandIds: handleIdsValue(value),
    //   }
    // },
  },
  {
    input: {
      placeholder: `最多${MAX_ID_LENGTH}个Id，逗号分隔`,
      allowClear: true,
      disabled: true,
    },
  }
)
