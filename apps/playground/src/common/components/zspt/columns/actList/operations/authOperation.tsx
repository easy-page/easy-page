import { ActInfo, getAuthInfo } from '@/common/apis'
import { AuthUrl, OperationEnum } from '@/common/constants'

import { roleManager } from '@/common/roles/manager'
import { bottomToolbar } from '@/common/fields'
import { nodeUtil } from '@easy-page/antd-ui'
import { Alert, Modal, message } from 'antd'
import {
  actEditAndInviteSettingsAuth,
  cancelActAuth,
  sendActInviteAuth,
} from '@/common/fields'

import { ActAuthInfo, authAct } from '@/common/apis/authAct'
import { Operation } from '../../../Operations'
import { operationAuth } from '../../../OperationAuth'
import { getActAuthOperationConfig } from '@/common/configs'

export const actAuthOperation: Operation<ActInfo> = {
  id: OperationEnum.AuthOperation,
  label: '操作授权',
  show({ record, userInfo }) {
    // 仅创建人、系统管理员可见
    return record.creator === userInfo?.mis || roleManager.isAdmin(userInfo)
  },
  async action(context) {
    const { record } = context
    const authConfigs = getActAuthOperationConfig((fullConfig) => {
      return fullConfig.authOptionsInfo
    })(context)
    const titles = (authConfigs || []).map((e) => `【${e.title}】`).join('、')
    const nodes = (authConfigs || []).map((e) => e.node)
    const authInfo = await getAuthInfo({
      activityId: record.id,
      url: AuthUrl.ActAuth,
    })
    if (!authInfo.success) {
      message.error('获取授权信息失败，请稍后重试！')
      return
    }
    const res = await operationAuth({
      title: '提报活动操作授权',
      defaultValues: authInfo.data?.opAuth?.authResult,
      tips: (
        <Alert
          message={`系统默认提报活动的${titles}仅创建人可操作，如需授权其他人操作，可在下方对应授权入口输入可操作的 mis`}
          type="warning"
          showIcon
          className="flex flex-row items-start mb-4"
          closable={false}
        />
      ),

      nodes: [
        nodeUtil
          .createContainer(
            'content',
            ({ children }) => {
              return <div className="flex flex-col flex-1 ">{children}</div>
            },
            {}
          )
          .appendChildren(nodes),
        bottomToolbar({}),
      ],
    })
    if (res) {
      Modal.confirm({
        centered: true,
        title: '是否确认授权？',
        async onOk() {
          const authRes = await authAct({
            activityId: record.id,
            authInfo: res as ActAuthInfo,
          })
          if (authRes.success) {
            message.success(authRes.msg)
          } else {
            message.success('授权失败，请稍后再试')
          }
        },
      })
    }
  },
  auth: [],
}
