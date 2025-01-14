import { UserInfo } from '@/common/apis'

export type CreateActItem = {
  title: string
  desc: string
  btnText: string
  bizLine: number
  handler: () => void
  roleId: number // 指如果要申请角色时，角色对应的 id
  btnType?: 'text' | 'link' | 'default' | 'primary' | 'dashed' | undefined
}

export type GetCreateActItemContext = {
  userInfo?: UserInfo
}

export type GetCreateActItemHandler = (
  context: GetCreateActItemContext
) => CreateActItem
