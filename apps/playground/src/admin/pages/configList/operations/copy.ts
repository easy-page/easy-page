import { ConfigListInfo } from '@/common/apis/getConfigList'
import { toCrudConfig } from '@/admin/common/routes/toCrudConfig'
import { Operation, OperationEnum, OperationType } from '@/common'

export const configCopy: Operation<ConfigListInfo> = {
  id: OperationEnum.Copy,
  label: '复制',
  show: () => true,
  action({ record }) {
    toCrudConfig(
      {
        id: `${record.id}`,
        operationType: OperationType.COPY,
      },
      '_blank'
    )
  },
  auth: [],
}
