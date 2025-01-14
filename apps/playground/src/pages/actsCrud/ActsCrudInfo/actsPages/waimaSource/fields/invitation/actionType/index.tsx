import { InviteActionTypeEnum, isEdit } from '@/common'
import { nodeUtil } from '@easy-page/antd-ui'

export const actionType = nodeUtil.createCustomField(
  'invitation.actionType',
  '',
  () => {
    return <></>
  },
  {
    value: InviteActionTypeEnum.NoChange,
    preprocess({ defaultValues }) {
      return defaultValues.actionType
    },
    postprocess({ value }) {
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
