import {
  FieldConfig,
  TemplateIdType,
} from '@/common/constants/fieldMaps/interface'
import { FieldBelongState } from '../../../interface'

export const getBatchConfig = ({
  curValue,
  field,
  curBelong,
}: {
  field: FieldConfig
  curBelong: TemplateIdType
  curValue: FieldBelongState
}) => {
  const doSetBelong = (eachField: FieldConfig) => {
    curValue[eachField.id] = curBelong
    ;(eachField.children || []).forEach((each) => {
      doSetBelong(each)
    })
  }

  doSetBelong(field)
  return curValue
}
