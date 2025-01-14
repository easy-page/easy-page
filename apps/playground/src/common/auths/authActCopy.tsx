import { Modal } from 'antd'
import { ActAuthTypeEnum, ActInfo, checkActCopyAuth } from '../apis'
import { AuthHandler } from './planAndActAuths'
import './planAndAct.less'
import { OperationEnum } from '../constants'
import { openInUoc } from '../libs'

const applyConfirm = (authStr: string, authType: ActAuthTypeEnum) => {
  if (authType === ActAuthTypeEnum.Charge) {
    Modal.confirm({
      content: authStr,
      okText: '去申请',
      onOk: () => {
        openInUoc('sgyx-glzx-qxsq', `/shangou/pages/grains/permission/apply`)
      },
    })
  } else {
    Modal.confirm({
      content: authStr,
      okButtonProps: { hidden: true },
    })
  }
}

export const authActCopy: AuthHandler<ActInfo> = async ({ record }) => {
  if (!record.id) {
    return {
      allow: false,
      msg: '缺少活动 ID，无法校验权限',
      continueNextResult: 'allow',
    }
  }
  const result = await checkActCopyAuth({
    opType: OperationEnum.Copy,
    activityId: record.id,
  })
  if (!result.success) {
    return {
      allow: false,
      msg: '网络异常，请稍后重试',
      continueNextResult: 'allow',
    }
  }
  if (result.data?.authResult) {
    // 允许，继续后续权限
    return { allow: true, continueNextResult: 'allow' }
  }
  if (result.data?.reason) {
    applyConfirm(
      result.data?.reason || '',
      result.data?.authType || ActAuthTypeEnum.Charge
    )
    return {
      allow: false,
      continueNextResult: 'allow',
      msg: '无权限操作',
      disableErrorToast: true,
    }
  }

  console.log('未获取理由，也没成功:', result)

  return { allow: false, continueNextResult: 'allow', msg: '无权限操作' }
}
