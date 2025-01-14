import { PageUtil } from '@easy-page/antd-ui'
import { BizLineEnum } from '@/common'
import { confirmDialogManager, recordInfoField, toolbar } from '@/common/fields'
import {
  ConfirmDialogManager,
  ConfirmSceneEnum,
  NO_LIMIT_TIMES,
} from '@/common/fields/common/ConfirmDialogManager/confirmDialogManager'
import {
  applyControl,
  promotionSettingsInfo,
  unionCouponBasicInfo,
  subActId,
  subActName,
  subActOrder,
} from './fields'
import {
  actionTypeForSubmit,
  bizline,
  invitation,
  UnionCouponActInviteMap,
  unionCouponCanApplyField,
  validationRule,
} from '../../fields'

const pu = new PageUtil({ pageId: 'unioncoupon' })

pu.addFields([
  recordInfoField('activity.id'),
  unionCouponCanApplyField,
  unionCouponBasicInfo,
  promotionSettingsInfo, // 优惠活动设置
  applyControl,
  actionTypeForSubmit,
  invitation(UnionCouponActInviteMap),
  subActId,
  subActName,
  subActOrder,
  validationRule,
  bizline(BizLineEnum.ShanGou),
  toolbar({
    name: '提交并新建活动',
  }),
  confirmDialogManager(
    new ConfirmDialogManager({
      confirmSceneInfo: {
        [ConfirmSceneEnum.ShySubsidyPeriod]: {
          times: NO_LIMIT_TIMES,
        },
        [ConfirmSceneEnum.PoiTypeChangeConfirm]: {
          times: 1,
        },
      },
    })
  ),
])

export const unionCouponPageInfo = pu.getPageInfo()
