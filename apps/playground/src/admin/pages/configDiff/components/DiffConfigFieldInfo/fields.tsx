import { ConfigListInfo, FactorInfoConfig } from '@/common/apis/getConfigList'
import { ReactNode } from 'react'
import { DiffColumnInfo } from './interface'
import { ConfigId } from '@/admin/common/constant/configDiff'
import {
  ACTIVITY_STATUS_DESC,
  ActSubTabText,
  AuthActOptionText,
  AuthPlanOptionText,
  AuthTypeText,
  ConfigEnv,
  ConfigEnvText,
  ConfigType,
  PLAN_STATUS_DESC,
  PlanSubTabText,
  TemplateIdInfo,
  ZsptRoleNameAndIdMap,
} from '@/common'
import { TagRender } from './renders/TagRender'
import { AuthRender } from './renders/AuthRender'
import { ShowBtnRender } from './renders/ShowBtnRender'
import { UseDefaultActionRender } from './renders/UseDefaultActionRender'
import { ActFactorInfoRender } from './renders/ActFactorInfoRender'
import { SwitchRender } from './renders/SwitchRender'
import { TemplateInfoRender } from './renders/TemplateInfoRender'
import { Tag } from 'antd'

// 促销类型
export const diffColumnInfos: DiffColumnInfo = {
  [ConfigId.ResourceIdList]: function (data: ConfigListInfo): ReactNode {
    return (
      <TagRender
        val={(data?.config?.resourceIdList || []).map((e) => AuthTypeText[e])}
      />
    )
  },
  [ConfigId.ActCopyAuths]: function (data: ConfigListInfo): ReactNode {
    const auths = data?.config?.actCopyAuths || []
    console.log('authsauths:', data)
    return <AuthRender auths={auths} />
  },
  [ConfigId.ActEditAuths]: function (data: ConfigListInfo): ReactNode {
    const auths = data?.config?.actEditAuths || []
    return <AuthRender auths={auths} />
  },
  [ConfigId.ActInviteSettingsAuths]: function (
    data: ConfigListInfo
  ): ReactNode {
    const auths = data?.config?.actInviteSettingsAuths || []
    return <AuthRender auths={auths} />
  },
  [ConfigId.ActSendInviteAuths]: function (data: ConfigListInfo): ReactNode {
    const auths = data?.config?.actSendInviteAuths || []
    return <AuthRender auths={auths} />
  },
  [ConfigId.ActWithdrawAuths]: function (data: ConfigListInfo): ReactNode {
    const auths = data?.config?.actWithdrawAuths || []
    return <AuthRender auths={auths} />
  },
  [ConfigId.PlanEditBtnAuths]: function (data: ConfigListInfo): ReactNode {
    const auths = data?.config?.planEditBtnAuths || []
    return <AuthRender auths={auths} />
  },
  [ConfigId.PlanCopyBtnAuths]: function (data: ConfigListInfo): ReactNode {
    const auths = data?.config?.planCopyBtnAuths || []
    return <AuthRender auths={auths} />
  },
  [ConfigId.AuthActOptionsInfo]: function (data: ConfigListInfo): ReactNode {
    return (
      <TagRender
        val={(data?.config?.authOptionsInfo || []).map((e) => {
          return data?.type === ConfigType.Act
            ? AuthActOptionText[e]
            : AuthPlanOptionText[e]
        })}
      />
    )
  },
  [ConfigId.AuthPlanOptionsInfo]: function (data: ConfigListInfo): ReactNode {
    return (
      <TagRender
        val={(data?.config?.authOptionsInfo || []).map((e) => {
          return data?.type === ConfigType.Act
            ? AuthActOptionText[e]
            : AuthPlanOptionText[e]
        })}
      />
    )
  },
  [ConfigId.ShowPublishPlanBtn]: function (data: ConfigListInfo): ReactNode {
    return (
      <ShowBtnRender
        statusTextMap={PLAN_STATUS_DESC}
        tabMap={PlanSubTabText}
        value={data?.config?.showPublishPlanBtn}
      />
    )
  },
  [ConfigId.ShowPlanSendInviteBtn]: function (data: ConfigListInfo): ReactNode {
    return (
      <ShowBtnRender
        statusTextMap={PLAN_STATUS_DESC}
        tabMap={PlanSubTabText}
        value={data?.config?.showPlanSendInviteBtn}
      />
    )
  },
  [ConfigId.ShowJoinPlanBtn]: function (data: ConfigListInfo): ReactNode {
    return (
      <ShowBtnRender
        statusTextMap={PLAN_STATUS_DESC}
        tabMap={PlanSubTabText}
        value={data?.config?.showJoinPlanBtn}
      />
    )
  },
  [ConfigId.ShowPlanApplyResultBtn]: function (
    data: ConfigListInfo
  ): ReactNode {
    return (
      <ShowBtnRender
        statusTextMap={PLAN_STATUS_DESC}
        tabMap={PlanSubTabText}
        value={data?.config?.showPlanApplyResultBtn}
      />
    )
  },
  [ConfigId.ShowPlanWithdrawBtn]: function (data: ConfigListInfo): ReactNode {
    return (
      <ShowBtnRender
        statusTextMap={PLAN_STATUS_DESC}
        tabMap={PlanSubTabText}
        value={data?.config?.showPlanWithdrawBtn}
      />
    )
  },
  [ConfigId.ShowPlanCopyBtn]: function (data: ConfigListInfo): ReactNode {
    return (
      <ShowBtnRender
        statusTextMap={PLAN_STATUS_DESC}
        tabMap={PlanSubTabText}
        value={data?.config?.showPlanCopyBtn}
      />
    )
  },
  [ConfigId.ShowPlanEditBtn]: function (data: ConfigListInfo): ReactNode {
    return (
      <ShowBtnRender
        statusTextMap={PLAN_STATUS_DESC}
        tabMap={PlanSubTabText}
        value={data?.config?.showPlanEditBtn}
      />
    )
  },
  [ConfigId.ShowActCopyBtn]: function (data: ConfigListInfo): ReactNode {
    return (
      <ShowBtnRender
        statusTextMap={ACTIVITY_STATUS_DESC}
        tabMap={ActSubTabText}
        value={data?.config?.showActCopyBtn}
      />
    )
  },
  [ConfigId.ShowActEditBtn]: function (data: ConfigListInfo): ReactNode {
    return (
      <ShowBtnRender
        statusTextMap={ACTIVITY_STATUS_DESC}
        tabMap={ActSubTabText}
        value={data?.config?.showActEditBtn}
      />
    )
  },
  [ConfigId.UsePlanSendInviteDefaultAction]: function (
    data: ConfigListInfo
  ): ReactNode {
    return (
      <UseDefaultActionRender
        value={data.config?.usePlanSendInviteDefaultAction}
      />
    )
  },
  [ConfigId.UsePlanWithdrawDefaultAction]: function (
    data: ConfigListInfo
  ): ReactNode {
    return (
      <UseDefaultActionRender
        value={data.config?.usePlanWithdrawDefaultAction}
      />
    )
  },
  [ConfigId.UsePlanViewDefaultAction]: function (
    data: ConfigListInfo
  ): ReactNode {
    return (
      <UseDefaultActionRender value={data.config?.usePlanViewDefaultAction} />
    )
  },
  [ConfigId.ShowActInviteSettingsBtn]: function (
    data: ConfigListInfo
  ): ReactNode {
    return (
      <ShowBtnRender
        statusTextMap={ACTIVITY_STATUS_DESC}
        tabMap={ActSubTabText}
        value={data?.config?.showActInviteSettingsBtn}
      />
    )
  },
  [ConfigId.ShowConfirmAgreement]: function (
    data: ConfigListInfo
  ): ReactNode {
    return (
      <ShowBtnRender
        statusTextMap={ACTIVITY_STATUS_DESC}
        tabMap={ActSubTabText}
        value={data?.config?.showConfirmAgreementBtn}
      />
    )
  },
  [ConfigId.ShowConfirmSku]: function (
    data: ConfigListInfo
  ): ReactNode {
    return (
      <ShowBtnRender
        statusTextMap={ACTIVITY_STATUS_DESC}
        tabMap={ActSubTabText}
        value={data?.config?.showConfirmSkuBtn}
      />
    )
  },
  [ConfigId.ShowActProgressBtn]: function (data: ConfigListInfo): ReactNode {
    return (
      <ShowBtnRender
        statusTextMap={ACTIVITY_STATUS_DESC}
        tabMap={ActSubTabText}
        value={data?.config?.showActProgressBtn}
      />
    )
  },
  [ConfigId.ShowActPoiConfirmBtn]: function (data: ConfigListInfo): ReactNode {
    return (
      <ShowBtnRender
        statusTextMap={ACTIVITY_STATUS_DESC}
        tabMap={ActSubTabText}
        value={data?.config?.showActPoiConfirmBtn}
      />
    )
  },
  [ConfigId.NeedCheckGray]: function (data: ConfigListInfo): ReactNode {
    return <SwitchRender value={data?.config?.needCheckGray} />
  },
  [ConfigId.ApplyDefaultRole]: function (data: ConfigListInfo): ReactNode {
    const role = data?.config?.applyDefaultRole
    return <div>{role ? ZsptRoleNameAndIdMap[role] : '-'}</div>
  },
  [ConfigId.ActFactorInfo]: function (data: ConfigListInfo): ReactNode {
    return (
      <ActFactorInfoRender
        config={data.config?.actFactorInfo || ({} as FactorInfoConfig)}
      />
    )
  },
  [ConfigId.UseNewFrameworkApplyResPage]: function (
    data: ConfigListInfo
  ): ReactNode {
    return <SwitchRender value={data?.config?.useNewFrameworkApplyResPage} />
  },
  [ConfigId.UseNewZsptFramework]: function (data: ConfigListInfo): ReactNode {
    return <SwitchRender value={data?.config?.useNewZsptFramework} />
  },
  [ConfigId.DisableNoLimitOption]: function (data: ConfigListInfo): ReactNode {
    return <SwitchRender value={data?.config?.disableNoLimitOption} />
  },

  [ConfigId.DisableMerchantBrandOption]: function (
    data: ConfigListInfo
  ): ReactNode {
    return <SwitchRender value={data?.config?.disableMerchantBrandOption} />
  },
  [ConfigId.ShowInputWayOfInviteSettingsByMerchantOp]: function (
    data: ConfigListInfo
  ): ReactNode {
    return (
      <SwitchRender
        value={data?.config?.showInputWayOfInviteSettingsByMerchantOp}
      />
    )
  },
  [ConfigId.TemplateInfo]: function (data: ConfigListInfo): ReactNode {
    return (
      <TemplateInfoRender
        config={
          {
            ...(data.config?.templateInfo || {}),
            bizLine: data.bizLine,
          } as TemplateIdInfo
        }
      />
    )
  },
  [ConfigId.ActType]: function (data: ConfigListInfo): ReactNode {
    return <div>{data.config?.actType}</div>
  },
  [ConfigId.PlanType]: function (data: ConfigListInfo): ReactNode {
    return <div>{data.config?.planType}</div>
  },
  [ConfigId.ActPoiConfirmAuths]: function (data: ConfigListInfo): ReactNode {
    const auths = data?.config?.actPoiConfirmAuths || []
    return <AuthRender auths={auths} />
  },
  [ConfigId.Env]: function (data: ConfigListInfo): ReactNode {
    const env = data.env !== undefined ? ConfigEnvText[data.env] : '-'
    return <Tag>{env}</Tag>
  },
  [ConfigId.WhiteList]: function (data: ConfigListInfo): ReactNode {
    return <div>{data.whiteList || '-'}</div>
  },
}
