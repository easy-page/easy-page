import { ConfigListInfo } from '@/common/apis/getConfigList'
import { toCrudConfig } from '@/admin/common/routes/toCrudConfig'
import { Operation, OperationEnum, OperationType } from '@/common'

export const configEdit: Operation<ConfigListInfo> = {
  id: OperationEnum.Modify,
  label: '编辑',
  show: () => true,
  action({ record }) {
    toCrudConfig(
      {
        id: `${record.id}`,
        operationType: OperationType.EDIT,
      },
      '_blank'
    )
  },
  auth: [],
}
