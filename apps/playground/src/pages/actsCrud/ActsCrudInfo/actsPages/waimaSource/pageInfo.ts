import { PageUtil } from '@easy-page/antd-ui'
import {
  confirmDialogManager,
  ConfirmDialogManager,
  ConfirmSceneEnum,
  recordInfoField,
  toolbar,
} from '@/common/fields'
import { ActTypeEnum, BizLineEnum, toNumber } from '@/common'
import {
  actDesc,
  actionTypeForSubmit,
  actName,
  actPeriod,
  applyControlContainer,
  baseInfoContainer,
  budgetControlContainer,
  canApplyActCount,
  canApplyGoodCount,
  canAudit,
  canEditGoodInfo,
  CanEditGoodInfoOption,
  commonActTimeRange,
  commonApplyReason,
  CommonSgActInviteMap,
  dayStockRange,
  disBudetaryResponsibility,
  disCanCancelAct,
  disCanEditAct,
  disChargeFlowType,
  discountRange,
  disSubsidyInfo,
  endTime,
  getQualify,
  invitation,
  orderLimitRange,
  PeriodTypeEnum,
  priceRange,
  PrimaryTitleEnum,
  promotionQualifyContainer,
  promotionSettingsContainer,
  promotionType,
  ruleDesc,
  subAct,
  subActBasicInfoContainer,
  subActIdForEdit,
  subActPromotionName,
  subActPromotionRulesContainer,
  targetUser,
  weekDays,
  workFlowContainer,
} from '../../fields'
import { submitVersion } from '../../fields/submitVersion'
import { anchor } from '../../fields/anchor'
import { bizline } from '../../fields/baseInfo/bizline'
import { disPoiType } from '../../fields/baseInfo/poiType/disPoiType'
import { disCanApplyRole } from '../../fields/canApplyRole/disCanApplyRole'
import { subActPnLoadState } from '../../fields/subActPnLoadState'
import Big from 'big.js'
import { pnsChangeEffects } from '../../fields/subActs/subActForm/effects'
import { wmsWorkFlow } from './fields/workflow'
import { wmsSourceInfo } from './fields/sourceInfo'
import { wmsInvitation } from './fields/invitation'
import { wmsBasicInfo } from './fields/basicInfo'

const pu = new PageUtil({
  pageId: 'wms-act',
})

pu.addFields([
  recordInfoField('activity.id'),
  bizline(BizLineEnum.ShanGou),
  subActPnLoadState,
  actionTypeForSubmit,
  wmsBasicInfo,
  wmsWorkFlow,
  wmsSourceInfo,
  // 邀请设置
  wmsInvitation(),
  toolbar({
    name: '提交并新建活动',
  }),
  // 操作区
  anchor([
    PrimaryTitleEnum.BasicInfo,
    PrimaryTitleEnum.WorkFlow,
    PrimaryTitleEnum.SourceInfo,
    PrimaryTitleEnum.ActInvite,
  ]),
  // 弹窗管理
  confirmDialogManager(
    new ConfirmDialogManager({
      confirmSceneInfo: {
        [ConfirmSceneEnum.ChargeChangeConfirm]: {
          times: 1,
        },
        [ConfirmSceneEnum.PoiTypeChangeConfirm]: {
          times: 1,
        },
      },
    })
  ),
  submitVersion,
])

export const wmsPageInfo = pu.getPageInfo()
