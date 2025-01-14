import { FiedConfigs } from '@/pages/actsCrud/ActsCrudInfo/common'

export type FieldConfigFormState = FiedConfigs
export type FieldConfigFormProps = {
  defaultValues: Partial<FiedConfigs>
  fieldIds: Array<string[]>
}
