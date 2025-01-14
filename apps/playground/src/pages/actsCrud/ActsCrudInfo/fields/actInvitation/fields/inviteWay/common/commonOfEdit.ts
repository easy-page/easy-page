import { nodeUtil, RadioGroupEffectType } from '@easy-page/antd-ui'
import {
  CommonActCrudFormProps,
  CommonActCrudFormState,
} from '../../../../interface'
import { inviteWay } from '../base'
import { ActionTypeEnum } from '@/common'
import {
  byMerchantBrand,
  ByMerchantBrandOptions,
  byPoiInviteOption,
} from '../options'

export const commonInviteWayOfEdit = (
  options?: ByMerchantBrandOptions & {
    disabledWithOperations?: ActionTypeEnum[]
  }
   ) =>
  nodeUtil
    .extends<
      string,
      CommonActCrudFormState,
      CommonActCrudFormProps,
      RadioGroupEffectType
    >(inviteWay(), {
      actions() {
        return [
          {
            effectedKeys: ['chooseOperation'],
            initRun: true,
            action: ({ effectedData }) => {
              const value = effectedData['chooseOperation']
              console.log('valuevalue:', value)
              const isReplace = value === `${ActionTypeEnum.Replace}`
              const disabledWithOperations =
                options?.disabledWithOperations || [ActionTypeEnum.NoChange]
              const isAppendOrDeleteOrNoChange = disabledWithOperations
                .map((e) => `${e}`)
                .includes(value)
              if (isAppendOrDeleteOrNoChange) {
                return { effectResult: { disabled: true } }
              }
              if (isReplace) {
                return { effectResult: { disabled: false } }
              }
              return {
                effectResult: {},
              }
            },
          },
        ]
      },
    })
    .appendChildren([byPoiInviteOption(), byMerchantBrand(options)])
