import { ConfigId } from '@/admin/common/constant/configDiff'
import { TemplateIdInfo } from '@/common'
import {
  AuthInfo,
  ConfigInfo,
  FactorInfoConfig,
  OperationShowConfig,
} from '@/common/apis/getConfigList'

type DiffResult = {
  changedProps?: Record<string, any>
  changedKeys?: string[]
  hasChanged?: boolean
}

const isSameNormalArr = (ar1: any[], ar2: any[]) => {
  if (ar1.length !== ar2.length) {
    return false
  }
  let same = true
  for (let i = 0; i < ar1.length; i++) {
    if (!ar2.includes(ar1[i])) {
      same = false
      break
    }
  }
  return same
}

const isSameShowConfig = (
  conf1: OperationShowConfig<any, any>,
  conf2: OperationShowConfig<any, any>
) => {
  if (conf1?.show !== conf2?.show) {
    return false
  }
  if (
    !isSameNormalArr(conf1?.showWithStatus || [], conf2?.showWithStatus || [])
  ) {
    console.log(
      'conf1conf1:',
      conf1?.showWithStatus || [],
      conf2?.showWithStatus || []
    )
    return false
  }
  if (!isSameNormalArr(conf1?.tab || [], conf2?.tab || [])) {
    return false
  }
  return true
}

const isSameAuthInfoConfig = (con1: AuthInfo, con2: AuthInfo) => {
  if (con1.authHandlerType !== con1.authHandlerType) {
    return false
  }
  if (con1.config?.ruleCode !== con2.config?.ruleCode) {
    return false
  }
  if (con1.config?.authUrl !== con2.config?.authUrl) {
    return false
  }
  if (con1.config?.sence !== con2.config?.sence) {
    return false
  }
  if (
    !isSameNormalArr(
      con1.config?.checkItems || [],
      con2.config?.checkItems || []
    )
  ) {
    return false
  }
  if (
    !isSameNormalArr(
      con1.config?.resourceIdList || [],
      con2.config?.resourceIdList || []
    )
  ) {
    return false
  }
  if (!isSameNormalArr(con1.config?.auths || [], con2.config?.auths || [])) {
    return false
  }
  return true
}

const isSameAuthArr = (ar1: any[], ar2: any[]) => {
  if (ar1.length !== ar2.length) {
    return false
  }
  let same = true
  for (let i = 0; i < ar1.length; i++) {
    if (!isSameAuthInfoConfig(ar1[i], ar2[i])) {
      same = false
      break
    }
  }
  return same
}

const isSameTemplateInfo = (con1: TemplateIdInfo, con2: TemplateIdInfo) => {
  if (!con1 && !con2) {
    return true
  }
  if (con1?.name !== con2?.name) {
    return false
  }
  if (con1?.prod !== con2?.prod) {
    return false
  }
  if (con1?.test !== con2?.test) {
    return false
  }
  return true
}

const isSameFactorInfo = (con1: FactorInfoConfig, con2: FactorInfoConfig) => {
  if (!isSameNormalArr(con1?.categories || [], con2?.categories || [])) {
    return false
  }
  if (!isSameNormalArr(con1?.factorCodes || [], con2?.factorCodes || [])) {
    return false
  }
  return true
}

export function deepCompareConfig(
  obj1: ConfigInfo,
  obj2: ConfigInfo
): DiffResult {
  const changedProps: Record<string, any> = {}

  const diffValueKeys = [
    ConfigId.ActType,
    ConfigId.PlanType,
    ConfigId.ApplyDefaultRole,
    ConfigId.UseNewFrameworkApplyResPage,
    ConfigId.DisableMerchantBrandOption,
    ConfigId.DisableNoLimitOption,
    ConfigId.ShowInputWayOfInviteSettingsByMerchantOp,
    ConfigId.UseNewZsptFramework,
    ConfigId.UsePlanSendInviteDefaultAction,
    ConfigId.UsePlanWithdrawDefaultAction,
    ConfigId.UsePlanViewDefaultAction,
    ConfigId.NeedCheckGray,
  ]
  diffValueKeys.forEach((x) => {
    if (obj1[x] !== obj2[x]) {
      changedProps[x] = obj2[x]
    }
  })

  // 鉴权普通数组，比如只是字符串
  const diffBaseArray = [
    ConfigId.ResourceIdList,
    ConfigId.AuthActOptionsInfo,
    ConfigId.AuthPlanOptionsInfo,
  ]
  diffBaseArray.forEach((x) => {
    if (!isSameNormalArr((obj1[x] as any[]) || [], (obj2[x] as any[]) || [])) {
      changedProps[x] = obj2[x]
    }
  })

  const diffAuthInfoChangeArr = [
    ConfigId.ActCopyAuths,
    ConfigId.ActEditAuths,
    ConfigId.ActInviteSettingsAuths,
    ConfigId.ActSendInviteAuths,
    ConfigId.ActWithdrawAuths,
    ConfigId.ActPoiConfirmAuths,
    ConfigId.PlanEditBtnAuths,
    ConfigId.PlanCopyBtnAuths,
  ]

  diffAuthInfoChangeArr.forEach((x) => {
    if (!isSameAuthArr((obj1[x] as any) || [], (obj2[x] as any) || [])) {
      changedProps[x] = obj2[x]
    }
  })

  const diffShowConfig = [
    ConfigId.ShowPublishPlanBtn,
    ConfigId.ShowPlanSendInviteBtn,
    ConfigId.ShowJoinPlanBtn,
    ConfigId.ShowPlanApplyResultBtn,
    ConfigId.ShowPlanWithdrawBtn,
    ConfigId.ShowPlanCopyBtn,
    ConfigId.ShowPlanEditBtn,
    ConfigId.ShowActCopyBtn,
    ConfigId.ShowActEditBtn,
    ConfigId.ShowActInviteSettingsBtn,
    ConfigId.ShowActProgressBtn,
    ConfigId.ShowActPoiConfirmBtn,
  ]
  diffShowConfig.forEach((x) => {
    if (!isSameShowConfig(obj1[x] as any, obj2[x] as any)) {
      changedProps[x] = obj2[x]
    }
  })

  if (
    !isSameTemplateInfo(
      obj1['templateInfo'] as any,
      obj2['templateInfo'] as any
    )
  ) {
    changedProps['templateInfo'] = obj2['templateInfo']
  }

  if (
    !isSameFactorInfo(
      obj1['actFactorInfo'] as any,
      obj2['actFactorInfo'] as any
    )
  ) {
    changedProps['actFactorInfo'] = obj2['actFactorInfo']
  }

  const changedKeys = Object.keys(changedProps)
  return {
    changedProps,
    changedKeys: changedKeys,
    hasChanged: changedKeys.length > 0,
  }
}
