import { PageUtil, nodeUtil } from '@easy-page/antd-ui'
import {
  actIdOfSettings,
  actNameOfSettings,
  actStatusOfSettings,
  promotionTypeOfSettings,
} from './fields'
import { bottomToolbarOfSettings } from './toolbar'
import { invitationOfSettingsScene } from '../actInvitation/scenes/inviteSettings'
import { actInviteContainer } from '../containers'
import { sgInviteTips } from '../actInvitation/fields/sgInviteTips'

const pu = new PageUtil({ pageId: 'common-sg-settings' })
pu.addFields([
  nodeUtil
    .createContainer(
      'content',
      ({ children }) => {
        return <div className="flex flex-col flex-1 ">{children}</div>
      },
      {}
    )
    .appendChildren([
      promotionTypeOfSettings(),
      actIdOfSettings(),
      actNameOfSettings(),
      actStatusOfSettings(),
      actInviteContainer().appendChildren([
        sgInviteTips,
        invitationOfSettingsScene,
      ]),
    ]),

  bottomToolbarOfSettings({}),
])
export const commonInviteSettingsPageInfo = pu.getPageInfo()
