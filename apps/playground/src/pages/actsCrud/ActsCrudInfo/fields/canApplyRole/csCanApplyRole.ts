import { CanApplyRoleEnum } from '@/common'
import { nodeUtil } from '@easy-page/antd-ui'

export const csCanApplyRole = nodeUtil
  .createField('canApplyRole', '可报名角色', {
    mode: 'multiple',
    value: [CanApplyRoleEnum.Merchant],
    postprocess: ({ value }) => {
      return {
        'applyControl.canApply': value,
      }
    },
  })
  .appendChildren([
    nodeUtil.createNode(
      CanApplyRoleEnum.Merchant,
      { name: '商家' },
      { checkBox: { disabled: true } }
    ),
  ])
