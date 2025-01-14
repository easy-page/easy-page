import { nodeUtil } from '@easy-page/antd-ui'
import { get, toNumber } from 'lodash'
import {
  InviteWay,
  CommonActCrudFormState,
  CommonActCrudFormProps,
} from '../../../../interface'

export const inviteWay = () =>
  nodeUtil.createField<
    InviteWay,
    CommonActCrudFormState,
    CommonActCrudFormProps
  >(
    'dataType',
    '邀请方式',
    {
      value: InviteWay.ByPoiInvite,
      mode: 'single',
      required: true,
      postprocess: ({ value }) => {
        console.log('value:::',value);
        
        return {
          'invitation.dataType': toNumber(value),
        }
      },
      preprocess({ defaultValues }) {
        const val = get(defaultValues, 'invitation.dataType')

        if (!val) {
          return InviteWay.ByPoiInvite
        }
        return `${val}` as InviteWay
      },
      validate: ({ value }) => {
        if (!value) {
          return { success: false, errorMsg: '请选择邀请方式' }
        }
        return { success: true }
      },
    },
    {}
  )
