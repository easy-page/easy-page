import { ConfigId } from '@/admin/common/constant/configDiff'
import { AnyNodeInfoType, AnyNodesInfoType, PageUtil } from '@easy-page/antd-ui'
import { actType } from '../crudConfig/fields/acts/actType'
import { resourceIdList } from '../crudConfig/fields/acts/subsidy/resourceIdList'
import {
  actCopyAuths,
  actEditAuths,
  actInviteSettingsAuths,
  actPoiConfirmAuths,
  actSendInviteAuths,
  actWithdrawAuths,
} from '../crudConfig/fields/acts/operations/auth'
import {
  planCopyBtnAuths,
  planEditBtnAuths,
} from '../crudConfig/fields/plans/operations/auth'
import { commonOptions } from '../crudConfig/fields/acts/operations/show'
import { showBtn } from '../crudConfig/fields/operation/show'
import { needCheckGray } from '../crudConfig/fields/others/needCheckGray'
import { applyDefaultRole } from '../crudConfig/fields/others/applyDefaultRole'
import { categories } from '../crudConfig/fields/acts/factors/category'
import { factorCodes } from '../crudConfig/fields/acts/factors/factorCodes'
import { useNewFrameworkApplyResPage } from '../crudConfig/fields/others/useNewFrameworkApplyResPage'
import { useNewZsptFramework } from '../crudConfig/fields/others/useNewZsptFramework'
import { disableNoLimitOption } from '../crudConfig/fields/acts/inviteSettings/disableNoLimitOption'
import { disableMerchantBrandOption } from '../crudConfig/fields/acts/inviteSettings/disableMerchantBrandOption'
import { showInputWayOfInviteSettingsByMerchantOp } from '../crudConfig/fields/acts/inviteSettings/showInputWayOfInviteSettingsByMerchantOp'
import { authPlanOptionsInfo } from '../crudConfig/fields/operation/actions/authPlanOptionsInfo'
import { authActOptionsInfo } from '../crudConfig/fields/operation/actions/authActOptionsInfo'
import { usePlanSendInviteDefaultAction } from '../crudConfig/fields/plans/operations/action/usePlanSendInviteDefaultAction'
import { usePlanWithdrawDefaultAction } from '../crudConfig/fields/plans/operations/action/usePlanWithdrawDefaultAction'
import { usePlanViewDefaultAction } from '../crudConfig/fields/plans/operations/action/usePlanViewDefaultAction'
import { configEnv } from '../crudConfig/fields/baseInfo'
import { whiteList } from '../crudConfig/fields/baseInfo/whiteList'
import { factorConfigs } from '../crudConfig/fields/acts/factors/factorConfigs'

export const getBatchConfigPageInfo = (nodes: AnyNodesInfoType) => {
  const pu = new PageUtil({ pageId: 'batch-config' })
  pu.addFields(nodes)
  return pu.getPageInfo()
}

export const FieldsMap: Partial<
  Record<ConfigId, AnyNodeInfoType | AnyNodesInfoType>
> = {
  [ConfigId.ResourceIdList]: resourceIdList,
  [ConfigId.Env]: configEnv,
  [ConfigId.WhiteList]: whiteList,
  [ConfigId.ActCopyAuths]: actCopyAuths,
  [ConfigId.ActEditAuths]: actEditAuths,
  [ConfigId.ActInviteSettingsAuths]: actInviteSettingsAuths,
  [ConfigId.ActSendInviteAuths]: actSendInviteAuths,
  [ConfigId.ActWithdrawAuths]: actWithdrawAuths,
  [ConfigId.PlanEditBtnAuths]: planEditBtnAuths,
  [ConfigId.PlanCopyBtnAuths]: planCopyBtnAuths,
  [ConfigId.ActPoiConfirmAuths]: actPoiConfirmAuths,

  [ConfigId.ShowPublishPlanBtn]: showBtn(
    'showPublishPlanBtn',
    '展示发布方案按钮',
    {
      ...commonOptions,
      tips: '目前只有神会员方案存在此按钮，其余方案默认关闭',
    }
  ),
  [ConfigId.ShowPlanSendInviteBtn]: showBtn(
    'showPlanSendInviteBtn',
    '展示方案发送邀请按钮',
    commonOptions
  ),
  [ConfigId.ShowJoinPlanBtn]: showBtn(
    'showJoinPlanBtn',
    '展示加入方案按钮',
    commonOptions
  ),
  [ConfigId.ShowPlanApplyResultBtn]: showBtn(
    'showPlanApplyResultBtn',
    '展示方案报名结果页按钮',
    commonOptions
  ),
  [ConfigId.ShowPlanWithdrawBtn]: showBtn(
    'showPlanWithdrawBtn',
    '展示方案撤回按钮',
    commonOptions
  ),
  [ConfigId.ShowPlanCopyBtn]: showBtn(
    'showPlanCopyBtn',
    '展示复制方案按钮',
    commonOptions
  ),
  [ConfigId.ShowPlanEditBtn]: showBtn(
    'showPlanEditBtn',
    '展示编辑方案按钮',
    commonOptions
  ),
  [ConfigId.ShowActCopyBtn]: showBtn(
    'showActCopyBtn',
    '展示活动复制按钮',
    commonOptions
  ),
  [ConfigId.ShowActEditBtn]: showBtn(
    'showActEditBtn',
    '展示活动编辑按钮',
    commonOptions
  ),
  [ConfigId.UsePlanSendInviteDefaultAction]: usePlanSendInviteDefaultAction,
  [ConfigId.UsePlanWithdrawDefaultAction]: usePlanWithdrawDefaultAction,
  [ConfigId.UsePlanViewDefaultAction]: usePlanViewDefaultAction,
  [ConfigId.ShowActInviteSettingsBtn]: showBtn(
    'showActInviteSettingsBtn',
    '展示活动邀请设置按钮',
    commonOptions
  ),
  [ConfigId.ShowConfirmAgreement]: showBtn(
    'showConfirmAgreementBtn',
    '展示确认协议设置按钮',
    commonOptions
  ),
  [ConfigId.ShowConfirmSku]: showBtn(
    'showConfirmSkuBtn',
    '展示确认商品按钮按钮',
    commonOptions
  ),
  [ConfigId.ShowActProgressBtn]: showBtn(
    'showActProgressBtn',
    '展示活动进度按钮',
    {
      ...commonOptions,
      tips: '当开关关闭，则不展示进度按钮，若打开，还需要根据是否有进度节点判断是否展示',
    }
  ),
  [ConfigId.ShowActPoiConfirmBtn]: showBtn(
    'showActPoiConfirmBtn',
    '展示活动合作运营确认按钮',
    commonOptions
  ),
  [ConfigId.NeedCheckGray]: needCheckGray,
  [ConfigId.ApplyDefaultRole]: applyDefaultRole,
  [ConfigId.ActFactorInfo]: [categories, factorCodes, factorConfigs],
  [ConfigId.UseNewFrameworkApplyResPage]: useNewFrameworkApplyResPage,
  [ConfigId.UseNewZsptFramework]: useNewZsptFramework,
  [ConfigId.DisableNoLimitOption]: disableNoLimitOption,
  [ConfigId.DisableMerchantBrandOption]: disableMerchantBrandOption,
  [ConfigId.ShowInputWayOfInviteSettingsByMerchantOp]:
    showInputWayOfInviteSettingsByMerchantOp,
  [ConfigId.AuthPlanOptionsInfo]: authPlanOptionsInfo,
  [ConfigId.AuthActOptionsInfo]: authActOptionsInfo,
}
