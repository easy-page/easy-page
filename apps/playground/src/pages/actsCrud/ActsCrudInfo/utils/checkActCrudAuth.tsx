import {
  ActSubTabResources,
  ActTypeEnum,
  PlanAndActTabResources,
  UserInfo,
  ZsptRoleIds,
  ZsptRoleNameAndIdMap,
  getBizLine,
  getIamUrl,
  getIamUrlByEnv,
  isView,
  toPlanAndActList,
} from '@/common'
import { ConfigListInfo } from '@/common/apis/getConfigList'
import { getActConfig } from '@/common/configs'
import { roleManager } from '@/common/roles/manager'
import { roleAndCrudActMap } from '@/common/roles/mappings'
import { Modal } from 'antd'

export const checkAuthOfCrudAct = (
  userInfo: UserInfo,
  actType: ActTypeEnum,
  {
    configs,
  }: {
    configs: ConfigListInfo[]
  }
) => {
  const resources = roleManager.getResources(roleAndCrudActMap, {
    userInfo,
    bizLine: getBizLine(),
  })
  const hasAuth = resources.includes(actType)
  if (isView() || hasAuth) {
    return
  }

  const config = getActConfig({ actType, configs: configs })
  const applyRole = config?.applyDefaultRole

  const applyRoleName = ZsptRoleNameAndIdMap[applyRole]
  Modal.confirm({
    centered: true,
    title: '申请权限',
    content: (
      <span style={{ wordWrap: 'break-word' }}>
        您无{config.templateInfo.name}
        配置权限，请先申请【{applyRoleName}】权限。
        <a
          onClick={() => {
            window.open(
              getIamUrlByEnv({
                prodRoleId: ZsptRoleIds[applyRole]?.prod,
                devRoleId: ZsptRoleIds[applyRole]?.test,
              })
            )
          }}
        >
          点击申请
        </a>
      </span>
    ),
    okText: '取消',
    cancelButtonProps: { hidden: true },
    onOk: () => {
      toPlanAndActList(
        {
          tab: PlanAndActTabResources.Act,
          actFilterType: ActSubTabResources.Mine,
          bizLine: `${config.bizLine}`,
        },
        '_self'
      )
    },
  })
}
