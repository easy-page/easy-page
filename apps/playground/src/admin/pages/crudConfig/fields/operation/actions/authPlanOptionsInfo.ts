import { AuthPlanOption, AuthPlanOptionText } from '@/common'
import { nodeUtil, SelectState, UI_COMPONENTS } from '@easy-page/antd-ui'
import { get } from 'lodash'

export const authPlanOptionsInfo = nodeUtil.createField<
  SelectState<AuthPlanOption[]>
>(
  'authPlanOptionsInfo',
  '方案操作授权选项',
  {
    value: {
      choosed: [],
    },
    required: true,
    mode: 'multiple',
    postprocess: ({ value }) => {
      return {
        'config.authOptionsInfo': value.choosed,
      }
    },
    preprocess: ({ defaultValues }) => {
      return {
        choosed: get(defaultValues, 'config.authOptionsInfo'),
        options: Object.keys(AuthPlanOptionText).map((e) => ({
          label: AuthPlanOptionText[e],
          value: e,
        })),
      }
    },
  },
  {
    ui: UI_COMPONENTS.SELECT,
    select: {
      placeholder: '请选择',
    },
    formItem: {
      extra: '列表页操作授权按钮可授权选项配置，其中「发布方案」神会员特有',
    },
  }
)
