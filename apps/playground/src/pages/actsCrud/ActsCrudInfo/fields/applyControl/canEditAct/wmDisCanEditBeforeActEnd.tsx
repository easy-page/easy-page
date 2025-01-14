import { CanApplyRoleEnum, CanApplyRoleEnumText, PoiTypeEnum } from '@/common'

import { nodeUtil } from '@easy-page/antd-ui'
import { CommonActCrudFormProps, CommonActCrudFormState } from '../../interface'
import { get } from 'lodash'

export const wmDisCanEditBeforeActEnd = nodeUtil
  .createField<
    CanApplyRoleEnum[],
    CommonActCrudFormState,
    CommonActCrudFormProps
  >(
    'canEdit',
    '报名截止前是否可编辑',
    {
      mode: 'multiple',
      // required: true,
      value: [CanApplyRoleEnum.Merchant],
      postprocess: ({ value }) => {
        return {
          'applyControl.canModifyBeforeEndTime': value,
        }
      },
      validate: ({ value }) => {
        // if (!value || value.length === 0) {
        //   return { success: false, errorMsg: '必选' }
        // }
        return { success: true }
      },
      preprocess({ defaultValues }) {
        return (
          get(defaultValues, 'applyControl.canModifyBeforeEndTime') || [
            CanApplyRoleEnum.Merchant,
          ]
        )
      },
      when: {
        effectedKeys: ['poiType'],
        show({ effectedData }) {
          return effectedData['poiType'] === PoiTypeEnum.Agent
        },
      },
    },
    {
      formItem: {
        tooltip:
          '打开开关代表在报名截止前允许商家自主修改活动，关闭开关代表在报名截止前不允许商家自主修改活动。',
      },
    }
  )
  .appendChildren([
    nodeUtil.createNode(CanApplyRoleEnum.Merchant, {
      name: CanApplyRoleEnumText.poi,
    }),
  ])
