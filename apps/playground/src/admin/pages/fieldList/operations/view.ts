import { Operation, OperationEnum, OperationType } from '@/common'
import { FieldContext } from '../interface'
import { FieldConfig } from '@/common/constants/fieldMaps/interface'

export const fieldView: Operation<FieldConfig, string, FieldContext> = {
  id: OperationEnum.View,
  label: '查看',
  show: () => true,
  action({ record, showCrudDrawer }) {
    showCrudDrawer(record.id as any, OperationType.VIEW)
  },
  auth: [],
}
