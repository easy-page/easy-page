import {
  ACTIVITY_STATUS_DESC,
  ActivityStatusEnum,
  ActSubTabResources,
  ActSubTabText,
} from '@/common'
import { showBtn, ShowBtnOptions } from '../../../operation/show'

export const commonOptions: ShowBtnOptions<
  ActivityStatusEnum,
  ActSubTabResources
> = {
  statusMap: ACTIVITY_STATUS_DESC,
  statusLabel: '活动状态',
  tabMap: ActSubTabText,
  tabLabel: '活动分类 Tab',
}
export const showActBtns = [
  showBtn('showActCopyBtn', '展示活动复制按钮', commonOptions),
  showBtn('showActEditBtn', '展示活动编辑按钮', commonOptions),
  showBtn('showActInviteSettingsBtn', '展示活动邀请设置按钮', commonOptions),
  showBtn('showActProgressBtn', '展示活动进度按钮', {
    ...commonOptions,
    tips: '当开关关闭，则不展示进度按钮，若打开，还需要根据是否有进度节点判断是否展示',
  }),
  showBtn('showConfirmAgreementBtn', '展示确认协议按钮', commonOptions),
  showBtn('showConfirmSkuBtn', '展示确认商品按钮', commonOptions),
  showBtn('showActPoiConfirmBtn', '展示合作运营确认按钮', commonOptions),
]
