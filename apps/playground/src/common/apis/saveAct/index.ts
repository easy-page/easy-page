import { RequestHandler, postReq } from '@/common/libs'

import { IApplyControl } from './interfaces/applyControl'

import { ActionTypeEnum, ActTypeEnum } from '@/common/constants'
import { reportManager } from '@/common/reporter'
import { isEdit } from '@/common/routes'
import { overWatchEnd } from '@/common/overwatch'
import { ActFullInfo, SaveActParams, SaveActRes } from './interfaces'
import { handleSubsidy } from './utils'
import { handlePoiBuildProduct } from './utils/handlePoiBuildProduct'

/**
 * - 在编辑时，如果展示的不操作，则活动邀请里其他字段不会带上，如果选择操作才带上
 * - 因此这里需要结合添加一下
 *  */
export const prepareDataForEdit = (
  params: ActFullInfo,
  options: {
    detailInfo: ActFullInfo
    /**
     * - 是否在编辑的时候，清理报名控制使用后端的详情数据
     * - 神会员需要
     *  */
    clearApplyControl: boolean
  }
) => {
  if (!isEdit()) {
    return params
  }
  const { detailInfo } = options

  if (params.invitation?.actionType === ActionTypeEnum.NoChange) {
    params.invitation = {
      ...params.invitation,
      ...(detailInfo?.invitation || {}),
      actionType: ActionTypeEnum.NoChange,
    }
    if (options.clearApplyControl) {
      /** 处理下可报名角色 */
      params.applyControl = params.applyControl || ({} as IApplyControl)
      params.applyControl = {
        ...params.applyControl,
        canApply: detailInfo?.applyControl?.canApply,
        canCancel: detailInfo?.applyControl?.canCancel,
        canModify: detailInfo?.applyControl?.canModify,
      }
    }
  }

  return params
}

export const saveAct: RequestHandler<
  SaveActParams & {
    actType: ActTypeEnum
    actDetail?: ActFullInfo
  },
  SaveActRes
> = async ({ actType, actDetail, ...params }) => {
  const res = await postReq(
    '/api/zspt/operation/act/saveAct',
    handlePoiBuildProduct(handleSubsidy(params), actDetail)
  )
  reportManager.sendSaveActEvent({
    bizLine: params.bizLine,
    actType: actType,
    traceid: res.traceid,
    msg: res.msg,
    success: res.success,
  })
  overWatchEnd()
  return res
}

export * from './interfaces'
