import { UserInfo } from '@/common'

export type CreatePlanItem = {
  title: string
  desc: string
  btnText: string
  handler: () => void
  btnClass?: string
  bizLine: number
  roleId: number // 指如果要申请角色时，角色对应的 id
  btnType?: 'text' | 'link' | 'default' | 'primary' | 'dashed' | undefined
}

export type GetCreatePlanItemContext = {
  userInfo?: UserInfo
}

export type GetCreatePlanItemHandler = (
  context: GetCreatePlanItemContext
) => CreatePlanItem
