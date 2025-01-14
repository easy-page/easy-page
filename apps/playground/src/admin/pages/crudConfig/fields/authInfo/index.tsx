import {
  AnyNodesInfoType,
  DEFAULT_COMPONENTS,
  EasyPage,
  nodeUtil,
  PageUtil,
} from '@easy-page/antd-ui'
import { AuthInfoFormState, AuthInfoFromProps } from './interface'
import { useMemo } from 'react'
import { get } from 'lodash'
import {
  AuthHandlersEnum,
  AuthHandlersText,
  AuthSence,
  GrayRuleCode,
} from '@/common'
import { ConfigType } from '@/common'
import { AuthInfo } from '@/common/apis/getConfigList'

export type AuthInfoFormProps<Config = Record<string, any>> = {
  id: string
  nodes: AnyNodesInfoType
  defaultValues?: Config
  type: ConfigType
  onChange: (value: Config) => void
}
export const AuthInfoForm = ({
  id,
  nodes,
  type,
  onChange,
  defaultValues,
}: AuthInfoFormProps) => {
  const pageInfo = useMemo(() => {
    const pu = new PageUtil({ pageId: `${id}-auth-info` })
    pu.addFields([
      nodeUtil
        .createContainer(
          `${id}_container`,
          ({ children }) => {
            return (
              <div className="mb-2 bg-[#EDF2FA] px-2 py-1  rounded-md">
                <div className="mb-2 font-medium">{AuthHandlersText[id]}</div>
                <div className="">{children}</div>
              </div>
            )
          }
          // {
          //   fieldUIConfig: {
          //     layout: {
          //       className: 'px-0',
          //     },
          //   },
          // }
        )
        .appendChildren(nodes),
    ])
    return pu.getPageInfo()
  }, [])
  return (
    <EasyPage<AuthInfoFormState, AuthInfoFromProps>
      defaultValues={defaultValues}
      key={`${id}`}
      onChange={({ formUtil }) => {
        const values = formUtil?.getFormData()
        onChange(values)
      }}
      context={{
        type,
      }}
      commonUIConfig={{
        form: {
          labelCol: { span: 6 },
          wrapperCol: { span: 18 },
          // className: ' px-4',
        },
        formItem: {
          colon: false,
          className: 'mb-2',
        },
      }}
      components={{
        ...DEFAULT_COMPONENTS,
      }}
      {...pageInfo}
      pageType="form"
    />
  )
}

export type AuthInfoFormOptions = {
  name: string
  id: string
  parentId: string
  nodes: AnyNodesInfoType
}

const getAuthFormId = (id: string, parentId: string) => `${parentId}_${id}`

export const authInfoFormField = <Config = Record<string, any>,>({
  id,
  nodes,
  name,
  parentId,
}: AuthInfoFormOptions) => {
  const authId = getAuthFormId(id, parentId)
  return nodeUtil.createCustomField<Config>(
    authId,
    name || ' ',
    ({ value, onChange, frameworkProps: { store } }) => {
      const type = store.pageState?.['type'] as ConfigType
      return (
        <AuthInfoForm
          id={id}
          nodes={nodes}
          type={type}
          onChange={onChange}
          defaultValues={value}
        />
      )
    },
    {
      effectedKeys: ['type'],
      postprocess({ value, processedFormData, pageState }) {
        const isAct = pageState['type'] === `${ConfigType.Act}`
        const isAuthFrombackend = [
          AuthHandlersEnum.AuthActFromBackEndOfPlan,
          AuthHandlersEnum.AuthFromBackEnd,
        ].includes(id as any)
        const authInfos = (get(processedFormData, `config.${parentId}`) ||
          []) as AuthInfo[]
        const hasCurAuth = authInfos.find((e) => e.authHandlerType === id)
        let newAuthInfos: AuthInfo[] = [...authInfos]

        const getCurVal = () => {
          if (!isAuthFrombackend) {
            console.log('valuevaluevalue1111:', id, value)
            return value
          }
          console.log('valuevaluevalue:', id, value)
          return {
            ...value,
            sence: isAct ? AuthSence.ActList : AuthSence.PlanList,
          }
        }

        const curVal = getCurVal()

        if (hasCurAuth) {
          newAuthInfos = authInfos.map((e) => {
            if (e.authHandlerType === id) {
              return {
                authHandlerType: id,
                config: curVal,
              }
            }
            return e
          })
        } else {
          newAuthInfos.push({
            authHandlerType: id as AuthHandlersEnum,
            config: curVal,
          })
        }

        return {
          [`config.${parentId}`]: newAuthInfos,
        }
      },
      preprocess({ defaultValues }) {
        const authInfos = (get(defaultValues, `config.${parentId}`) ||
          []) as AuthInfo[]
        const currentConfig =
          authInfos.find((e) => e.authHandlerType === id)?.config || ({} as any)
        const defaultConfig =
          id === AuthHandlersEnum.AuthActGray
            ? {
                ruleCode: [GrayRuleCode.FlowControlGray],
              }
            : {}
        return {
          ...defaultConfig,
          ...currentConfig,
        }
      },
    },
    {
      formItem: { className: 'mb-0' },
    }
  )
}
