import { CanApplyRoleEnum } from '@/common'

import { nodeUtil } from '@easy-page/antd-ui'
import {
  CommonActCrudFormState,
  CommonActCrudFormProps,
  InviteWay,
} from '../../interface'
import { get } from 'lodash'

export const baseApplyRole = () =>
  nodeUtil.createField<
    CanApplyRoleEnum[],
    CommonActCrudFormState,
    CommonActCrudFormProps
  >('canApplyRole', '可报名角色', {
    mode: 'multiple',
    // required: true,
    value: [],
    postprocess: ({ value }) => {
      return {
        'applyControl.canApply': value,
      }
    },
    validate: ({ value }) => {
      if (!value || value.length === 0) {
        return { success: false, errorMsg: '请选择可报名角色' }
      }
      return { success: true }
    },
    actions: [
      {
        effectedKeys: ['dataType'],
        initRun: true,
        action: ({ effectedData }) => {
          const byMerchantBrand =
            effectedData['dataType'] === InviteWay.ByMerchantBrand
          return {
            fieldValue: byMerchantBrand
              ? [CanApplyRoleEnum.BrandOwner]
              : [CanApplyRoleEnum.Merchant, CanApplyRoleEnum.PoiOwner],
            validate: false,
          }
        },
      },
    ],
  })
