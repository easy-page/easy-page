import { OperationType, UserInfo } from '@/common'

export type FieldContext = {
  showCrudDrawer: (id: number, operationType: OperationType) => void
  userInfo?: UserInfo
}
