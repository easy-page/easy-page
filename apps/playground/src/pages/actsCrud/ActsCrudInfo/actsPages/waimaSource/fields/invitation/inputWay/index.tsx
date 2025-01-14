import { InviteInputTypeEnum, InviteInputTypeDesc } from '@/common'
import { InviteWay } from '@/pages/actsCrud/ActsCrudInfo/fields'
import { nodeUtil } from '@easy-page/antd-ui'
import { get } from 'lodash'

export const wmsInputWay = () =>
  nodeUtil.createField(
    'invitation.inputType',
    '录入方式',
    {
      mode: 'single',
      value: InviteInputTypeEnum.OnlineSearch,
      preprocess: ({ defaultValues }) => {
        return get(defaultValues || {}, 'invitation.inputType')
      },
      postprocess: ({ value }) => {
        return {
          'invitation.inputType': value,
        }
      },
      required: true,
    },
    {
      radioGroup: {
        options: [
          {
            label: InviteInputTypeDesc[InviteInputTypeEnum.OnlineSearch],
            value: InviteInputTypeEnum.OnlineSearch,
          },
          {
            label: InviteInputTypeDesc[InviteInputTypeEnum.ManualEntry],
            value: InviteInputTypeEnum.ManualEntry,
          },
        ],
      },
    }
  )
