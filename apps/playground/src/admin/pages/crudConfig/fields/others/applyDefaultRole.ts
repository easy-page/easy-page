import { ZsptRoleNameAndIdMap, ZsptRolesEnum } from '@/common'
import { nodeUtil, SelectState, UI_COMPONENTS } from '@easy-page/antd-ui'
import { get } from 'lodash'

export const applyDefaultRole = nodeUtil.createField<
  SelectState<ZsptRolesEnum>
>(
  'applyDefaultRole',
  '活动 CRUD 页权限申请角色',
  {
    mode: 'single',
    postprocess({ value }) {
      return {
        'config.applyDefaultRole': value.choosed,
      }
    },
    preprocess({ defaultValues }) {
      return {
        choosed: get(defaultValues, 'config.applyDefaultRole'),
        options: Object.keys(ZsptRoleNameAndIdMap).map((e) => ({
          label: ZsptRoleNameAndIdMap[e],
          value: e,
        })),
      }
    },
    required: true,
  },
  {
    ui: UI_COMPONENTS.SELECT,
    select: {
      placeholder: '请选择',
      allowClear: true,
    },
    formItem: {
      extra: '上线前，需确保角色被配置',
    },
  }
)
