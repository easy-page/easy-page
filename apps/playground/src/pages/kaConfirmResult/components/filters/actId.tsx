import { nodeUtil } from '@easy-page/antd-ui'
import {
  checkNumberInvalid,
  handleIdsValue,
  replaceAll,
  validateIdFilter,
} from '@/common'
import { SearchRuleId } from './constant'

const MAX_ID_LENGTH = 200

export const actIds = nodeUtil.createField(
  SearchRuleId.ActivityIds,
  '活动ID',
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
        [SearchRuleId.ActivityIds]:
          replaceAll(replaceAll(value, ' ', ''), '，', ',') || '',
      }
    },
    preprocess({ defaultValues }) {
      return Array.isArray(defaultValues[SearchRuleId.ActivityIds])
        ? defaultValues[SearchRuleId.ActivityIds].join(',')
        : ''
    },
  },
  {
    input: {
      placeholder: `最多${MAX_ID_LENGTH}个Id，逗号分隔`,
      allowClear: true,
    },
  }
)
