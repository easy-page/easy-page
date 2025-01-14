import { createPrimaryTitleContainer } from '@/common/fields'

export enum PrimaryTitleEnum {
  BasicInfo = 'basic-info-container',
  ActSettings = 'act-container',
  CliSettings = 'cli-container',
  PlanSettings = 'plan-container',
  CommonSettings = 'common-container',
}

export const PrimaryTitleText: Record<PrimaryTitleEnum, String> = {
  [PrimaryTitleEnum.BasicInfo]: '基础信息',
  [PrimaryTitleEnum.ActSettings]: '活动相关配置',
  [PrimaryTitleEnum.CliSettings]: 'CLI 相关配置',
  [PrimaryTitleEnum.PlanSettings]: '方案相关配置',
  [PrimaryTitleEnum.CommonSettings]: '通用配置',
}

export const baseInfoContainer = () =>
  createPrimaryTitleContainer(PrimaryTitleEnum.BasicInfo, () => '基础信息', {
    childrenClassName: 'pl-2  mt-4',
  })

export const actContainer = () =>
  createPrimaryTitleContainer(
    PrimaryTitleEnum.ActSettings,
    () => '活动相关配置',
    {
      childrenClassName: 'pl-2  mt-4',
    }
  )

export const cliContainer = () =>
  createPrimaryTitleContainer(
    PrimaryTitleEnum.CliSettings,
    () => 'CLI 相关配置',
    {
      childrenClassName: 'pl-2  mt-4',
    }
  )

export const planContainer = () =>
  createPrimaryTitleContainer(
    PrimaryTitleEnum.PlanSettings,
    () => '方案相关配置',
    {
      childrenClassName: 'pl-2  mt-4',
    }
  )

export const commonContainer = () =>
  createPrimaryTitleContainer(
    PrimaryTitleEnum.CommonSettings,
    () => '通用配置',
    {
      childrenClassName: 'pl-2  mt-4',
    }
  )
