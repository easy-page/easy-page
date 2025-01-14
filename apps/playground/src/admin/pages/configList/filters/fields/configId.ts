import { checkNumberInvalid } from '@/common/libs'
import { nodeUtil } from '@easy-page/antd-ui'

export const configId = nodeUtil.createField<string>(
  'id',
  '配置 ID',
  {
    value: '',
    postprocess: ({ value }) => ({
      id: value ? Number(value) : undefined,
    }),
  },
  {
    input: {
      placeholder: '仅支持输入数字',
      handleChange: ({ onChange, value }) => {
        if (!value) {
          onChange({ target: { value: value } } as any)
        }
        const res = checkNumberInvalid(value as string, {
          checkNumber: true,
          checkInteger: true,
        })
        if (res.success) {
          onChange({ target: { value: value } } as any)
        }
      },
    },
  }
)
