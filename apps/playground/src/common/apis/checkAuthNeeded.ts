import { AuthTypeEnum, PolicyTypeEnum } from '../constants'
import { postReq, RequestHandler } from '../libs'

export enum ActCreateTypeEnum {
  // 按折扣活动（3 折以上）
  Discount = 17,
  // 按爆品活动（3 折以下）
  Blockbuster = 56,
}

export type CheckAuthNeedParams = {
  activityType: PolicyTypeEnum
  authTypes: AuthTypeEnum[]
  activityCreateType: ActCreateTypeEnum
}

export type CheckAuthNeedInfo = {
  authType: AuthTypeEnum
  authResult: boolean
}

/**
 * - 判断当补贴金额超过 10 块后，是否要提示权限申请校验
 */
export const checkAuthNeeded: RequestHandler<
  CheckAuthNeedParams,
  CheckAuthNeedInfo[]
> = ({ activityType, authTypes, activityCreateType }) => {
  if (!activityType || !authTypes) {
    return Promise.resolve({ success: true, data: [] })
  }
  let currentActivityType = activityType
  let currentAuthTypes = authTypes
  // 如果包含活动生成方式则动态获取
  if (
    [ActCreateTypeEnum.Blockbuster, ActCreateTypeEnum.Discount].includes(
      activityCreateType
    )
  ) {
    if (activityCreateType === ActCreateTypeEnum.Blockbuster) {
      currentActivityType = PolicyTypeEnum.SKU_BLOCKBUSTER
      currentAuthTypes = [AuthTypeEnum.BlockbusterSuperMtCharge]
    } else if (activityCreateType === ActCreateTypeEnum.Discount) {
      currentActivityType = PolicyTypeEnum.SKU_DISCOUNT
      currentAuthTypes = [AuthTypeEnum.SuperMtCharge]
    }
  }

  return postReq('/api/zspt/operation/act/checkAuthNeeded', {
    activityType: currentActivityType,
    authTypes: currentAuthTypes,
  })
}
