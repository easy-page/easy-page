import { ConfigLogInfoType } from '@/admin/common/apis/getLogList'
import { OperationType, UserInfo } from '@/common'
import { ConfigListInfo } from '@/common/apis/getConfigList'

export type LogColumnContext = {
  userInfo?: UserInfo
  configs: ConfigListInfo[]
  showDrawer: (record: ConfigLogInfoType, operationType: OperationType) => void
}
