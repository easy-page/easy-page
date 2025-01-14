import { nodeUtil } from '@easy-page/antd-ui'

const MAX_LENGTH = 26
export const actName = nodeUtil.createField<string>(
  'activityName',
  '活动名称',
  {
    value: '',
    // xinghuan 说不用限制。
    // validate: ({ value }) => {
    //   if (value?.length >= MAX_LENGTH) {
    //     return { success: false, errorMsg: `活动名称不超过${MAX_LENGTH}个字符` }
    //   }
    //   return { success: true }
    // },
    postprocess: ({ value }) => {
      return {
        activityName: value || undefined,
      }
    },
  },
  {
    input: {
      placeholder: '请输入活动名称',
      handleChange: ({ onChange, value }) => {
        onChange({ target: { value: value?.trim() || '' } } as any)
      },
    },
  }
)
