import {
  ActSubTabResources,
  BizLineEnum,
  PlanAndActTabResources,
  PlanTypeEnum,
  UserInfo,
  ZsptRoleIds,
  ZsptRoleNameAndIdMap,
  getBizLine,
  getIamUrlByEnv,
  isView,
  toPlanAndActList,
} from '@/common'
import { roleManager } from '@/common/roles/manager'
import {
  roleAndCrudPlanMap,
  roleAndPlanTypeMap,
} from '@/common/roles/mappings/crudPlanMap'
import { Modal } from 'antd'

export const checkAuthOfPlanCrud = (
  userInfo: UserInfo,
  planType: PlanTypeEnum,
  planName: string
) => {
  const bizLine = getBizLine()
  const resources = roleManager.getResources(roleAndCrudPlanMap, {
    userInfo,
    bizLine: bizLine,
  })
  console.log('userInfouserInfo:', userInfo)
  const hasAuth = resources.includes(planType)
  if (isView() || hasAuth) {
    return
  }

  const applyRole = roleAndPlanTypeMap[bizLine][planType]
  const applyRoleId = ZsptRoleIds[applyRole]?.prod
  if (!applyRoleId) {
    return
  }
  const applyRoleName = ZsptRoleNameAndIdMap[applyRole]
  Modal.confirm({
    centered: true,
    title: '申请权限',
    content: (
      <span style={{ wordWrap: 'break-word' }}>
        您无{planName}
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
          tab: PlanAndActTabResources.Plan,
          actFilterType: ActSubTabResources.Mine,
          bizLine: `${BizLineEnum.WaiMai}`,
        },
        '_self'
      )
    },
  })
}
