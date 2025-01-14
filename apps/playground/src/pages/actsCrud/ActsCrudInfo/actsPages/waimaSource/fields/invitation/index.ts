import { getOperationType, OperationType } from '@/common'
import {
  actInviteContainer,
  actionTypeForSubmit,
} from '@/pages/actsCrud/ActsCrudInfo/fields'
import { AnyNodesInfoType } from '@easy-page/antd-ui'
import { wmsInvitationType } from './invitationType'
import { wmsInputWay } from './inputWay'
import { wmsInputId } from './inputData'
import { inputDataOfSelect } from './inputDataOfSelect'

export const wmsInvitation = () => {
  return actInviteContainer().appendChildren([
    wmsInvitationType(),
    wmsInputWay(),
    wmsInputId(),
    inputDataOfSelect
  ])
}
