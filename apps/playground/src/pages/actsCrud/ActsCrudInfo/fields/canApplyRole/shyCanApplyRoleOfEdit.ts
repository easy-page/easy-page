import { nodeUtil } from '@easy-page/antd-ui'
import { get } from 'lodash'
import { commonCanApplyRoleOfEdit } from './commonOfEdit'
import { CanApplyRoleEnum, ActionTypeEnum } from '@/common'
import {
  CommonActCrudFormState,
  CommonActCrudFormProps,
  InviteWay,
} from '../interface'
import { commonCanApplyRole } from './common'
import { baseApplyRole } from './base'
import {
  brandOwnerRoleOption,
  chainPoiAccountRoleOption,
  merchantRoleOption,
  poiOwnerRoleOption,
} from './options'

export const shyCanApplyRoleOfEdit = nodeUtil
  .extends<CanApplyRoleEnum[], CommonActCrudFormState, CommonActCrudFormProps>(
    baseApplyRole(),
    {
      required: true,
      actions() {
        return [
          {
            effectedKeys: ['chooseOperation', 'dataType'],
            initRun: true,
            action: ({  effectedData, pageState }) => {
              const chooseOperation = effectedData['chooseOperation']
              const byMerchantBrand =
                effectedData['dataType'] === InviteWay.ByMerchantBrand
             
              const canApply = get(pageState, 'applyControl.canApply') ||[]
              const fieldVal = byMerchantBrand
                ? []
                : [CanApplyRoleEnum.Merchant, CanApplyRoleEnum.PoiOwner]
              const isReplace =
                chooseOperation === `${ActionTypeEnum.Replace}`

                // 如果是不操作、追加、删除，禁用可报名角色，且回显
              if (!isReplace) {
                return {
                  effectResult: {
                    disabled: true
                  },
                  fieldValue: canApply,
                  validate: false,
                }
              }

              // 整体替换时，不禁用选项，并且默认为创建时逻辑
              return {
                effectResult: {
                  disabled: false,
                },
                fieldValue: fieldVal,
                validate: false,
              }
            },
          },
        ]
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
    }
  )
  .appendChildren([
    merchantRoleOption, // 商家
    poiOwnerRoleOption, // 门店负责人（BD）
    chainPoiAccountRoleOption, // 连锁商家总账号
    brandOwnerRoleOption, // 品牌负责人（KABD）
  ])
