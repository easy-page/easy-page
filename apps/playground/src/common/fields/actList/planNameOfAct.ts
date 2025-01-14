import { nodeUtil } from '@easy-page/antd-ui'

const MAX_LENGTH = 26
export const planNameOfAct = nodeUtil.createField<string>(
  'planName',
  '归属方案',
  {
    value: '',
    validate: ({ value }) => {
      if (value?.length >= MAX_LENGTH) {
        return { success: false, errorMsg: `方案名称不超过${MAX_LENGTH}个字符` }
      }
      return { success: true }
    },
    postprocess: ({ value }) => {
      return {
        planName: value || undefined,
      }
    },
  },
  {
    input: {
      placeholder: '请输入方案名称',
      handleChange: ({ onChange, value }) => {
        onChange({ target: { value: value?.trim() || '' } } as any)
      },
    },
  }
)
