import { ActInfo } from '@/common/apis'
import { withdrawAct } from '@/common/apis/withdrawAct'
import { authOperationFromBackend } from '@/common/auths'
import { Operation } from '../../../Operations'
import {
  ActivityStatusEnum,
  AuthFromBackendResEnum,
  OperationEnum,
} from '@/common/constants'
import { getBizLine } from '@/common/libs'
import { loadActListToModel } from '@/common/models'
import { Modal, message } from 'antd'
import { getAuthConfig } from '../../utils/getAuthConfig'

const ShowActWithDrawsMap: Record<ActivityStatusEnum, boolean> = {
  [ActivityStatusEnum.Creating]: true,
  [ActivityStatusEnum.Created]: true,
  [ActivityStatusEnum.Inviting]: false,
  [ActivityStatusEnum.Applying]: true,
  [ActivityStatusEnum.TobeActive]: true,
  [ActivityStatusEnum.Active]: true,
  [ActivityStatusEnum.Pause]: true,
  [ActivityStatusEnum.Terminated]: false,
}

export const actWithDraw: Operation<ActInfo> = {
  id: OperationEnum.Withdraw,
  label: '撤回活动',
  show({ record }) {
    return ShowActWithDrawsMap[record.status]
  },
  action({ record }) {
    Modal.confirm({
      centered: true,
      title: '确认要撤回吗？',
      content: (
        <div>
          撤回后不可恢复，请再次确认。
          （撤回后：已报名的不受影响，会继续生效；未报名的不可报名）
        </div>
      ),
      async onOk() {
        const res = await withdrawAct({ activityId: record.id })
        if (res.success) {
          message.success(res.msg || '已完成')
          loadActListToModel({ bizLine: getBizLine() })
        } else {
          message.error(res.msg || '撤回失败，请稍后重试')
        }
      },
    })
  },
  auth: getAuthConfig((fullConfig) => {
    return fullConfig.actWithdrawAuths
  }),
}
