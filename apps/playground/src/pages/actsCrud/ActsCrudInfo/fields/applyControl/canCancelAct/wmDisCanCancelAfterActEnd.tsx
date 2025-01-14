import {
  CanApplyRoleEnum,
  CanApplyRoleEnumText,
  CanCancelEnum,
  PoiTypeEnum,
} from '@/common'

import { CheckboxEffectedType, nodeUtil } from '@easy-page/antd-ui'
import { CommonActCrudFormProps, CommonActCrudFormState } from '../../interface'
import { get } from 'lodash'

export const wmDisCanCancelAfterActEnd = nodeUtil
  .createField<
    CanApplyRoleEnum[],
    CommonActCrudFormState,
    CommonActCrudFormProps
  >(
    'canCancelAfterActEnd',
    '报名截止后是否可取消',
    {
      mode: 'multiple',
      // required: true,
      value: [CanApplyRoleEnum.Merchant],
      postprocess: ({ value }) => {
        return {
          'applyControl.canCancel': value,
        }
      },
      preprocess({ defaultValues }) {
        return (
          get(defaultValues, 'applyControl.canCancel') || [
            CanApplyRoleEnum.Merchant,
          ]
        )
      },
      actions: [
        {
          effectedKeys: ['canCancel'],
          action: ({ value, effectedData }) => {
            const canCancelBefore = effectedData['canCancel'] || []
            if (
              !canCancelBefore.includes(CanApplyRoleEnum.Merchant) &&
              (value || []).includes(CanApplyRoleEnum.Merchant)
            ) {
              return {
                fieldValue: (value || []).filter(
                  (x) => x !== CanApplyRoleEnum.Merchant
                ),
              }
            }
            return {}
          },
        },
      ],
      validate: ({ value }) => {
        // if (!value || value.length === 0) {
        //   return { success: false, errorMsg: '必选' }
        // }
        return { success: true }
      },
    },
    {
      formItem: {
        tooltip:
          '打开开关代表在报名截止后允许商家/城市经理自主取消活动，关闭开关代表在报名截止后不允许商家/城市经理自主取消活动。',
      },
    }
  )
  .appendChildren([
    nodeUtil.createNode<
      any,
      CommonActCrudFormState,
      CommonActCrudFormProps,
      CheckboxEffectedType
    >(CanApplyRoleEnum.Merchant, {
      name: CanApplyRoleEnumText.poi,
      actions: [
        {
          effectedKeys: ['canCancel'],
          initRun: true,
          action: ({ effectedData }) => {
            const canCancelBefore = effectedData['canCancel'] || []

            return {
              effectResult: {
                checkboxProps: {
                  disabled: !canCancelBefore.includes(
                    CanApplyRoleEnum.Merchant
                  ),
                },
              },
            }
          },
        },
      ],
    }),
    nodeUtil.createNode(
      CanApplyRoleEnum.CityManager,
      {
        name: CanApplyRoleEnumText[CanApplyRoleEnum.CityManager],
      },
      {
        checkBox: {
          disabled: true,
        },
      }
    ),
  ])
