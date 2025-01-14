import {
  ActFullInfo,
  anchorPointToWrongPosition,
  getActivityId,
  needOtherOrgPnAudit,
} from '@/common'
import { needOtherOrgModel } from '@/common/models/needOtherOrgPnAudit'
import { FormUtil } from '@easy-page/antd-ui'
import { message } from 'antd'

/** onSubmit 时候调用 */
export const checkPn = async (
  data: ActFullInfo,
  formUtil: FormUtil<Record<string, any>>
): Promise<boolean> => {
  const { budgetControl = [], budgetApplyReason } = data as ActFullInfo
  console.log('budgetControl:', budgetControl)
  const {
    success,
    data: checkRes,
    msg,
  } = await needOtherOrgModel.loadData(async () => {
    const res = await needOtherOrgPnAudit({
      activityId: getActivityId(),
      pns: budgetControl.map((e) => e.pn),
    })

    return {
      ...res,
      data: {
        needReq: false,
        result: res.data,
      },
    }
  })

  if (!success) {
    message.error(msg)
    return false
  }

  if (checkRes?.result?.needAudit && !budgetApplyReason) {
    message.error(
      '您使用了非本人所在组织 pn 号，将触发非本组 pn 审批流，请您返回配置页填写预算申请理由'
    )
    formUtil.setField('submitVersion', new Date().getTime())
    /** 用于滚动到预算申请理由 */
    setTimeout(() => {
      anchorPointToWrongPosition()
    }, 200)
    return false
  }
  return true
}
