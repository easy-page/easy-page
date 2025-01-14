import { nodeUtil } from '@easy-page/antd-ui'
import { commonCanApplyRole } from './common'
import { CanApplyRoleEnum, isCopy, isCreate } from '@/common'
import { CommonActCrudFormState, InviteWay } from '../interface'
import { baseApplyRole } from './base'
import {
  merchantRoleOption,
  poiOwnerRoleOption,
  brandOwnerRoleOption,
  chainPoiAccountRoleOption,
} from './options'
import { get } from 'lodash'

export const shyCanApplyRole = nodeUtil
  .extends<CanApplyRoleEnum[], CommonActCrudFormState>(baseApplyRole(), {
    required: true,
    actions() {
      return [
        {
          effectedKeys: ['dataType'],
          action: ({ value, effectedData }) => {
            const byMerchantBrand =
              effectedData['dataType'] === InviteWay.ByMerchantBrand
            const canApply = value.length > 0 ? value : undefined
            return {
              fieldValue: byMerchantBrand
                ? []
                : [CanApplyRoleEnum.Merchant, CanApplyRoleEnum.PoiOwner],
              validate: false,
            }
          },
        },
      ]
    },
    validate: () => {
      return ({ value }) => {
        if (!value || value.length === 0) {
          return { success: false, errorMsg: '请选择可报名角色' }
        }
        return { success: true }
      }
    },
    preprocess: () => {
      return ({ defaultValues }) => {
        const dataType = get(defaultValues, 'invitation.dataType')
        const byMerchantBrand = dataType === InviteWay.ByMerchantBrand
        const defaultVal = byMerchantBrand
          ? []
          : [CanApplyRoleEnum.Merchant, CanApplyRoleEnum.PoiOwner]
        return defaultValues?.applyControl?.canApply || defaultVal
      }
    },
  })
  .appendChildren([
    merchantRoleOption, // 商家
    poiOwnerRoleOption, // 门店负责人（BD）
    chainPoiAccountRoleOption, // 连锁商家总账号
    brandOwnerRoleOption, // 品牌负责人（KABD）
  ])
