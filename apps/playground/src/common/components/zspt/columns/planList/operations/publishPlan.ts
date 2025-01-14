import { PlanInfo, sendPlanInvite } from '@/common/apis'
import {
  authPlanTempAndWhiteListAndSelf,
  AuthSence,
  authWhilteListAndSelf,
} from '@/common/auths'
import { Operation } from '../../../Operations'
import { OperationEnum } from '@/common/constants'
import { BizLineEnum } from '@/common/constants'
import { loadPlanListToModel } from '@/common/models'
import { Modal, message } from 'antd'
import { getShowConfig } from '../../utils'

/** 这个按钮，只有神会员有 */
export const planPublish: Operation<PlanInfo> = {
  id: OperationEnum.PublishPlan,
  authOperationKey: OperationEnum.Send,
  label: '发布方案',
  show: getShowConfig((fullConfig) => {
    return fullConfig.showPublishPlanBtn
  }),
  action({ record }) {
    Modal.confirm({
      centered: true,
      title: '确认发布方案？',
      content: '发布后，提报活动即可绑定此方案中的补贴策略，请确认。',
      cancelText: '取消',
      okText: '确认',
      async onOk() {
        const res = await sendPlanInvite({ planId: record.id })
        if (res.success) {
          message.success('发布方案成功')
          loadPlanListToModel(record.bizLine ?? BizLineEnum.WaiMai, {})
        } else {
          message.error(res.msg || '发布方案失败')
        }
      },
    })
  },
  auth: [authPlanTempAndWhiteListAndSelf(AuthSence.PlanList)],
}
