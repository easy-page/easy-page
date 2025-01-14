import { nodeUtil } from '@easy-page/antd-ui'
import { get } from 'lodash'
import { EditCliConfigFormState, EditCliConfigFormProps } from '../interface'

export const fileName = nodeUtil.createField<
  string,
  EditCliConfigFormState,
  EditCliConfigFormProps
>(
  'fileName',
  '文件夹名',
  {
    value: '',
    required: true,
    postprocess({ value }) {
      return {
        'crudConfig.fileName': value,
      }
    },
    preprocess({ defaultValues }) {
      return get(defaultValues, 'fullConfig.crudConfig.fileName') || ''
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
      extra: 'Cli 创建活动时，顶层文件夹名，如：collectStore',
    },
  }
)
