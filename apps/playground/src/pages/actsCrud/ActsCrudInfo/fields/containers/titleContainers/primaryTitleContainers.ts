import { createPrimaryTitleContainer } from '@/common/fields'

export enum PrimaryTitleEnum {
  BasicInfo = 'basic-info-container',
  PromotionSettings = 'promotion-settings-container',
  BudgetControl = 'budgetControl-container',
  ApplyControl = 'apply-control-container',
  ActInvite = 'act-invite-container',
  WorkFlow = 'workflow-container',
  SourceInfo = 'source-info-container',
}

export const PrimaryTitleText: Record<PrimaryTitleEnum, String> = {
  [PrimaryTitleEnum.BasicInfo]: '基础信息',
  [PrimaryTitleEnum.PromotionSettings]: '优惠活动设置',
  [PrimaryTitleEnum.BudgetControl]: '预算管控',
  [PrimaryTitleEnum.ApplyControl]: '报名控制',
  [PrimaryTitleEnum.ActInvite]: '活动邀请',
  [PrimaryTitleEnum.WorkFlow]: '提报流程设置',
  [PrimaryTitleEnum.SourceInfo]: '资源位信息',
}


export const baseInfoContainer = () =>
  createPrimaryTitleContainer(PrimaryTitleEnum.BasicInfo, () => '基础信息', {
    childrenClassName: 'pl-2  mt-4',
  })

export const workFlowContainer = () =>
  createPrimaryTitleContainer(PrimaryTitleEnum.WorkFlow, () => '提报流程设置', {
    childrenClassName: 'pl-2  mt-4',
  })

export const sourceInfoContainer = () =>
  createPrimaryTitleContainer(PrimaryTitleEnum.SourceInfo, () => '资源位信息', {
    childrenClassName: 'pl-2  mt-4',
  })

export const promotionSettingsContainer = () =>
  createPrimaryTitleContainer(
    PrimaryTitleEnum.PromotionSettings,
    () => '优惠活动设置',
    {
      childrenClassName: 'pl-2  mt-4',
    }
  )
export const subsidySharingContainer = () =>
  createPrimaryTitleContainer(
    PrimaryTitleEnum.PromotionSettings,
    () => '补贴分担设置',
    {
      childrenClassName: 'pl-2  mt-4',
    }
  )

export const budgetControlContainer = () =>
  createPrimaryTitleContainer(
    PrimaryTitleEnum.BudgetControl,
    () => '预算管控',
    {
      childrenClassName: 'pl-2  mt-4',
    }
  )

export const applyControlContainer = () =>
  createPrimaryTitleContainer(PrimaryTitleEnum.ApplyControl, () => '报名控制', {
    childrenClassName: 'pl-2  mt-4',
  })

export const actInviteContainer = () =>
  createPrimaryTitleContainer(PrimaryTitleEnum.ActInvite, () => '活动邀请', {
    childrenClassName: ' mt-4',
  })
