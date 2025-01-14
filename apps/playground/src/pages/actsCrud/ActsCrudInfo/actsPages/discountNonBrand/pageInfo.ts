import { PageUtil } from '@easy-page/antd-ui'
import {
  confirmDialogManager,
  ConfirmDialogManager,
  ConfirmSceneEnum,
  recordInfoField,
  toolbar,
} from '@/common/fields'
import { ActTypeEnum, BizLineEnum, ChargeSideEnum, toNumber } from '@/common'
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
  createGuideContainer,
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
} from '../../fields'
import { submitVersion } from '../../fields/submitVersion'
import { anchor } from '../../fields/anchor'
import { bizline } from '../../fields/baseInfo/bizline'
import { disPoiType } from '../../fields/baseInfo/poiType/disPoiType'
import { disCanApplyRole } from '../../fields/canApplyRole/disCanApplyRole'
import { subActPnLoadState } from '../../fields/subActPnLoadState'
import Big from 'big.js'
import { pnsChangeEffects } from '../../fields/subActs/subActForm/effects'
import {
  createGuide,
  openGuide,
} from '../../fields/promotionSettings/createGuide'
import { disActTimeRange } from '../../fields/baseInfo/actTime/discount'

const pu = new PageUtil({
  pageId: 'dis-act',
})

pu.addFields([
  recordInfoField('activity.id'),
  bizline(BizLineEnum.ShanGou),
  subActPnLoadState,
  actionTypeForSubmit,
  // 基础信息
  baseInfoContainer().appendChildren([
    promotionType(ActTypeEnum.DISCOUNT_NON_BRAND),
    disPoiType,
    disChargeFlowType,

    actName,
    disActTimeRange,
    actPeriod([PeriodTypeEnum.From00, PeriodTypeEnum.From30]),
    weekDays(),
    endTime(),
    actDesc(),
    ruleDesc,
  ]),
  // 优惠活动设置
  promotionSettingsContainer().appendChildren([
    canApplyActCount,
    subAct({
      effects: ({ getFormUtil, childForm }) => [
        {
          changedKeys: ['pns.chargeSidePnform'] as any,
          // 这里有个问题是：每个 pn 挂在时候都会执行一次，但是这里又是批量更新所有子活动
          action: (context) => {
            setTimeout(() => {
              const { value } = context
              const chargeSidePnForms = value?.['pns.chargeSidePnform']

              // 所有 ref 挂载完毕，才允许执行此副作用
              const isLoadDone =
                Object.keys(chargeSidePnForms?.formUtils || {}).length ===
                chargeSidePnForms?.childForms?.length

              // childForm.id
              const parentFormUtil = getFormUtil?.()
              const fullFormData = parentFormUtil?.getOriginFormData() || {}
              const { subActivity, subActPnLoadState } = fullFormData
              const subActIds = (subActivity?.childForms || []).map((e) => e.id)
              const newSubActPnLoadState = {
                ...subActPnLoadState,
                [childForm.id]: isLoadDone,
              }
              const hasLoadedAll = subActIds.every(
                (x) => newSubActPnLoadState[x]
              )

              console.log('执行了否2', hasLoadedAll)

              if (hasLoadedAll) {
                if (!subActPnLoadState[childForm.id] && isLoadDone) {
                  // 最后一个，需要处理
                  parentFormUtil.setField(
                    'subActPnLoadState',
                    newSubActPnLoadState,
                    { validate: false }
                  )
                }
                pnsChangeEffects({ ...context, parentFormUtil })
              } else {
                parentFormUtil.setField(
                  'subActPnLoadState',
                  newSubActPnLoadState,
                  { validate: false }
                )
              }
            }, 0)
          },
        },
        {
          changedKeys: ['meituan.chargeAmt', 'agent.chargeAmt'],
          action({ formUtil }) {
            // 当这两个值变化之后，更新商家补贴百分比
            const mtAmt =
              toNumber(formUtil?.getFieldValue('meituan.chargeAmt')) || 0
            const agentAmt =
              toNumber(formUtil?.getFieldValue('agent.chargeAmt')) || 0
            formUtil?.setFieldsValue({
              ['merchant.chargeAmt']: `${new Big(100)
                .minus(mtAmt)
                .minus(agentAmt)}`,
            })
          },
        },
        {
          changedKeys: ['price', 'discountRate'],
          action({ formUtil }) {
            formUtil.validate(['price', 'discountRate'])
          },
        },
      ],
      nodes: [
        subActIdForEdit,
        subActBasicInfoContainer().appendChildren([
          subActPromotionName(),
          canApplyGoodCount(),
        ]),
        promotionQualifyContainer().appendChildren([
          getQualify({ actType: ActTypeEnum.DISCOUNT_NON_BRAND }),
        ]),
        createGuideContainer().appendChildren([createGuide]),
        subActPromotionRulesContainer().appendChildren([
          discountRange,
          priceRange,
          disSubsidyInfo,
          dayStockRange,
          orderLimitRange,
          targetUser,
        ]),
        confirmDialogManager(
          new ConfirmDialogManager({
            confirmSceneInfo: {
              [ConfirmSceneEnum.MtChargeChangeConfirm]: {
                times: 1,
              },
            },
          })
        ),
      ],
    }),
  ]),
  // 预算管控
  budgetControlContainer().appendChildren([
    disBudetaryResponsibility,
    commonApplyReason,
  ]),

  // 报名控制
  applyControlContainer().appendChildren([
    disCanApplyRole,
    disCanCancelAct,
    disCanEditAct,
    canEditGoodInfo({
      options: [
        CanEditGoodInfoOption.ProductName,
        CanEditGoodInfoOption.ProductWeight,
      ],
    }),
    canAudit,
  ]),
  // 邀请设置
  invitation(CommonSgActInviteMap),
  toolbar({
    name: '提交并新建活动',
  }),
  // 操作区
  anchor([
    PrimaryTitleEnum.BasicInfo,
    PrimaryTitleEnum.PromotionSettings,
    PrimaryTitleEnum.BudgetControl,
    PrimaryTitleEnum.ApplyControl,
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

export const disPageInfo = pu.getPageInfo()
