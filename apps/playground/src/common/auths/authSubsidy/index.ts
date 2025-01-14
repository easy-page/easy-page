import { queryResourceStatus } from '@/common/apis'
import {
  PlanTypeEnum,
  CheckSubsidyItem,
  AuthTypeEnum,
} from '@/common/constants'
import { AuthHandler } from '../planAndActAuths'
import { CheckHandlers } from './handlers'
import { sortAuthItems } from './utils'
import { getFailRes } from './handlers/applyConfirm'

/**
 * 灰度权限检查，暂时主要检查的是活动，只有对应活动才需要
 * @param param0
 */
export const authSubsidy: <
  T extends {
    creator: string
    planCreator?: string
    planId?: number
    templateId?: number
    id?: number
    activityId?: number
    planType?: PlanTypeEnum
  }
>(options: {
  checkItems: CheckSubsidyItem[]
  resourceIdList: AuthTypeEnum[]
}) => AuthHandler<T> =
  ({ checkItems, resourceIdList }) =>
  async ({ record }) => {
    if (
      !resourceIdList ||
      resourceIdList.length === 0 ||
      checkItems.length === 0
    ) {
      return { allow: true, continueNextResult: 'allow' }
    }

    const res = await queryResourceStatus({
      resourceIdList: resourceIdList,
    })

    if (!res.success) {
      // 不成功，阻止，并弹窗提示
      return {
        allow: false,
        msg: res.msg || '检查权限失败，请稍后重试',
        continueNextResult: 'allow',
      }
    }

    let curCheckItems = sortAuthItems(checkItems)
    const failRes = getFailRes()
    curCheckItems = curCheckItems.filter((item) => {
      const checkHandler = CheckHandlers[item]
      if (checkHandler && !checkHandler(res.data)) {
        return false
      }
      return true
    })

    // 表示存在失败的权限，则返回失败结果
    if (curCheckItems.length < checkItems.length) {
      return failRes
    }

    return {
      allow: true,
      msg: '',
      continueNextResult: 'allow',
      disableErrorToast: false,
    }
  }
