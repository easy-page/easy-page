import {
  AuthTypeEnum,
  AuthTypeText,
  ChargeSideDesc,
  ChargeSideEnum,
} from '@/common'
import { SelectState, UI_COMPONENTS, nodeUtil } from '@easy-page/antd-ui'
import { EditCliConfigFormState, EditCliConfigFormProps } from '../interface'

export const bgBuList = nodeUtil.createField<
  SelectState<ChargeSideEnum[]>,
  EditCliConfigFormState,
  EditCliConfigFormProps
>(
  'bgBuList',
  '补贴承担方',
  {
    mode: 'multiple',
    value: { choosed: [], keyword: '' },
    preprocess({ defaultValues }) {
      const choosed = defaultValues?.fullConfig?.crudConfig?.bgBuList || []

      return {
        choosed,
        options: Object.keys(ChargeSideDesc).map((e) => ({
          value: e,
          label: ChargeSideDesc[e],
        })),
      }
    },
    postprocess: ({ value }) => {
      return {
        'crudConfig.bgBuList': value.choosed ? [...value.choosed] : [],
      }
    },
    required: true,
  },
  {
    ui: UI_COMPONENTS.SELECT,
    select: {
      placeholder: '请选择',
    },
    formItem: {
      extra:
        '用于：/api/zspt/operation/operConfirm/getPnList 接口查询参数，查询补贴承担方信息，作为活动创建补贴分担中 pn 下拉框选项',
    },
  }
)
