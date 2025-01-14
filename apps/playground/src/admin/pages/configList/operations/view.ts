import { toCrudConfig } from '@/admin/common/routes/toCrudConfig'
import { Operation, OperationEnum, OperationType } from '@/common'
import { ConfigListInfo } from '@/common/apis/getConfigList'

export const configView: Operation<ConfigListInfo> = {
  id: OperationEnum.View,
  label: '查看',
  show: () => true,
  action({ record }) {
    toCrudConfig(
      {
        id: `${record.id}`,
        operationType: OperationType.VIEW,
      },
      '_blank'
    )
  },
  auth: [],
}
