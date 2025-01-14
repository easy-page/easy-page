import { Operation, OperationEnum, OperationType } from '@/common'
import { FieldContext } from '../interface'
import { FieldConfig } from '@/common/constants/fieldMaps/interface'

export const fieldEdit: Operation<FieldConfig, string, FieldContext> = {
  id: OperationEnum.Modify,
  label: '编辑',
  show: () => true,
  action({ record, showCrudDrawer }) {
    showCrudDrawer(record.id as any, OperationType.EDIT)
  },
  auth: [],
}
