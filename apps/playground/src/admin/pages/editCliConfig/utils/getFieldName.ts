import {
  ContainerIdsText,
  FieldIdsText,
  FieldOptionIdsText,
  SubFormIdsText,
} from '@/common/constants/fieldMaps'
import { OpSenceText } from '@/common/constants/fieldMaps/opSence'

export const getFieldName = (id: string) => {
  return (
    ContainerIdsText[id] ||
    FieldIdsText[id] ||
    FieldOptionIdsText[id] ||
    SubFormIdsText[id] ||
    OpSenceText[id]
  )
}
