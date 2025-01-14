import { AuthTypeEnum, AuthTypeText } from '@/common'
import { nodeUtil, SelectState, UI_COMPONENTS } from '@easy-page/antd-ui'

export const subsidyResourceIdList = nodeUtil.createField<
  SelectState<AuthTypeEnum[]>
>(
  'resourceIdList',
  '补贴资源权限列表',
  {
    value: {
      choosed: [],
    },
    required: true,
    mode: 'multiple',
    postprocess: ({ value }) => {
      return {
        resourceIdList: value.choosed,
      }
    },
    preprocess: ({ defaultValues }) => {
      return {
        choosed: defaultValues['resourceIdList'],
        options: Object.keys(AuthTypeText).map((e) => ({
          label: AuthTypeText[e],
          value: e,
        })),
      }
    },
  },
  {
    ui: UI_COMPONENTS.SELECT,
    select: {
      placeholder: '请选择鉴权选项',
    },
  }
)
