import { nodeUtil } from '@easy-page/antd-ui'
import { SearchRuleId } from '../../../constants'
import { checkNumberInvalid, handleIdsValue, validateIdFilter } from '@/common'

const MAX_ID_LENGTH = 500

export const idFilter = (id: SearchRuleId, label: string) =>
  nodeUtil.createField(
    id,
    label,
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
          [id]: handleIdsValue(value),
        }
      },
      preprocess({ defaultValues }) {
        return Array.isArray(defaultValues[id])
          ? defaultValues[id].join(',')
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
