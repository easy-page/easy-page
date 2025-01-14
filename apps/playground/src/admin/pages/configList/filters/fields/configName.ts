import { nodeUtil } from '@easy-page/antd-ui'
import { isEmpty } from 'lodash'

const MAX_LENGTH = 26
export const configName = nodeUtil.createField<string>(
  'name',
  '配置名称',
  {
    value: '',
    validate: ({ value }) => {
      if (value?.length >= MAX_LENGTH) {
        return { success: false, errorMsg: `配置名称不超过${MAX_LENGTH}个字符` }
      }
      return { success: true }
    },
    postprocess({ value }) {
      if (isEmpty(value)) {
        return {}
      }
      return {
        name: value,
      }
    },
  },
  {
    input: {
      placeholder: '请输入配置名称',
    },
  }
)
