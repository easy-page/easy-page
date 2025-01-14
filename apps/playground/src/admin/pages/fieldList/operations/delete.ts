import { Operation, OperationEnum } from '@/common'
import { FieldContext } from '../interface'
import { deleteField } from '@/admin/common/apis/deleteField'
import { loadFieldListToModel } from '@/admin/common'
import { message } from 'antd'
import { zsptConfirm } from '@/common/components/zspt/ZsptConfirm'
import { FieldConfig } from '@/common/constants/fieldMaps/interface'

export const fieldDelete: Operation<FieldConfig, string, FieldContext> = {
  id: OperationEnum.Delete,
  label: '删除',
  show: () => true,
  async action({ record }) {
    zsptConfirm({
      title: '确认',
      content: '是否删除',
      onOk: async () => {
        const res = await deleteField({ id: record.id as any })
        if (res.success) {
          message.success('创建成功')
          loadFieldListToModel()
        } else {
          message.error(res.msg || '创建失败')
        }
      },
    })
  },
  auth: [],
}
