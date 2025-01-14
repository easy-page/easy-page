import { ConfigListInfo } from '@/common/apis/getConfigList'
import { Operation, OperationEnum } from '@/common'
import { toCliEditConfig } from '@/admin/common/routes'

export const cliConfigEdit: Operation<ConfigListInfo> = {
  id: OperationEnum.CliConfigModify,
  label: '编辑 CLI 配置',
  show: () => true,
  action({ record }) {
    toCliEditConfig(
      {
        configId: `${record.id}`,
      },
      '_blank'
    )
  },
  auth: [],
}
