import { createSecondaryTitleContainer } from '@/common/fields'

export const subActSubsidyContainer = () =>
  createSecondaryTitleContainer('sub-subsidy', '补贴规则')

export const promotionQualifyContainer = () =>
  createSecondaryTitleContainer('sub-qualify', '报名资质', {
    tooltip: '定义活动对商家和商品的报名资质要求，符合资质的才可进行报名',
  })

/** 引导建品 */
export const createGuideContainer = () =>
  createSecondaryTitleContainer('create-guide', '引导商家建品', {})

export const subActPromotionRulesContainer = () =>
  createSecondaryTitleContainer('sub-promotion-rule', '优惠规则')

export const subActBasicInfoContainer = () =>
  createSecondaryTitleContainer('sub-base-info', '基础信息')
