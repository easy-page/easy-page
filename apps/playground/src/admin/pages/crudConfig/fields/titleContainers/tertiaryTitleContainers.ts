import { createTertiaryTitleContainerContainer } from '@/common/fields'

export const opShowContainer = () =>
  createTertiaryTitleContainerContainer('show-op-contaienr', '展示配置')

export const opAuthContainer = () =>
  createTertiaryTitleContainerContainer('op-auth-container', '权限配置', {})

export const opActionContainer = () =>
  createTertiaryTitleContainerContainer('op-action-container', '动作配置', {})
