import { nodeUtil, RadioEffectedType } from '@easy-page/antd-ui'
import { byMerchantBrand } from './common'
import { get } from 'lodash'
import {
  CommonActCrudFormProps,
  CommonActCrudFormState,
  InviteWay,
} from '@/pages/actsCrud/ActsCrudInfo'

export const byMerchantBrandOfEdit = (name?: string) =>
  nodeUtil.extends<
    any,
    CommonActCrudFormState,
    CommonActCrudFormProps,
    RadioEffectedType
  >(byMerchantBrand({ name }), {
    actions() {
      return [
        {
          initRun: true,
          action: ({ defaultValues }) => {
            const val = get(defaultValues, 'invitation.dataType')
            if (`${val}` === InviteWay.ByMerchantBrand) {
              return {
                effectResult: {
                  radioProps: {
                    disabled: true,
                  },
                },
              }
            }
            return {}
          },
        },
      ]
    },
  })
