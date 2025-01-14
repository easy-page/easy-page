import { nodeUtil } from '@easy-page/antd-ui'
import {
  actContainer,
  inviteSettingsContainer,
  opAuthContainer,
  operationContainer,
  opShowContainer,
  otherContainer,
  qualifyContainer,
  subsidyContainer,
} from '../titleContainers'
import { ConfigFormState } from '../../interface'
import { resourceIdList } from './subsidy/resourceIdList'
import { templateInfo } from './templateInfo'
import { disableNoLimitOption } from './inviteSettings/disableNoLimitOption'
import { disableMerchantBrandOption } from './inviteSettings/disableMerchantBrandOption'
import { showInputWayOfInviteSettingsByMerchantOp } from './inviteSettings/showInputWayOfInviteSettingsByMerchantOp'
import {
  actCopyAuths,
  actEditAuths,
  actInviteSettingsAuths,
  actPoiConfirmAuths,
  actSendInviteAuths,
  actWithdrawAuths,
} from './operations/auth'
import { useNewZsptFramework } from '../others/useNewZsptFramework'
import { useNewFrameworkApplyResPage } from '../others/useNewFrameworkApplyResPage'
import { applyDefaultRole } from '../others/applyDefaultRole'

import { needCheckGray } from '../others/needCheckGray'
import { ConfigType } from '@/common'
import { categories } from './factors/category'
import { factorCodes } from './factors/factorCodes'

import { showActBtns } from './operations/show'
import { actBaseInfo } from './baseInfo'
import { authActOptionsInfo } from '../operation/actions/authActOptionsInfo'
import { bgBuList } from './subsidy/bgBuList'
import { canEditQualifyAfterApply } from './factors/canEditQualifyAfterApply'
import { factorConfigs } from './factors/factorConfigs'

export const actSettings = nodeUtil.extends<any, ConfigFormState>(
  actContainer().appendChildren([
    actBaseInfo,
    templateInfo,
    subsidyContainer().appendChildren([bgBuList, resourceIdList]),
    qualifyContainer().appendChildren([
      categories,
      factorCodes,
      canEditQualifyAfterApply,
      factorConfigs,
    ]),

    inviteSettingsContainer().appendChildren([
      disableNoLimitOption,
      disableMerchantBrandOption,
      showInputWayOfInviteSettingsByMerchantOp,
    ]),

    operationContainer().appendChildren([
      opShowContainer().appendChildren(showActBtns),
      opAuthContainer().appendChildren([
        actCopyAuths,
        actEditAuths,
        actInviteSettingsAuths,
        actSendInviteAuths,
        actWithdrawAuths,
        actPoiConfirmAuths,
        authActOptionsInfo,
      ]),
    ]),
    otherContainer().appendChildren([
      useNewZsptFramework,
      useNewFrameworkApplyResPage,
      applyDefaultRole,
      needCheckGray,
    ]),
  ]),
  {
    when() {
      return {
        effectedKeys: ['type'],
        show({ effectedData }) {
          return effectedData['type'] === `${ConfigType.Act}`
        },
      }
    },
  }
)
