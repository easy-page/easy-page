// import {
//   ConfigListInfo,
//   OperationShowConfig,
// } from '@/common/apis/getConfigList'
// import { ConfigId } from '@/admin/common/constant/configDiff'
// import { isEqual, toNumber } from 'lodash'
// import {
//   ActivityStatusEnum,
//   ActSubTabResources,
//   ActTypeEnum,
//   PlanTypeEnum,
//   PlanTypeText,
// } from '@/common/constants'
// import { PlanConfigs } from '@/common/planConfig'
// import { PlanConfigType } from '@/common/planConfig/interface'
// import { ActConfigs } from '@/common/actConfig'

// /**
//  * - 检查远程配置的和本地的是否一致
//  */
// export const checkActConfig = (local: any, remote: ConfigListInfo) => {
//   const result: {
//     success: boolean
//     localField: any
//     remoteField: any
//     key: string
//   }[] = []
//   const ids = [
//     ConfigId.ResourceIdList,
//     ConfigId.NeedCheckGray,

//     ConfigId.UseNewZsptFramework,
//     ConfigId.ApplyDefaultRole,
//     ConfigId.UseNewFrameworkApplyResPage,
//     ConfigId.ShowInputWayOfInviteSettingsByMerchantOp,
//     ConfigId.DisableNoLimitOption,
//     ConfigId.DisableMerchantBrandOption,
//   ]
//   ids.forEach((each) => {
//     result.push({
//       success: isEqual(Boolean(local[each]), Boolean(remote.config[each])),
//       localField: local[each],
//       remoteField: remote.config[each],
//       key: each,
//     })
//   })

//   const sameTemplateInfo =
//     local.templateInfo.name === remote.config.templateInfo.name &&
//     local.templateInfo.prod === remote.config.templateInfo.prod &&
//     local.templateInfo.test === remote.config.templateInfo.test
//   result.push({
//     success: sameTemplateInfo,
//     localField: local.templateInfo,
//     remoteField: remote.config.templateInfo,
//     key: ConfigId.TemplateInfo,
//   })

//   const sameFactorInfo =
//     isSameArray(
//       local.actFactorInfo?.categories || [],
//       remote.config.actFactorInfo.categories || []
//     ) &&
//     isSameArray(
//       local.actFactorInfo?.factorCodes || [],
//       remote.config.actFactorInfo.factorCodes || []
//     )
//   result.push({
//     success: sameFactorInfo,
//     localField: local.actFactorInfo,
//     remoteField: remote.config.actFactorInfo,
//     key: ConfigId.ActFactorInfo,
//   })

//   const sameActEditBtnShowLogic = sameActShowBtnStatus(
//     local.hideActEditBtnWithSpecialStatus,
//     remote.config.showActEditBtn
//   )

//   result.push({
//     success: sameActEditBtnShowLogic,
//     localField: local.hideActEditBtnWithSpecialStatus,
//     remoteField: remote.config.showActEditBtn,
//     key: ConfigId.ShowActEditBtn,
//   })

//   const sameActCopyBtnShowLogic =
//     local.showActCopyBtn === remote.config.showActCopyBtn?.show

//   result.push({
//     success: sameActCopyBtnShowLogic,
//     localField: local.showActCopyBtn,
//     remoteField: remote.config.showActCopyBtn,
//     key: ConfigId.ShowActCopyBtn,
//   })

//   const sameActInviteSettingsBtnShowLogic = sameActShowBtnStatus(
//     local.hideActInviteSettingsWithSpecialStatus,
//     remote.config.showActInviteSettingsBtn
//   )

//   result.push({
//     success: sameActInviteSettingsBtnShowLogic,
//     localField: local.hideActInviteSettingsWithSpecialStatus,
//     remoteField: remote.config.showActInviteSettingsBtn,
//     key: ConfigId.ShowActInviteSettingsBtn,
//   })

