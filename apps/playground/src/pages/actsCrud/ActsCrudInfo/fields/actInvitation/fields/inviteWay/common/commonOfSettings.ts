import { ActionTypeEnum } from '@/common/constants'
import { nodeUtil } from '@easy-page/antd-ui'
import { CommonActCrudFormState } from '../../../../interface'
import { inviteWay } from '../base'
import {
  ByMerchantBrandOptions,
  byPoiInviteOption,
  commonByConditionFilterOfSettings,
  commonByMerchantBrandOfSettings,
} from '../options'

export const commonInviteWayOfInviteSettings = (
  options?: ByMerchantBrandOptions
) =>
  nodeUtil
    .extends<string, CommonActCrudFormState>(inviteWay(), {
      when: () => {
        return {
          effectedKeys: ['chooseOperation'],
          show({ effectedData }) {
            if (
              [`${ActionTypeEnum.Unlimited}`].includes(
                effectedData?.['chooseOperation']
              )
            ) {
              return false
            }
            return true
          },
        }
      },
    })
    .appendChildren([
      byPoiInviteOption(),
      commonByMerchantBrandOfSettings,
      commonByConditionFilterOfSettings,
    ])
