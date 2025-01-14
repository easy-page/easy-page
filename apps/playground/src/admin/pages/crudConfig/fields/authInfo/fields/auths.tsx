import {
  AuthFromBackendResEnum,
  AuthFromBackendResText,
  ConfigType,
} from '@/common'
import { nodeUtil, SelectState, UI_COMPONENTS } from '@easy-page/antd-ui'

export const auths = nodeUtil.createField<
  SelectState<AuthFromBackendResEnum[]>
>(
  'auths',
  '操作后端鉴权点',
  {
    value: {
      choosed: [],
    },
    required: true,
    mode: 'multiple',
    postprocess: ({ value }) => {
      return {
        auths: value.choosed,
      }
    },
    preprocess: ({ defaultValues, pageProps }) => {
      const isAct = pageProps['type'] === `${ConfigType.Act}`
      console.log('isActisAct:', isAct, defaultValues)
      return {
        choosed: defaultValues['auths'],
        options: Object.keys(AuthFromBackendResText)
          .map((e) => ({
            label: AuthFromBackendResText[e],
            value: e,
          }))
          .filter((e) => {
            if (!isAct && e.value === AuthFromBackendResEnum.PlanCreator) {
              return false
            }
            return true
          }),
      }
    },
  },
  {
    ui: UI_COMPONENTS.SELECT,
    select: {
      placeholder: '请选择需要校验的权限点',
    },
    formItem: {
      extra: '',
    },
  }
)
