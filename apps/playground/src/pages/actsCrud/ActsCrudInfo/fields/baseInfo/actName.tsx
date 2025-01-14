import { isEmptyStr } from '@/common'
import { nodeUtil } from '@easy-page/antd-ui'
import { get } from 'lodash'

const MAX_LENGTH = 64
export const actName = nodeUtil.createField(
  'actName',
  '活动名称',
  {
    required: true,
    preprocess({ defaultValues }) {
      return get(defaultValues, 'activity.name') || ''
    },
    postprocess: ({ value }) => {
      return {
        'activity.name': value,
      }
    },
    validate: ({ value }) => {
      if (isEmptyStr(value)) {
        return {
          success: false,
          errorMsg: '请输入活动名称',
        }
      }
      if (value.length > MAX_LENGTH) {
        return {
          success: false,
          errorMsg: `请输入不超过 ${MAX_LENGTH} 个字`,
        }
      }
      return {
        success: true,
      }
    },
  },
  {
    input: { placeholder: '请输入活动名称', allowClear: true },
    formItem: {
      validateTrigger: 'onBlur',
    },
  }
)
