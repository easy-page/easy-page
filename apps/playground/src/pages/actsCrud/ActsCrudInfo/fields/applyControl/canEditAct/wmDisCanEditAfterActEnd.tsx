import { CanApplyRoleEnum, CanApplyRoleEnumText } from '@/common'

import { nodeUtil } from '@easy-page/antd-ui'
import { CommonActCrudFormProps, CommonActCrudFormState } from '../../interface'
import { get } from 'lodash'

export const wmDisCanEditAfterActEnd = nodeUtil
  .createField<
    CanApplyRoleEnum[],
    CommonActCrudFormState,
    CommonActCrudFormProps
  >(
    'canEditAfterActEnd',
    '报名截止后是否可编辑',
    {
      mode: 'multiple',
      // required: true,
      value: [CanApplyRoleEnum.Merchant],
      postprocess: ({ value }) => {
        return {
          'applyControl.canModify': value,
        }
      },
      actions: [
        {
          effectedKeys: ['canEdit'],
          action: ({ value, effectedData }) => {
            const canEditBefore = effectedData['canEdit'] || []
            if (
              !canEditBefore.includes(CanApplyRoleEnum.Merchant) &&
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
      preprocess({ defaultValues }) {
        return (
          get(defaultValues, 'applyControl.canModify') || [
            CanApplyRoleEnum.Merchant,
          ]
        )
      },
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
          '打开开关代表在报名截止后允许商家/城市经理自主修改活动，关闭开关代表在报名截止后不允许商家/城市经理自主修改活动。',
      },
    }
  )
  .appendChildren([
    nodeUtil.createNode(CanApplyRoleEnum.Merchant, {
      name: CanApplyRoleEnumText.poi,
      actions: [
        {
          effectedKeys: ['canEdit'],
          initRun: true,
          action: ({ value, effectedData }) => {
            const canEditBefore = effectedData['canEdit'] || []

            return {
              effectResult: {
                checkboxProps: {
                  disabled: !canEditBefore.includes(CanApplyRoleEnum.Merchant),
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
