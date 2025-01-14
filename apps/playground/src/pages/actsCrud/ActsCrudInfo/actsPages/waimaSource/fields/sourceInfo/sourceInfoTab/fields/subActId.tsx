import { isEdit } from '@/common'
import { nodeUtil } from '@easy-page/antd-ui'

export const resourceId = nodeUtil.createCustomField(
  'resourceId',
  '',
  () => {
    return <></>
  },
  {
    value: undefined,
    preprocess({ defaultValues }) {
      return defaultValues.resourceId
    },
    postprocess({ value }) {
      if (!isEdit()) {
        return {}
      }
      return {
        resourceId: value,
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
