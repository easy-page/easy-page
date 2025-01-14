import { nodeUtil } from '@easy-page/antd-ui'
import { SearchRuleId } from './constant'

export const actName = nodeUtil.createField<string>(
  SearchRuleId.ActivityName,
  '活动名称',
  {
    value: '',
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
