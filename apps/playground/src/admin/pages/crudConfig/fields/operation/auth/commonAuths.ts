import { AuthHandlersEnum, AuthHandlersText, ConfigType } from '@/common'
import { AnyNodesInfoType, nodeUtil } from '@easy-page/antd-ui'
import { get } from 'lodash'
import { authInfoFormField } from '../../authInfo'
import {
  auths,
  ruleCode,
  subsidyCheckItems,
  subsidyResourceIdList,
} from '../../authInfo/fields'
import { AuthInfo } from '@/common/apis/getConfigList'

export const authFrombackend = (
  parentId: string,
  options: {
    nodes: AnyNodesInfoType
  }
) =>
  nodeUtil
    .createNode(AuthHandlersEnum.AuthFromBackEnd, {
      name: AuthHandlersText.AuthFromBackEnd,
    })
    .appendChildren([
      authInfoFormField({
        id: AuthHandlersEnum.AuthFromBackEnd,
        name: '',
        parentId: parentId,
        nodes: [auths, ...options.nodes],
      }),
    ])

export const authActFrombackendOfPlan = (
  parentId: string,
  options: {
    nodes: AnyNodesInfoType
  }
) =>
  nodeUtil
    .createNode(AuthHandlersEnum.AuthActFromBackEndOfPlan, {
      name: AuthHandlersText.AuthActFromBackEndOfPlan,
    })
    .appendChildren([
      authInfoFormField({
        id: AuthHandlersEnum.AuthActFromBackEndOfPlan,
        name: '',
        parentId: parentId,
        nodes: [auths, ...options.nodes],
      }),
    ])

export const authActCopy = nodeUtil.createNode(AuthHandlersEnum.AuthActCopy, {
  name: AuthHandlersText.AuthActCopy,
})

export const authPlanGray = (parentId: string) =>
  nodeUtil
    .createNode(AuthHandlersEnum.AuthPlanGray, {
      name: AuthHandlersText.AuthPlanGray,
    })
    .appendChildren([
      authInfoFormField({
        id: AuthHandlersEnum.AuthPlanGray,
        name: '',
        parentId: parentId,
        nodes: [ruleCode(AuthHandlersEnum.AuthPlanGray, '方案灰度开关 Code')],
      }),
    ])

export const authPlanCopy = nodeUtil.createNode(AuthHandlersEnum.AuthPlanCopy, {
  name: AuthHandlersText.AuthPlanCopy,
})

export const authActGray = (parentId: string) =>
  nodeUtil
    .createNode(AuthHandlersEnum.AuthActGray, {
      name: AuthHandlersText.AuthActGray,
    })
    .appendChildren([
      authInfoFormField({
        id: AuthHandlersEnum.AuthActGray,
        name: '',
        parentId: parentId,
        nodes: [ruleCode(AuthHandlersEnum.AuthActGray, '活动灰度开关 Code')],
      }),
    ])

export const authNetflow = nodeUtil.createNode(AuthHandlersEnum.AuthNetFlow, {
  name: AuthHandlersText.AuthNetFlow,
})

export const authSubsidy = (parentId: string) =>
  nodeUtil
    .createNode(AuthHandlersEnum.AuthSubsidy, {
      name: AuthHandlersText.AuthSubsidy,
    })
    .appendChildren([
      authInfoFormField({
        id: AuthHandlersEnum.AuthSubsidy,
        name: '',
        parentId: parentId,
        nodes: [subsidyCheckItems, subsidyResourceIdList],
      }),
    ])

export const commonOpAuths = (
  id: string,
  name: string,
  options: {
    defaultValue: AuthHandlersEnum[]
  }
) =>
  nodeUtil.createField(
    id,
    name,
    {
      mode: 'multiple',
      required: true,
      value: options.defaultValue,
      postprocess({ value }) {
        return {
          [`config.${id}`]: value.map(
            (e) =>
              ({
                authHandlerType: e,
              } as AuthInfo)
          ),
        }
      },
      preprocess({ defaultValues }) {
        const authInfo = get(defaultValues, `config.${id}`) as AuthInfo[]
        if (authInfo) {
          return authInfo.map((e) => e.authHandlerType)
        }
        return options.defaultValue
      },
    },
    {
      layout: {},
    }
  )
