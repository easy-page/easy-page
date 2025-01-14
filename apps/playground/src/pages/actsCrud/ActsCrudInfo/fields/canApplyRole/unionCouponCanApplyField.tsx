/**
 * - 联盟红包 创建、编辑的时候默认传canApply：['poi']
 */

import { CanApplyRoleEnum } from '@/common'
import { nodeUtil } from '@easy-page/antd-ui'

export const unionCouponCanApplyField = nodeUtil.createCustomField(
  'unionCouponCanApply',
  '',
  () => {
    return <></>
  },
  {
    postprocess({ value }) {
      return {
        'applyControl.canApply': [CanApplyRoleEnum.Merchant],
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
