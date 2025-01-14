import { CanApplyRoleEnum } from '@/common/constants'
import { UI_COMPONENTS, nodeUtil } from '@easy-page/antd-ui'
import { get } from 'lodash'

export const canCancelAct = nodeUtil.createField<boolean>(
  'canCancelAct',
  '是否可取消活动',
  {
    value: true,
    postprocess: ({ value }) => {
      return {
        'applyControl.canCancel': value
          ? [
              CanApplyRoleEnum.Merchant,
              CanApplyRoleEnum.BrandOwner,
              CanApplyRoleEnum.PoiOwner,
            ]
          : [],
      }
    },
    preprocess({ defaultValues }) {
      const canCancel = (get(defaultValues, 'applyControl.canCancel') ||
        []) as CanApplyRoleEnum
      return canCancel.length > 0
    },
  },
  {
    ui: UI_COMPONENTS.SWITCH,
    formItem: {
      tooltip:
        '勾选代表在活动报名截止后也允许该角色自由取消活动。（在报名截止前，默认均可取消报名）',
    },
  }
)
