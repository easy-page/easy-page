import { PlanInfo, authPlan, getAuthInfo } from '@/common/apis'
import { ActAuthInfo } from '@/common/apis/authAct'
import { Operation, operationAuth } from '@/common/components/zspt'
import { getPlanAuthOperationConfig } from '@/common/configs'
import { AuthUrl, OperationEnum } from '@/common/constants'
import { cancel } from '@/common/fields/common/toolbar/cancel'
import { submit } from '@/common/fields/common/toolbar/submit'
import { roleManager } from '@/common/roles/manager'
import { nodeUtil } from '@easy-page/antd-ui'
import { Alert, message, Modal } from 'antd'

export const planAuthOperation: Operation<PlanInfo> = {
  id: OperationEnum.AuthOperation,
  label: '操作授权',
  show({ record, userInfo }) {
    // 仅创建人、系统管理员可见
    return record.creator === userInfo?.mis || roleManager.isAdmin(userInfo)
  },
  async action(context) {
    const { record } = context
    const authConfigs = getPlanAuthOperationConfig((fullConfig) => {
      return fullConfig.authOptionsInfo
    })(context)
    const titles = (authConfigs || []).map((e) => `【${e.title}】`).join('、')
    const nodes = (authConfigs || []).map((e) => e.node)
    const authInfo = await getAuthInfo({
      planId: record.id,
      url: AuthUrl.PlanAuth,
    })

    if (!authInfo.success) {
      message.error('获取授权信息失败，请稍后重试！')
      return Promise.resolve()
    }
    const res = await operationAuth({
      title: '招商方案操作授权',
      tips: (
        <Alert
          message={`系统默认招商方案的${titles}仅创建人可操作，如需授权其他人操作，可在下方对应授权入口输入可操作的 mis`}
          type="warning"
          showIcon
          className="flex flex-row items-start mb-4"
          closable={false}
        />
      ),
      defaultValues: authInfo.data?.opAuth?.authResult,
      nodes: [
        nodeUtil
          .createContainer(
            'content',
            ({ children }) => {
              return <div className="flex flex-col flex-1 "> {children} </div>
            },
            {}
          )
          .appendChildren(nodes),
        nodeUtil
          .createContainer(
            'tool-bar',
            ({ children }) => {
              return (
                <div className="flex flex-row items-center justify-end w-full">
                  {children}
                </div>
              )
            },
            {}
          )
          .appendChildren([cancel, submit({})]),
      ],
    })
    if (res) {
      Modal.confirm({
        centered: true,
        title: '是否确认授权？',
        async onOk() {
          const authRes = await authPlan({
            planId: record.id,
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
    return res
  },
  auth: [],
}
