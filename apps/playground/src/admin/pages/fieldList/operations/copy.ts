import { Operation, OperationEnum, OperationType } from '@/common'
import { FieldContext } from '../interface'
import { FieldConfig } from '@/common/constants/fieldMaps/interface'

export const fieldCopy: Operation<FieldConfig, string, FieldContext> = {
  id: OperationEnum.Copy,
  label: '复制',
  show: () => true,
  action({ record, showCrudDrawer }) {
    showCrudDrawer(record.id as any, OperationType.COPY)
  },
  auth: [],
}
