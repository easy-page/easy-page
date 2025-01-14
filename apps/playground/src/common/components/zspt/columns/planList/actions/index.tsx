import { PlanTypeEnum } from '@/common/constants'
import { PlanOpActionHandler } from './common/interface'
import { handleGodPricePlanView } from './godPrice/handleView'
import { handleBrandSendInvite, handleBrandWithDraw } from './brand'
import { handleGodPriceSendInvite, handleGodPriceWithDraw } from './godPrice'
import { getPlanConfig } from '@/common/configs'
import { PlanActionHandlersEnum } from './common/constant'
import { OperaitonContext } from '@/common/auths'
import { PlanInfo } from '@/common/apis'

/**
 * - 方案列表-查看动作，未匹配配置，则走默认配置
 * - 如果配置了自定义，但未走默认配置，则报错提示需要实现
 *  */
export const PlanViewActionHandlerMap: Partial<
  Record<PlanTypeEnum, PlanOpActionHandler>
> = {
  [PlanTypeEnum.GodPrice]: handleGodPricePlanView,
}

export const PlanWithdrawActionHandlerMap: Partial<
  Record<PlanTypeEnum, PlanOpActionHandler>
> = {
  [PlanTypeEnum.Brand]: handleBrandWithDraw,
  [PlanTypeEnum.GodPrice]: handleGodPriceWithDraw,
}

export const PlanSendInviteActionHandlerMap: Partial<
  Record<PlanTypeEnum, PlanOpActionHandler>
> = {
  [PlanTypeEnum.Brand]: handleBrandSendInvite,
  [PlanTypeEnum.GodPrice]: handleGodPriceSendInvite,
}

const PlanActionHandlersMap: Record<
  PlanActionHandlersEnum,
  Partial<Record<PlanTypeEnum, PlanOpActionHandler>>
> = {
  [PlanActionHandlersEnum.PlanView]: PlanViewActionHandlerMap,
  [PlanActionHandlersEnum.PlanWithdrawView]: PlanWithdrawActionHandlerMap,
  [PlanActionHandlersEnum.PlanSendInvite]: PlanSendInviteActionHandlerMap,
}

const PlanActionSettingMap: Record<PlanActionHandlersEnum, string> = {
  [PlanActionHandlersEnum.PlanView]: 'usePlanViewDefaultAction',
  [PlanActionHandlersEnum.PlanWithdrawView]: 'usePlanWithdrawDefaultAction',
  [PlanActionHandlersEnum.PlanSendInvite]: 'usePlanSendInviteDefaultAction',
}

export const getPlanActionHandler =
  ({
    action,
    defaultAction,
  }: {
    action: PlanActionHandlersEnum
    defaultAction: PlanOpActionHandler
  }) =>
  (context: OperaitonContext<PlanInfo, string, Record<string, any>>) => {
    const { record, configs } = context

    const config = getPlanConfig({ planType: record.planType, configs })
    const settingKey = PlanActionSettingMap[action]
    const useDefaultActionHandler = config[settingKey]

    const handler = PlanActionHandlersMap[action]

    const planHandler = handler[record.planType]

    console.log(
      'useDefaultActionHandler:',
      settingKey,
      useDefaultActionHandler,
      action,
      record,
      handler,
      planHandler
    )
    if (useDefaultActionHandler) {
      // 使用默认的逻辑
      return defaultAction(context)
    }
    if (!handler || !planHandler) {
      // 开关打开，但是没有实现，则提示
      throw Error(`「${action}」未实现，请补充`)
    }
    return planHandler(context)
  }
