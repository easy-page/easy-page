import { createSecondaryTitleContainer } from '@/common/fields'

export const fieldContainer = () =>
  createSecondaryTitleContainer('field-container', '基本信息')

export const subsidyContainer = () =>
  createSecondaryTitleContainer('sub-subsidy', '补贴相关配置')

export const qualifyContainer = () =>
  createSecondaryTitleContainer('sub-qualify', '因子信息')

export const templateContainer = () =>
  createSecondaryTitleContainer('sub-promotion-rule', '模版信息')

export const inviteSettingsContainer = () =>
  createSecondaryTitleContainer('sub-base-info', '邀请设置')

export const operationContainer = () =>
  createSecondaryTitleContainer('operation-info', '操作相关配置')

export const otherContainer = () =>
  createSecondaryTitleContainer('other-info', '其他配置')

export const submitContainer = () =>
  createSecondaryTitleContainer('submit-info', '提交配置')
