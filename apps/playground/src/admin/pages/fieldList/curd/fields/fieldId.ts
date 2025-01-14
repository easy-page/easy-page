import { nodeUtil } from '@easy-page/antd-ui'

export const fieldId = nodeUtil.createField(
  'fieldId',
  '字段 ID',
  {
    value: '',
    required: true,
    validate: ({ value }) => {
      if (!value) {
        return { success: false, errorMsg: '请输入字段 ID' }
      }
      return { success: true }
    },
  },
  {
    input: {
      placeholder: '请输入字段 ID',
    },
    formItem: {
      extra:
        '若同一个字段所属层级不一样，则新建一个字段，ID 加上前缀下划线隔开如：subAct_canApplyActCount，字段名加前缀如：【子活动】优惠活动数',
    },
  }
)
