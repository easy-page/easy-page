import { AuthActOption, AuthActOptionText } from '@/common'
import { nodeUtil, SelectState, UI_COMPONENTS } from '@easy-page/antd-ui'
import { get } from 'lodash'

export const authActOptionsInfo = nodeUtil.createField<
  SelectState<AuthActOption[]>
>(
  'authActOptionsInfo',
  '活动操作授权选项',
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
      console.log('AuthActOptionText:', AuthActOptionText)
      return {
        choosed: get(defaultValues, 'config.authOptionsInfo'),
        options: Object.keys(AuthActOptionText).map((e) => ({
          label: AuthActOptionText[e],
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
      extra: '列表页操作授权按钮可授权选项配置',
    },
  }
)
