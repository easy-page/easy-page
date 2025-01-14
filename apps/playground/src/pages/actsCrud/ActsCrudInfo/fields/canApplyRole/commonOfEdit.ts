import { nodeUtil } from '@easy-page/antd-ui'
import { commonCanApplyRole } from './common'
import { ActionTypeEnum, CanApplyRoleEnum } from '@/common'
import {
  CommonActCrudFormProps,
  CommonActCrudFormState,
  InviteWay,
} from '../interface'

export const commonCanApplyRoleOfEdit = nodeUtil.extends<
  CanApplyRoleEnum[],
  CommonActCrudFormState,
  CommonActCrudFormProps
>(commonCanApplyRole, {
  actions() {
    return [
      {
        effectedKeys: ['chooseOperation', 'dataType'],
        initRun: true,
        action: ({ effectedData }) => {
          const value = effectedData['chooseOperation']
          const byMerchantBrand =
            effectedData['dataType'] === InviteWay.ByMerchantBrand
          const fieldVal = byMerchantBrand
            ? [CanApplyRoleEnum.BrandOwner]
            : [CanApplyRoleEnum.Merchant, CanApplyRoleEnum.PoiOwner]
          const isNoChange = value === `${ActionTypeEnum.NoChange}`
          if (!isNoChange) {
            return {
              effectResult: {},
              fieldValue: fieldVal,
              validate: false,
            }
          }
          return {
            effectResult: {
              disabled: isNoChange,
            },
            fieldValue: fieldVal,
            validate: false,
          }
        },
      },
    ]
  },
})
