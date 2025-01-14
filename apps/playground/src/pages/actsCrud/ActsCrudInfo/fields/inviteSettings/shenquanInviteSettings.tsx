/** 闪购-神券的邀请设置 */

import { PageUtil, nodeUtil } from '@easy-page/antd-ui'
import { bottomToolbar } from '@/common/fields'
import { ActTypeEnum, ActivitySourceEnum } from '@/common'
import {
  actIdOfSettings,
  actNameOfSettings,
  actStatusOfSettings,
} from './fields'
import {
  shenquanInvitationOfSettingsScene,
  shyInvitationOfSettingsScene,
} from '../actInvitation/scenes/inviteSettings'
import { promotionType } from '../baseInfo'
import { actInviteContainer } from '../containers'

const pu = new PageUtil({ pageId: 'shenquan' })
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
      promotionType(ActTypeEnum.SG_SHEN_QUAN, {
        source: ActivitySourceEnum.Activity,
      }),
      actIdOfSettings(),
      actNameOfSettings(),
      actStatusOfSettings(),
      actInviteContainer().appendChildren([shenquanInvitationOfSettingsScene]),
    ]),

  bottomToolbar({}),
])
export const shenquanInviteSettingsPageInfo = pu.getPageInfo()