//   result.push({
//     success: isSameDisabled({
//       localDisabled: local.disableProgressBtn,
//       remoteShow: remote.config.showActProgressBtn?.show,
//     }),
//     localField: local.disableProgressBtn,
//     remoteField: remote.config.showActProgressBtn,
//     key: ConfigId.ShowActProgressBtn,
//   })

//   result.push({
//     success: isSameDisabled({
//       localDisabled: local.disablePoiConfirmBtn,
//       remoteShow: remote.config.showActPoiConfirmBtn?.show,
//     }),

//     localField: local.disablePoiConfirmBtn,
//     remoteField: remote.config.showActPoiConfirmBtn,
//     key: ConfigId.ShowActPoiConfirmBtn,
//   })

//   return {
//     name: remote.name,
//     result: result.filter((x) => !x.success),
//   }
// }

// export const isSameDisabled = ({
//   localDisabled,
//   remoteShow,
// }: {
//   localDisabled?: boolean
//   remoteShow?: boolean
// }) => {
//   if (!localDisabled && remoteShow) {
//     return true
//   }
//   return localDisabled === true && !remoteShow
// }

// export const isSameArray = (arr1: any[], arr2: any[]) => {
//   if (arr1?.length !== arr2?.length) {
//     return false
//   }
//   let result = true
//   for (let i = 0; i < arr1.length; i++) {
//     if (!arr2.includes(arr1[i])) {
//       result = false
//       break
//     }
//   }
//   return result
// }

// export const sameActShowBtnStatus = (
//   localHiddenWithSpecialStatus: boolean,
//   remoteShow: OperationShowConfig<ActivityStatusEnum, ActSubTabResources>
// ) => {
//   if (localHiddenWithSpecialStatus) {
//     const remoteShowBtn = remoteShow?.show
//     const remoteShowStatus = remoteShow?.showWithStatus || []
//     return (
//       remoteShowBtn &&
//       isSameArray(remoteShowStatus, [
//         ActivityStatusEnum.Creating,
//         ActivityStatusEnum.Created,
//         ActivityStatusEnum.Pause,
//       ])
//     )
//   } else {
//     const remoteShowBtn = remoteShow?.show
//     const remoteShowStatus = remoteShow?.showWithStatus || []
//     return (
//       remoteShowBtn &&
//       isSameArray(remoteShowStatus, [
//         ActivityStatusEnum.Creating,
//         ActivityStatusEnum.Created,
//         ActivityStatusEnum.Pause,
//         ActivityStatusEnum.Applying,
//         ActivityStatusEnum.TobeActive,
//         ActivityStatusEnum.Active,
//       ])
//     )
//   }
// }

// const getActConfigById = (id: ActTypeEnum, configList: ConfigListInfo[]) => {
//   const remote = configList.find((x) => x.config.actType === id)
//   if (!remote) {
//     throw Error(`未找到远程模板: ${id}`)
//   }
//   return {
//     local: ActConfigs[id],
//     remote: configList.find((x) => x.config.actType === id),
//   }
// }

// const getPlanConfigById = (id: PlanTypeEnum, configList: ConfigListInfo[]) => {
//   const remote = configList.find((x) => x.config.planType === id)
//   if (!remote) {
//     throw Error(`未找到远程模板: ${id}`)
//   }
//   return {
//     local: PlanConfigs[id],
//     remote: configList.find((x) => x.config.planType === id),
//   }
// }

// export const chekAllActConfigs = (configList: ConfigListInfo[]) => {
//   Object.values(ActTypeEnum).forEach((each) => {
//     const { remote, local } = getActConfigById(each, configList)
//     const res = checkActConfig(local, remote)
//     if (res.result.length > 0) {
//       console.log('check all act config res:', res)
//     }
//   })
// }

// const checkPlanConfig = (local: PlanConfigType, remote: ConfigListInfo) => {
//   const result: {
//     success: boolean
//     localField: any
//     remoteField: any
//     key: string
//   }[] = []
//   const ids = [ConfigId.UseNewZsptFramework]
//   ids.forEach((each) => {
//     result.push({
//       success: isEqual(Boolean(local[each]), Boolean(remote.config[each])),
//       localField: local[each],
//       remoteField: remote.config[each],
//       key: each,
//     })
//   })

