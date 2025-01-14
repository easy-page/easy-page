import { FieldConfig } from '../../../../common/constants/fieldMaps/interface.ts'
import { FieldTypeEnum } from '../../../../common/constants/fieldMaps/fieldType.ts'
import { ContainerIds } from '../../../../common/constants/fieldMaps/containerIds.ts'
import { FieldIds } from '../../../../common/constants/fieldMaps/fieldIds.ts'
import { FieldOptionIds } from '../../../../common/constants/fieldMaps/fieldOptionIds.ts'
import { OpSenceId } from '../../../../common/constants/fieldMaps/opSence.ts'
import { FieldBelongState } from '../interface.ts'
// import { FiedConfigs } from '@/pages/actsCrud/ActsCrudInfo/common'

export type PrepareFieldConfigOptions = {
  fieldIds: string[][]
  configs: any
  belong: FieldBelongState
  template: string
}

const ContainerIdsVal = Object.values(ContainerIds)
const FieldIdsVal = Object.values(FieldIds)
const FieldOptionIdsVal = Object.values(FieldOptionIds)
const OpSenceIdsVal = Object.values(OpSenceId)

const getFieldType = (id: string): FieldTypeEnum => {
  if (ContainerIdsVal.includes(id as any)) {
    return FieldTypeEnum.Container
  }
  if (FieldIdsVal.includes(id as any)) {
    return FieldTypeEnum.Field
  }
  if (FieldOptionIdsVal.includes(id as any)) {
    return FieldTypeEnum.FieldOption
  }
  if (OpSenceIdsVal.includes(id as any)) {
    return FieldTypeEnum.OpSence
  }
  return FieldTypeEnum.SubForm
}

export const prepareFieldConfig = ({
  fieldIds,
  configs,
  belong,
  template,
}: PrepareFieldConfigOptions): FieldConfig[] => {
  const root: FieldConfig[] = []
  console.log('fff belongbelongbelong:', belong)
  fieldIds.forEach((path) => {
    let currentLevel = root
    let fullPath = ''
    const pathArr = Array.isArray(path) ? path : [path]

    pathArr.forEach((id, index) => {
      fullPath = fullPath ? `${fullPath}.${id}` : id
      let existingNode: FieldConfig = currentLevel.find(
        (node) => node.id === id
      )

      if (!existingNode) {
        existingNode = {
          id: id as any,
          fullId: fullPath,
          fieldType: getFieldType(id),
          ...(configs[id] ? { config: { [id]: configs[id] } } : { config: {} }),
          children: [],
          belong: belong[id] || (template as any),
        }
        currentLevel.push(existingNode)
      }

      if (index === path.length - 1) {
        delete existingNode.children
      }

      currentLevel = existingNode.children!
    })
  })

  return root
}
