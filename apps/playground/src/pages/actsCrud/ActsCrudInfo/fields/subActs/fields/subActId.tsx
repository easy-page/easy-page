import { isEdit } from '@/common'
import { nodeUtil } from '@easy-page/antd-ui'

export const subActIdForEdit = nodeUtil.createCustomField(
  'subActId',
  '',
  () => {
    return <></>
  },
  {
    value: undefined,
    preprocess({ defaultValues }) {
      console.log('sub idddd:', defaultValues)
      return defaultValues.id
    },
    postprocess({ value }) {
      if (!isEdit()) {
        return {}
      }
      return {
        id: value,
      }
    },
  },
  {
    formItem: {
      noStyle: true,
      className: 'mb-0',
    },
  }
)