//   result.push({
//     success: isSameDisabled({
//       localDisabled: local.disablePlanCopyBtn,
//       remoteShow: remote.config.showPlanCopyBtn?.show,
//     }),
//     localField: local.disablePlanCopyBtn,
//     remoteField: remote.config.showPlanCopyBtn,
//     key: ConfigId.ShowPlanCopyBtn,
//   })

//   result.push({
//     success: isSameDisabled({
//       localDisabled: !local.showPublishPlanBtn,
//       remoteShow: remote.config.showPublishPlanBtn?.show,
//     }),
//     localField: local.showPublishPlanBtn,
//     remoteField: remote.config.showPublishPlanBtn,
//     key: ConfigId.ShowPublishPlanBtn,
//   })

//   result.push({
//     success: isSameDisabled({
//       localDisabled: local.disableApplyResultBtn,
//       remoteShow: remote.config.showPlanApplyResultBtn?.show,
//     }),
//     localField: local.disableApplyResultBtn,
//     remoteField: remote.config.showPlanApplyResultBtn,
//     key: ConfigId.ShowPlanApplyResultBtn,
//   })

//   result.push({
//     success: isSameArray(
//       local.showPlanSendInviteBtnWithStatus || [],
//       remote.config.showPlanSendInviteBtn?.showWithStatus || []
//     ),
//     localField: local.showPlanSendInviteBtnWithStatus,
//     remoteField: remote.config.showPlanSendInviteBtn,
//     key: ConfigId.ShowPlanSendInviteBtn,
//   })

//   result.push({
//     success: isSameArray(
//       local.showPlanWithdrawBtnWithPlanStatus || [],
//       remote.config.showPlanWithdrawBtn?.showWithStatus || []
//     ),
//     localField: local.showPlanWithdrawBtnWithPlanStatus,
//     remoteField: remote.config.showPlanWithdrawBtn,
//     key: ConfigId.ShowPlanWithdrawBtn,
//   })

//   result.push({
//     success: !remote.config.usePlanSendInviteDefaultAction,
//     localField: local.handleSendInvite,
//     remoteField: remote.config.usePlanSendInviteDefaultAction,
//     key: ConfigId.UsePlanSendInviteDefaultAction,
//   })

//   result.push({
//     success: !remote.config.usePlanViewDefaultAction,
//     localField: local.handleView,
//     remoteField: remote.config.usePlanViewDefaultAction,
//     key: ConfigId.UsePlanViewDefaultAction,
//   })
//   result.push({
//     success: !remote.config.usePlanWithdrawDefaultAction,
//     localField: local.handleWithdrawPlan,
//     remoteField: remote.config.usePlanWithdrawDefaultAction,
//     key: ConfigId.UsePlanWithdrawDefaultAction,
//   })

//   result.push({
//     success: isSameArray(
//       local.showJoinPlanBtnWithPlanStatus || [],
//       remote.config.showJoinPlanBtn?.showWithStatus || []
//     ),
//     localField: local.showJoinPlanBtnWithPlanStatus,
//     remoteField: remote.config.showJoinPlanBtn,
//     key: ConfigId.ShowJoinPlanBtn,
//   })
//   return {
//     name: remote.name,
//     result: result.filter((x) => !x.success),
//   }
// }

// export const chekAllPlanConfigs = (configList: ConfigListInfo[]) => {
//   Object.keys(PlanTypeText).forEach((each) => {
//     console.log('PlanTypeEnumPlanTypeEnum:', each)
//     const { remote, local } = getPlanConfigById(toNumber(each), configList)
//     const res = checkPlanConfig(local, remote)
//     if (res.result.length > 0) {
//       console.log('check all plan config res:', res)
//     }
//   })
// }
