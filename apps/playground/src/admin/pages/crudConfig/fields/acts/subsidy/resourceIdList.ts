import { AuthTypeEnum, AuthTypeText } from '@/common'
import { SelectState, UI_COMPONENTS, nodeUtil } from '@easy-page/antd-ui'

export const resourceIdList = nodeUtil.createField<SelectState<AuthTypeEnum[]>>(
  'resourceIdList',
  '补贴资源',
  {
    mode: 'multiple',
    value: { choosed: [], keyword: '' },
    preprocess({ defaultValues }) {
      const choosed = defaultValues?.config?.resourceIdList || []

      return {
        choosed,
        options: Object.keys(AuthTypeText).map((e) => ({
          value: e,
          label: AuthTypeText[e],
        })),
      }
    },
    postprocess: ({ value }) => {
      return {
        'config.resourceIdList': value.choosed ? value.choosed : [],
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
        '用于 /api/sg/uoc/auth/queryResourceStatus 接口，查询当前用户是否有当前选择的补贴权限，来创建活动；通过此权限查询，没有权限时页面的补贴类型选项就会提示：申请权限',
    },
  }
)
