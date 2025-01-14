import { PageUtil, nodeUtil } from '@easy-page/antd-ui'
import { bottomToolbar } from '@/common/fields'
import {
  actIdOfSettings,
  actNameOfSettings,
  actStatusOfSettings,
  promotionTypeOfSettings,
} from './fields'
import { actInviteContainer } from '../containers'
import { wmDiscountInvitationOfSettingsScene } from '../actInvitation/scenes/inviteSettings'
import { poiTypeOfSettings } from './fields/poiType'

const pu = new PageUtil({ pageId: 'wm-discount-settings' })
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
      poiTypeOfSettings(),
      actInviteContainer().appendChildren([
        wmDiscountInvitationOfSettingsScene,
      ]),
    ]),
  bottomToolbar({}),
])
export const wmDiscountInviteSettings = pu.getPageInfo()
