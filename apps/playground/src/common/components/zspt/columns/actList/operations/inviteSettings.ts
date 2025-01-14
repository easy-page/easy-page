import { ActInfo } from '@/common/apis'
import { Operation } from '../../../Operations'
import { OperationEnum } from '@/common/constants'
import { getShowConfig } from '../../utils'
import { getAuthConfig } from '../../utils/getAuthConfig'

export const actInviteSettings: Operation<ActInfo> = {
  id: OperationEnum.InviteSettings,
  authOperationKey: OperationEnum.Modify,
  label: '邀请设置',
  show: getShowConfig((fullConfig) => {
    return fullConfig.showActInviteSettingsBtn
  }),
  action({ record, setShowInviteSettings }) {
    setShowInviteSettings?.({ actId: record.id, show: true })
  },
  auth: getAuthConfig((fullConfig) => {
    return fullConfig.actInviteSettingsAuths
  }),
}
