import { toNumber } from '@/common'
import { InviteWay } from '@/pages/actsCrud/ActsCrudInfo/fields'
import { nodeUtil } from '@easy-page/antd-ui'
import { get } from 'lodash'

export const wmsInvitationType = () =>
  nodeUtil.createField(
    'invitation.dataType',
    '邀请方式',
    {
      mode: 'single',
      value: InviteWay.BySupplier,
      preprocess: ({ defaultValues }) => {
        return String(
          get(defaultValues || {}, 'invitation.dataType') ||
            InviteWay.BySupplier
        ) as InviteWay
      },
      postprocess: ({ value }) => {
        return {
          'invitation.dataType': toNumber(value),
        }
      },
      required: true,
    },
    {
      radioGroup: {
        options: [
          {
            label: '通用供应商邀请',
            value: InviteWay.BySupplier,
          },
        ],
      },
    }
  )
