import { nodeUtil } from '@easy-page/antd-ui'
import { baseApplyRole } from './base'
import { disMerchantRoleOption } from './options/merchant'
import { CanApplyRoleEnum } from '@/common/constants'
import { get } from 'lodash'

/**
 * - 折扣活动可报名角色
 */
export const disCanApplyRole = nodeUtil.extends<CanApplyRoleEnum[]>(
  baseApplyRole().appendChildren([disMerchantRoleOption]),
  {
    actions: () => {
      return []
    },
    preprocess:
      () =>
      ({ defaultValues }) => {
        const canApply = (get(defaultValues, 'applyControl.canApply') || [
          CanApplyRoleEnum.Merchant,
        ]) as CanApplyRoleEnum[]
        return canApply
      },
    postprocess() {
      return () => {
        return {
          'applyControl.canApply': [CanApplyRoleEnum.Merchant],
        }
      }
    },
  }
)
