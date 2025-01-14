import { ChargeTypeEnum, ChargeTypeEnumDesc } from '@/common/constants'
import { SelectState, UI_COMPONENTS, nodeUtil } from '@easy-page/antd-ui'

export const chargeType = () =>
  nodeUtil
    .createField<SelectState<string>>(
      'chargeType',
      '补贴方式',
      {
        required: true,
        mode: 'single',
        value: {
          choosed: undefined,
        },
        postprocess({ value }) {
          if (!value) {
            return {}
          }
          return {
            chargeType: Number(value.choosed),
          }
        },
      },
      {
        ui: UI_COMPONENTS.SELECT,
        select: {
          placeholder: '请选择',
          className: 'w-[200px]',
        },
      }
    )
    .appendChildren([
      nodeUtil.createNode(`${ChargeTypeEnum.Amount}`, {
        name: ChargeTypeEnumDesc[ChargeTypeEnum.Amount],
      }),
      nodeUtil.createNode(`${ChargeTypeEnum.Percentage}`, {
        name: ChargeTypeEnumDesc[ChargeTypeEnum.Percentage],
      }),
    ])
