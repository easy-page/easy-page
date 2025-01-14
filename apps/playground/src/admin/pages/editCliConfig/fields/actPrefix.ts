import { nodeUtil } from '@easy-page/antd-ui'
import { get } from 'lodash'
import { EditCliConfigFormState, EditCliConfigFormProps } from '../interface'

export const actPrefix = nodeUtil.createField<
  string,
  EditCliConfigFormState,
  EditCliConfigFormProps
>(
  'actPrefix',
  '活动前缀',
  {
    value: '',
    required: true,
    postprocess({ value }) {
      return {
        'crudConfig.actPrefix': value,
      }
    },
    preprocess({ defaultValues }) {
      return get(defaultValues, 'fullConfig.crudConfig.actPrefix') || ''
    },
    validate: ({ value }) => {
      if (!value) {
        return { success: false, errorMsg: '请输入' }
      }
      return { success: true }
    },
  },
  {
    input: {
      placeholder: '请输入',
    },
    formItem: {
      extra: '如：cs（集合店）、shy（神会员），用于生成字段时使用作为前缀',
    },
  }
)
