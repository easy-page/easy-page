import { loadConfigListToModel } from '@/admin/common'
import { deleteConfig } from '@/admin/common/apis/deleteConfig'
import { ConfigListInfo } from '@/common/apis/getConfigList'
import { Operation, OperationEnum } from '@/common'
import { zsptConfirm } from '@/common/components/zspt/ZsptConfirm'
import { message } from 'antd'

export const configDelete: Operation<ConfigListInfo> = {
  id: OperationEnum.Delete,
  label: '删除',
  show: () => true,
  action({ record }) {
    zsptConfirm({
      title: '确认删除',
      content: '删除后，配置会立即丢失，是否删除?',
      async onOk(...args) {
        const res = await deleteConfig({
          id: record.id,
        })
        if (res.success) {
          message.success('删除成功')
          loadConfigListToModel()
        } else {
          message.error(res.msg)
        }
      },
    })
  },
  auth: [],
}
