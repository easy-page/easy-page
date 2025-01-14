import { AuthHandlersEnum, AuthUrl } from '@/common'
import {
  AuthActGrayConfig,
  AuthFromBackendConfig,
  AuthInfo,
  AuthSubsidyConfig,
} from '@/common/apis/getConfigList'
import { AuthFromBackendRender } from './AuthFromBackendRender'
import { Field } from './Field'
import { TagRender } from './TagRender'
import { AuthSubsidyRender } from './AuthSubsidyRender'

export const AuthRender = ({
  auths,
}: {
  auths: AuthInfo<Record<string, any>>[]
}) => {
  if (auths.length === 0) {
    return <>-</>
  }
  const authFromBackend = auths.find(
    (x) => x.authHandlerType === AuthHandlersEnum.AuthFromBackEnd
  )
  const authFromBackendOfPlan = auths.find(
    (x) => x.authHandlerType === AuthHandlersEnum.AuthActFromBackEndOfPlan
  )
  const authActCopy = auths.find(
    (x) => x.authHandlerType === AuthHandlersEnum.AuthActCopy
  )
  const authActGray = auths.find(
    (x) => x.authHandlerType === AuthHandlersEnum.AuthActGray
  )
  const authNetFlow = auths.find(
    (x) => x.authHandlerType === AuthHandlersEnum.AuthNetFlow
  )
  const authPlanCopy = auths.find(
    (x) => x.authHandlerType === AuthHandlersEnum.AuthPlanCopy
  )
  const authPlanGray = auths.find(
    (x) => x.authHandlerType === AuthHandlersEnum.AuthPlanGray
  )
  const authSubsidy = auths.find(
    (x) => x.authHandlerType === AuthHandlersEnum.AuthSubsidy
  )
  return (
    <div className="flex flex-col">
      {authFromBackend ? (
        <AuthFromBackendRender
          label="后端接口鉴权"
          config={authFromBackend.config as AuthFromBackendConfig}
        />
      ) : (
        <></>
      )}
      {authFromBackendOfPlan ? (
        <AuthFromBackendRender
          label="活动列表方案鉴权"
          config={authFromBackendOfPlan.config as AuthFromBackendConfig}
        />
      ) : (
        <></>
      )}
      {authActCopy ? (
        <Field
          labelClass={'w-[200px]'}
          label="复制鉴权路径"
          value={AuthUrl.ActCheckAuth}
        />
      ) : (
        <></>
      )}
      {authActGray ? (
        <Field
          label="活动灰度鉴权"
          labelClass={'w-[200px]'}
          value={
            <TagRender
              val={
                ((authActGray.config || {}) as AuthActGrayConfig).ruleCode || []
              }
            />
          }
        />
      ) : (
        <></>
      )}
      {authPlanCopy ? (
        <Field
          labelClass={'w-[200px]'}
          label="方案复制鉴权路径"
          value={AuthUrl.PlanAuth}
        />
      ) : (
        <></>
      )}
      {authPlanGray ? (
        <Field
          label="方案灰度鉴权"
          labelClass={'w-[200px]'}
          value={
            <TagRender
              val={
                ((authPlanGray.config || {}) as AuthActGrayConfig).ruleCode ||
                []
              }
            />
          }
        />
      ) : (
        <></>
      )}
      {authSubsidy ? (
        <AuthSubsidyRender config={authSubsidy?.config as AuthSubsidyConfig} />
      ) : (
        <></>
      )}
      {authNetFlow ? (
        <Field labelClass={'w-[200px]'} label="流量资源鉴权" value={'开启'} />
      ) : (
        <></>
      )}
    </div>
  )
}
