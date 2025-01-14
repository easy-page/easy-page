import { ActInfo } from '@/common/apis'
import { ActivityStatusEnum, OperationEnum } from '@/common/constants'
import { Operation } from '../../../Operations'
import { getShowConfig } from '../../utils'

export const confirmAgreement: Operation<ActInfo> = {
  id: OperationEnum.ConfirmAgreement,
  label: '确认协议',
  show: getShowConfig((fullConfig) => {
    return fullConfig.showConfirmAgreementBtn
  }),
  action({ record }) {
    window.open(record?.contractUrl)
  },
  // auth: getAuthConfig((fullConfig) => {
  //   return fullConfig.actWithdrawAuths
  // }),
  auth: [],
}
