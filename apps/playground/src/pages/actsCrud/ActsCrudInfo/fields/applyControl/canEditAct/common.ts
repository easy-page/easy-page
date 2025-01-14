import { CanApplyRoleEnum } from '@/common/constants'
import { UI_COMPONENTS, nodeUtil } from '@easy-page/antd-ui'
import { get } from 'lodash'

export const canEditAct = nodeUtil.createField<boolean>(
  'canEditAct',
  '是否可编辑活动',
  {
    value: true,
    postprocess: ({ value }) => {
      return {
        'applyControl.canModify': value
          ? [
              CanApplyRoleEnum.Merchant,
              CanApplyRoleEnum.BrandOwner,
              CanApplyRoleEnum.PoiOwner,
            ]
          : [],
      }
    },
    preprocess({ defaultValues }) {
      const canModify = (get(defaultValues, 'applyControl.canModify') ||
        []) as CanApplyRoleEnum
      return canModify.length > 0
    },
  },
  {
    ui: UI_COMPONENTS.SWITCH,
    formItem: {
      tooltip:
        '勾选代表在活动报名截止后允许修改活动报名信息，若开启报名结果审核，修改后需重新审核。（在报名截止前，默认均可修改报名）',
    },
  }
)
