import {
  ContainerIds,
  FieldIds,
  FieldOptionIds,
  SubFormIds,
} from '@/common/constants/fieldMaps'

const containerIds = Object.values(ContainerIds)
const fieldIds = Object.values(FieldIds)
const optionsIds = Object.values(FieldOptionIds)
const subFormIds = Object.values(SubFormIds)

export const getAllFields = (fieldFullIds: string[][]) => {
  const fieldsSet = new Set<string>()
  const containerSet = new Set<string>()
  const subFormSet = new Set<string>()
  const fieldOptionsSet = new Set<string>()

  fieldFullIds.forEach((each) => {
    each.forEach((x) => {
      if (containerIds.includes(x as ContainerIds)) {
        containerSet.add(x)
      } else if (fieldIds.includes(x as FieldIds)) {
        fieldsSet.add(x)
      } else if (optionsIds.includes(x as FieldOptionIds)) {
        fieldOptionsSet.add(x)
      } else if (subFormIds.includes(x as SubFormIds)) {
        subFormSet.add(x)
      } else {
        console.log('xxxxxxx:', x)
      }
    })
  })
  return {
    fieldIds: Array.from(fieldsSet),
    optionsIds: Array.from(fieldOptionsSet),
    containerIds: Array.from(containerSet),
    subFormIds: Array.from(subFormSet),
  }
}
