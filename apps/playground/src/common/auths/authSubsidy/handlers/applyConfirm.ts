import { openInUoc } from '@/common/libs'
import { Modal } from 'antd'
import { AuthHandlerRes } from '../../planAndActAuths'
import { ApplyChargeCodeEnum } from '@/common/constants'

export const applyConfirm = (
  authStr: string,
  options?: {
    authCode: number
  }
) => {
  const authCode = options?.authCode || ApplyChargeCodeEnum.CommonCode
  Modal.confirm({
    content: authStr,
    centered: true,
    okText: '去申请',
    onOk: () => {
      openInUoc(
        'sgyx-glzx-qxsq',
        `/shangou/pages/grains/permission/apply?id=${authCode}`
      )
    },
  })
}

export const getFailRes = (): AuthHandlerRes => ({
  allow: false,
  msg: '',
  continueNextResult: 'allow',
  disableErrorToast: true,
})
