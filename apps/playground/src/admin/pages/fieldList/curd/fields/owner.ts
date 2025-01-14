import { singleMisChooseField } from '@/common/fields'
import { nodeUtil } from '@easy-page/antd-ui'

export const owner = nodeUtil.extends(singleMisChooseField('owner', 'Owner'), {
  required: true,
})
