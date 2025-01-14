import { AdminOpType, Operation, OperationEnum, OperationType } from '@/common'
import { LogColumnContext } from '../interface'
import { ConfigLogInfoType } from '@/admin/common/apis/getLogList'
import { message } from 'antd'

export const logView: Operation<ConfigLogInfoType, string, LogColumnContext> = {
  id: OperationEnum.View,
  label: '查看',
  show: () => true,
  action({ record, showDrawer }) {
    if (record.opType === AdminOpType.Publish) {
      message.warning('发布操作，无配置对比')
      return
    }
    showDrawer(record, OperationType.VIEW)
  },
  auth: [],
}
