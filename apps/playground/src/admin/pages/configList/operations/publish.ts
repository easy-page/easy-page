import { loadConfigListToModel } from '@/admin/common'
import { ConfigListInfo } from '@/common/apis/getConfigList'
import { publishConfig } from '@/admin/common/apis/publishConfig'
import { loadConfigItems } from '@/admin/common/models/configItems'
import {
  ConfigPublishStatus,
  IsConfigTemplate,
  Operation,
  OperationEnum,
} from '@/common'
import { zsptConfirm } from '@/common/components/zspt/ZsptConfirm'
import { message } from 'antd'

export const configPublish: Operation<ConfigListInfo> = {
  id: OperationEnum.PublishConfig,
  label: '发布配置',
  show: ({ record }) => {
    return (
      record.publishStatus !== ConfigPublishStatus.Published &&
      record.isTemplate === IsConfigTemplate.No
    )
  },
  async action({ record, userInfo }) {
    zsptConfirm({
      title: '确认发布',
      content: '发布后，配置会立即生效?',
      async onOk(...args) {
        const res = await publishConfig({
          id: record.id,
          updator: userInfo?.mis,
        })
        if (res.success) {
          message.success('发布成功')
          loadConfigListToModel()
          loadConfigItems()
        } else {
          message.error(res.msg)
        }
      },
    })
  },
  auth: [],
}
