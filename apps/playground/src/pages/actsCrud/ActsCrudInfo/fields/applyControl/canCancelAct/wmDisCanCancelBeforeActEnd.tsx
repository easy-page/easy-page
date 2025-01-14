import {
  CanApplyRoleEnum,
  CanApplyRoleEnumText,
  CanCancelEnum,
  PoiTypeEnum,
} from '@/common'

import { nodeUtil } from '@easy-page/antd-ui'
import { CommonActCrudFormProps, CommonActCrudFormState } from '../../interface'
import { get } from 'lodash'

export const wmDisCanCancelBeforeActEnd = nodeUtil
  .createField<
    CanApplyRoleEnum[],
    CommonActCrudFormState,
    CommonActCrudFormProps
  >(
    'canCancel',
    '报名截止前是否可取消',
    {
      mode: 'multiple',
      // required: true,
      value: [CanApplyRoleEnum.Merchant],
      postprocess: ({ value }) => {
        return {
          'applyControl.canCancelBeforeEndTime': value,
        }
      },
      preprocess({ defaultValues }) {
        return (
          get(defaultValues, 'applyControl.canCancelBeforeEndTime') || [
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
          '打开开关代表在报名截止前允许商家自主取消活动，关闭开关代表在报名截止前不允许商家自主取消活动。',
      },
    }
  )
  .appendChildren([
    nodeUtil.createNode(CanApplyRoleEnum.Merchant, {
      name: CanApplyRoleEnumText.poi,
    }),
  ])
