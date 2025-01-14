import { ActInfo, sendActInvite } from '@/common/apis'
import {
  ActSubTabResources,
  ActivityStatusEnum,
  OperationEnum,
} from '@/common/constants'
import { getBizLine } from '@/common/libs'
import { loadActListToModel } from '@/common/models'
import { getActFilterType } from '@/common/routes'
import { Modal, message } from 'antd'
import { Operation } from '../../../Operations'
import { DangerouslySetInnerHTML } from '@/common/components/base'
import { getAuthConfig } from '../../utils/getAuthConfig'

// 仅创建人+被授权人可操作；否则，不可操作，点击toast拦截提示：仅创建人及被授权的mis可操作，请联系创建人进行操作授权
export const actSendInvite: Operation<ActInfo> = {
  id: OperationEnum.Send,
  label: '发送邀请',
  show({ record }) {
    const actFilterType = getActFilterType()
    return (
      record.status === ActivityStatusEnum.Created &&
      actFilterType !== ActSubTabResources.Confirm
    )
  },
  action({ record }) {
    Modal.confirm({
      centered: true,
      title: '是否确认发送邀请?',
      content: '',
      okText: '确认',
      cancelText: '取消',
      async onOk() {
        const res = await sendActInvite({ activityId: record.id })
        if (res.success) {
          loadActListToModel({ bizLine: getBizLine() })
          Modal.confirm({
            title: '发送邀请',
            centered: true,
            content: (
              <DangerouslySetInnerHTML>{res.msg}</DangerouslySetInnerHTML>
            ),
            okText: '知道了',
            cancelButtonProps: {
              hidden: true,
            },
            // onOk() {
            //   loadActListToModel({ bizLine: getBizLine(), resetPage: true })
            // },
          })
        } else {
          message.error(res.msg || '发送邀请失败，请稍后再试')
        }
      },
    })
  },
  auth: getAuthConfig((fullConfig) => {
    console.log('fullConfig',fullConfig);
    
    return fullConfig.actSendInviteAuths
  }),
}
