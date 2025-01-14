import { nodeUtil } from '@easy-page/antd-ui'
import { CommonActCrudFormState, InviteWay } from '../../../../interface'
import { InputTypeEnum } from '@/common/constants'
import { toNumber } from '@/common/libs'

// InputTypeEnum 的 string
export const inputIdsWay = () =>
  nodeUtil.createField<string, CommonActCrudFormState>(
    'inputIdsWay',
    '录入方式',
    {
      value: `${InputTypeEnum.ManualEntry}`,
      mode: 'single',
      required: true,
      validate: ({ value }) => {
        if (!value) {
          return { success: false, errorMsg: '必选' }
        }
        return { success: true }
      },
      actions: [
        {
          effectedKeys: ['dataType'],
          action: ({ effectedData, value }) => {
            const data = effectedData['dataType']
            if (
              data === InviteWay.ByMerchantBrand &&
              value === `${InputTypeEnum.FilterAssemble}`
            ) {
              // 切换到门店时，默认值如果是：通过条件筛选，则改为：录入 ID
              return {
                fieldValue: `${InputTypeEnum.ManualEntry}`,
                validate: false,
              }
            }
            return {}
          },
        },
      ],
      postprocess: ({ value }) => {
        return {
          'invitation.inputType': toNumber(value),
        }
      },
      preprocess({ defaultValues }) {
        return `${
          defaultValues?.invitation?.inputType || InputTypeEnum.ManualEntry
        }` as string
      },
    }
  )
