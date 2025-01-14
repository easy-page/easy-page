import { PageUtil } from '@easy-page/antd-ui'
import { basicInfo, csPromotionSettings } from './fields'
import { applyControl } from './fields/applyControl'
import {
  confirmDialogManager,
  ConfirmDialogManager,
  ConfirmSceneEnum,
  recordInfoField,
  toolbar,
} from '@/common/fields'
import { csBudgetControl } from './fields/budgetControl'
import { BizLineEnum } from '@/common'
import { submitVersion } from '../../fields/submitVersion'
import { anchor } from '../../fields/anchor'
import { bizline } from '../../fields/baseInfo/bizline'
import {
  CommonSgActInviteMap,
  CsActInviteMap,
} from '../../fields/actInvitation/scenes/commonSgInvitation'
import { invitation } from '../../fields/actInvitation'
import { PrimaryTitleEnum } from '../../fields/containers'

const pu = new PageUtil({
  pageId: 'cs-act',
})

pu.addFields([
  recordInfoField('activity.id'),
  bizline(BizLineEnum.ShanGou),
  basicInfo, // 基础信息
  csPromotionSettings,
  csBudgetControl,
  applyControl, // 报名控制
  invitation(CsActInviteMap), // 活动邀请
  toolbar({
    name: '提交并新建活动',
  }), //操作区
  anchor([
    PrimaryTitleEnum.BasicInfo,
    PrimaryTitleEnum.PromotionSettings,
    PrimaryTitleEnum.BudgetControl,
    PrimaryTitleEnum.ApplyControl,
    PrimaryTitleEnum.ActInvite,
  ]),
  confirmDialogManager(
    new ConfirmDialogManager({
      confirmSceneInfo: {
        [ConfirmSceneEnum.ChargeChangeConfirm]: {
          times: 1,
        },
        [ConfirmSceneEnum.CollectStoreChangeConfirm]: {
          times: -1,
        },
      },
    })
  ),
  submitVersion,
])

export const collectPageInfo = pu.getPageInfo()
