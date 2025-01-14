import { FieldBelongFirstLevel } from '@/common'
import { ToolbarProps } from '@/common/fields'
import { SelectState } from '@easy-page/antd-ui'

export type CrudFieldFormState = {
  fieldId: string
  fieldName: string
  owner: string[]
  belong: SelectState<FieldBelongFirstLevel>
}
export type CrudFieldFormProps = ToolbarProps & {}
