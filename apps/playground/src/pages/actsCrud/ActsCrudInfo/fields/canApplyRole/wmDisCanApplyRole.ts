import { nodeUtil } from '@easy-page/antd-ui'
import { PoiTypeEnum, CanApplyRoleEnum, ActionTypeEnum } from '@/common'
import { baseApplyRole } from './base'
import {
  brandOwnerRoleOption,
  poiOwnerRoleOption,
  wmDisMerchantRoleOption,
} from './options'
import { cityManagerRoleOption } from './options/cityManager'
import {
  CommonActCrudFormProps,
  CommonActCrudFormState,
  InviteWay,
} from '../interface'

/** - 外卖折扣菜 */
export const wmDisCanApplyRole = nodeUtil.extends<
  CanApplyRoleEnum[],
  CommonActCrudFormState,
  CommonActCrudFormProps
>(
  baseApplyRole().appendChildren([
    wmDisMerchantRoleOption, // 商家
    cityManagerRoleOption, // 合作商CM（城市经理）
    brandOwnerRoleOption, // 品牌负责人（KABD）
  ]),
  {
    required: true,
    preprocess() {
      return ({ defaultValues }) => {
        console.log('defaultValues:胡雪测试', defaultValues)
        return (
          defaultValues?.applyControl?.canApply || [CanApplyRoleEnum.Merchant]
        )
      }
    },
    validate: () => {
      return ({ value }) => {
        if (!value || value.length === 0) {
          return {
            errorMsg: '请选择可报名活动的角色',
            success: false,
          }
        }
        return {
          success: true,
        }
      }
    },
    actions() {
      return [
        {
          effectedKeys: ['chooseOperation', 'dataType'],
          initRun: true,
          action: ({ effectedData }) => {
            const value = effectedData['chooseOperation']
            const isNoChange = value === `${ActionTypeEnum.NoChange}`
            console.log('isNoChangeisNoChange:', isNoChange)
            const byMerchantBrand =
              effectedData['dataType'] === InviteWay.ByMerchantBrand
            const fieldValue = byMerchantBrand
              ? [CanApplyRoleEnum.BrandOwner]
              : [CanApplyRoleEnum.Merchant, CanApplyRoleEnum.PoiOwner]
            if (!isNoChange) {
              return {
                effectResult: {},
                fieldValue: fieldValue,
                validate: false,
              }
            }

            return {
              effectResult: {
                disabled: isNoChange,
              },
              fieldValue: fieldValue,
              validate: false,
            }
          },
        },
      ]
    },
  }
)
