import { InviteActionTypeEnum, isCopy, isCreate } from '@/common'
import { nodeUtil } from '@easy-page/antd-ui'

/**
 * - 部分互动无此字段，但是提交的时候需要这个数据，因此放这里
 *  */
export const actionTypeForSubmit = nodeUtil.createCustomField(
  'actionType',
  '',
  () => {
    return <></>
  },
  {
    value: InviteActionTypeEnum.Replace,
    postprocess({ value }) {
      if (!isCreate() && !isCopy()) {
        return {}
      }
      return {
        ['invitation.actionType']: value,
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
