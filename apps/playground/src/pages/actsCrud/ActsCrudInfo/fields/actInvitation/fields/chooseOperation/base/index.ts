import { nodeUtil } from '@easy-page/antd-ui'
import { ActionTypeEnum, toNumber } from '@/common'
import { CommonActCrudFormState } from '../../../../interface'

export const chooseOperation = () =>
  nodeUtil.createField<string, CommonActCrudFormState>(
    'chooseOperation',
    '选择操作',
    {
      required: true,
      value: `${ActionTypeEnum.NoChange}`,
      mode: 'single',
      postprocess: ({ value }) => {
        if (!value) {
          return {}
        }
        return {
          'invitation.actionType': toNumber(value),
        }
      },
    }
  )
