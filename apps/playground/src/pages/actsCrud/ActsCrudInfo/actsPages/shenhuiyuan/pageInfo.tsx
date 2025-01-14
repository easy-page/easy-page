import { PageUtil } from '@easy-page/antd-ui'
import { shenhuiyuanBasicInfo } from './fields'
import { promotionSettingsInfo } from './fields/promotionSettings'
import { applyControl } from './fields/applyControl'
import { confirmDialogManager, recordInfoField, toolbar } from '@/common/fields'
import { BizLineEnum } from '@/common/constants'
import { subActName, subActOrder, subActId } from './fields/subAct'
import {
  ConfirmDialogManager,
  ConfirmSceneEnum,
  NO_LIMIT_TIMES,
} from '@/common/fields/common/ConfirmDialogManager/confirmDialogManager'
import { actionTypeForSubmit, invitation, validationRule } from '../../fields'
import { bizline } from '../../fields/baseInfo/bizline'
import { ShyActInviteMap } from '../../fields/actInvitation/scenes/shyCommonSgInvitation'

const pu = new PageUtil({ pageId: 'shenhuiyuan' })

pu.addFields([
  recordInfoField('activity.id'),

  shenhuiyuanBasicInfo,
  promotionSettingsInfo,
  applyControl,
  actionTypeForSubmit,
  invitation(ShyActInviteMap),
  subActId,
  subActName,
  subActOrder,
  validationRule,
  bizline(BizLineEnum.WaiMai),
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

export const shenhuiyuanPageInfo = pu.getPageInfo()
console.log('shenhuiyuanPageInfo:', shenhuiyuanPageInfo)
