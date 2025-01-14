/** 神会员的邀请设置 */

import { PageUtil, nodeUtil } from '@easy-page/antd-ui'

import { bottomToolbar } from '@/common/fields'
import {
  actIdOfSettings,
  actNameOfSettings,
  actStatusOfSettings,
} from './fields'
import { shyInvitationOfSettingsScene } from '../actInvitation/scenes/inviteSettings'
import { promotionType } from '../baseInfo'
import { ActTypeEnum, ActivitySourceEnum } from '@/common'
import { actInviteContainer } from '../containers'

const pu = new PageUtil({ pageId: 'shenhuiyuan' })
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
      promotionType(ActTypeEnum.SHEN_HUI_YUAN, {
        source: ActivitySourceEnum.Activity,
      }),
      actIdOfSettings(),
      actNameOfSettings(),
      actStatusOfSettings(),
      actInviteContainer().appendChildren([shyInvitationOfSettingsScene]),
    ]),

  bottomToolbar({}),
])
export const shyInviteSettingsPageInfo = pu.getPageInfo()
