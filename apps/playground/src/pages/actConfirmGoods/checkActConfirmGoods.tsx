import { Modal } from 'antd'
import { UserInfo, ZsptRoleIds, ZsptRolesEnum, getEnv } from '@/common'

export const checkActConfirmGoods = (userInfo: UserInfo) => {
  const rolesId = []
  userInfo.roles.map((role) => rolesId.push(role.id))

  const hasAuth =
    rolesId.includes(ZsptRoleIds[ZsptRolesEnum.WaimaSongJiuOfAct][getEnv()]) ||
    rolesId.includes(ZsptRoleIds[ZsptRolesEnum.WaimaSongJiuAdmin][getEnv()])

  if (hasAuth) {
    return
  }
  Modal.confirm({
    centered: true,
    title: '提示',
    content: (
      <span style={{ wordWrap: 'break-word' }}>您无菜单角色权限，不可操作</span>
    ),
    // okText: '取消',
    cancelButtonProps: { hidden: true },
    okButtonProps: { hidden: true },
    onOk: () => {
      // toPlanAndActList(
      //   {
      //     tab: PlanAndActTabResources.Act,
      //     actFilterType: ActSubTabResources.Mine,
      //     bizLine: `${config.bizLine}`,
      //   },
      //   '_self'
      // )
    },
  })
}
