import { PageUtil } from '@easy-page/antd-ui'
import { ActTypeEnum, BizLineEnum } from '@/common'
import {
  confirmDialogManager,
  ConfirmDialogManager,
  ConfirmSceneEnum,
  recordInfoField,
  toolbar,
} from '@/common/fields'
import {
  actDesc,
  actionTypeForSubmit,
  actName,
  actPeriod,
  applyControlContainer,
  baseInfoContainer,
  belongBizline,
  canApplyGoodCount,
  commonActTimeRange,
  dishDiscountPrice,
  dishDiscountPriceRate,
  dishSaleStock,
  endTime,
  facePeople,
  getQualify,
  invitation,
  limitNumber,
  PeriodTypeEnum,
  priceLimit,
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
  subsidy,
  weekDays,
  wmDisCanAudit,
  wmDisCanCancelAfterActEnd,
  wmDisCanCancelBeforeActEnd,
  wmDisCanEditAfterActEnd,
  wmDisCanEditBeforeActEnd,
} from '../../fields'
import { submitVersion } from '../../fields/submitVersion'
import { anchor } from '../../fields/anchor'
import { bizline } from '../../fields/baseInfo/bizline'
import { wmDisPoiType } from '../../fields/baseInfo/poiType/wmDisPoiType'
import { wmDisInvitationMap } from '../../fields/actInvitation/scenes/wmDisInvitation'
import { activityScene } from '../../fields/baseInfo/activityScene'

const pu = new PageUtil({
  pageId: 'wm-discount',
})

pu.addFields([
  recordInfoField('activity.id'),
  bizline(BizLineEnum.WaiMai),
  actionTypeForSubmit,
  // 基础信息
  baseInfoContainer().appendChildren([
    promotionType(ActTypeEnum.WM_DISCOUNT),
    belongBizline,
    activityScene,
    wmDisPoiType,
    actName,
    commonActTimeRange,
    actPeriod([PeriodTypeEnum.From00, PeriodTypeEnum.From30]),
    weekDays(),
    endTime(),
    actDesc(),
    ruleDesc,
  ]),
  // 优惠活动设置
  promotionSettingsContainer().appendChildren([
    subAct({
      effects: ({ getFormUtil, childForm }) => [
        {
          changedKeys: ['dishDiscountPrice', 'dishDiscountPriceRate'],
          action({ formUtil }) {
            formUtil.validate(['dishDiscountPrice', 'dishDiscountPriceRate'])
          },
        },
      ],
      nodes: [
        subActIdForEdit,
        subActBasicInfoContainer().appendChildren([
          subActPromotionName('展示在报名端，简要说明报名、优惠或品类要求'), // 优惠活动名称
          canApplyGoodCount(), // 可报名商品数
        ]),
        promotionQualifyContainer().appendChildren([
          getQualify({ actType: ActTypeEnum.WM_DISCOUNT }),
        ]),
        // 优惠规则
        subActPromotionRulesContainer().appendChildren([
          dishDiscountPrice, // 菜品折扣价格
          dishDiscountPriceRate, // 菜品折扣率
          priceLimit, // 提报价格限制
          subsidy, // 补贴分摊设置
          dishSaleStock, // 菜品优惠库存
          limitNumber, // 每单限购份数
          facePeople, // 面向人群
        ]),
      ],
    }),
  ]),
  // 报名控制
  applyControlContainer().appendChildren([
    wmDisCanAudit, // 是否需审核报名结果
    wmDisCanCancelBeforeActEnd,
    wmDisCanCancelAfterActEnd,
    wmDisCanEditBeforeActEnd,
    wmDisCanEditAfterActEnd,
  ]),
  // 活动邀请
  invitation(wmDisInvitationMap),
  toolbar({
    name: '提交并新建活动',
  }),
  // 操作区
  anchor([
    PrimaryTitleEnum.BasicInfo,
    PrimaryTitleEnum.PromotionSettings,
    PrimaryTitleEnum.ApplyControl,
    PrimaryTitleEnum.ActInvite,
  ]),
  // 弹窗管理
  confirmDialogManager(
    new ConfirmDialogManager({
      confirmSceneInfo: {
        [ConfirmSceneEnum.PoiTypeChangeConfirm]: {
          times: 1,
        },
      },
    })
  ),
  submitVersion,
])

export const wmDisPageInfo = pu.getPageInfo()
